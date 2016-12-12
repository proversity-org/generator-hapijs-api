
'use strict';

/**
 * User route tests
 */

const Code = require("code");

module.exports = function(server, lab){

  var <%= nameId %> = null;

  lab.test("<%= name %>:POST ", function(done) {
    var options = { method: "POST", url: "/<%= name %>s", payload: {}};
    server.inject(options, function(response) {
      var payload = JSON.parse(response.payload);
      if(payload._id) <%= nameId %> = payload._id;
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test("<%= name %>:GET ", function(done) {
    var options = { method: "GET", url: "/<%= name %>s";
    server.inject(options, function(response) {
      var payload = JSON.parse(response.payload);
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test("<%= name %>:GET ", function(done) {
    var options = { method: "GET", url: "/<%= name %>s/" + <%= nameId %>};
    server.inject(options, function(response) {
      var payload = JSON.parse(response.payload);
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test("<%= name %>:PUT ", function(done) {
    var options = { method: "PUT", url: "/<%= name %>s/" + <%= nameId %>, payload: {}};
    server.inject(options, function(response) {
      var payload = JSON.parse(response.payload);
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });

  lab.test("<%= name %>:DELETE ", function(done) {
    var options = { method: "DELETE", url: "/<%= name %>s/" + <%= nameId %>};
    server.inject(options, function(response) {
      var payload = JSON.parse(response.payload);
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
};
