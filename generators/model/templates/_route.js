
'use strict';

<% if (includeAWS) { %>
const AWS       = require('aws-sdk');
<% } %>
const Boom            = require('boom');
<% if (createSchema) { %>
const <%= nameUppercase %> = require('../schemas/<%= name %>');
<% } %>
const Environment = require('../env');
<% if (includeAWS) { %>
AWS.config.region           = Environment.aws_region;
AWS.config.accessKeyId      = Environment.aws_key_id;
AWS.config.secretAccessKey  = Environment.aws_secret;
<% } %>

module.exports = [
  {
    method: 'POST', path: '/<%= name %>s',
    handler: function(request, reply) {
      reply({
        // <%= name %>: <%= name %>,
        statusCode: 201
      });
    }
  },
  {
    method: 'GET', path: '/<%= name %>s',
    handler: function(request, reply) {
      reply({
        // <%= name %>: <%= name %>,
        statusCode: 200
      });
    }
  },
  {
    method: 'GET', path: '/<%= name %>s/{<%= name %>Id}',
    handler: function(request, reply) {
      reply({
        // <%= name %>: <%= name %>,
        statusCode: 200
      });
    }
  },
  {
    method: 'PUT', path: '/<%= name %>s/{<%= name %>Id}',
    handler: function(request, reply) {
      reply({
        // <%= name %>: <%= name %>,
        statusCode: 200
      });
    }
  },
  {
    method: 'DELETE', path: '/<%= name %>s/{<%= name %>Id}',
    handler: function(request, reply) {
      reply({
        // <%= name %>: <%= name %>,
        statusCode: 200
      });
    }
  }
]