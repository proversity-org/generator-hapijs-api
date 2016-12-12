
/**
 * Server
 */

'use strict';

// Libraries
const Hapi      = require('hapi');
const Good      = require('good');
const mongoose  = require('mongoose');

// Constants
const Environment = require('./env');
const Env         = process.env.NODE_ENV || Environment.node_env;
const Name        = process.env.NAME || Environment.name;
const Host        = process.env.HOST || Environment.host;
const Port        = process.env.PORT || Environment.port;
const MongoDbUri  = process.env.MONGO_DB_URI || Environment.mongodb_uri;

// Setup server
const server = new Hapi.Server();
server.connection({
  host: Host,
  port: Port,
  routes: {
    cors: {
      origin: Env == 'development' ? ['*'] : ['*'],
      additionalHeaders: [
        'Accept-Encoding',
        'Accept-Language',
        'Connection',
        'Content-Length',
        'Host',
        'Origin',
        'Referer',
        'User-Agent'
      ]
    }
  }
});

// Connect to DB
mongoose.connect(MongoDbUri, function(err) {
  /* istanbul ignore if */
  if (err) {
    server.log('error', err.message);
    throw err;
  } else {
    server.log('info', `Mongo DB connected: ${MongoDbUri}`);
  }
})

mongoose.Promise = require('bluebird');

// Setup the routes
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply({
      Env: Env,
      Name: Name
    });
  }
});

// ----- yeoman hook routes -----

// Setup console
server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
}, (err) => {
  /* istanbul ignore if */
  if (err) {
    throw err;
  }

  // Init server
  server.start((err) => {
    /* istanbul ignore if */
    if (err) {
      throw err;
    }

    server.log('info', `Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
