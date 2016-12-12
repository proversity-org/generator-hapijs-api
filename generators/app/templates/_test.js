
/**
 * Test runner
 */

'use strict';

// Libraries
<% if (includeAWS) { %>
const AWS       = require('aws-sdk');
<% } %>
const Code      = require("code");
const fixtures  = require('pow-mongoose-fixtures');
const Lab       = require("lab");
const mongoose  = require('mongoose');

// Constants
const Environment = require('../env');
const server      = require("../<%= main %>");

// Hack to check no leak on global variables
var coverageVar = null;
const globals 	= Object.getOwnPropertyNames(global);
for (let i = 0; i < globals.length; ++i) {
  var pattern = /\$\$cov_[0-9]+\$\$/;
  if(pattern.test(globals[i])){
    coverageVar = globals[i].match(pattern)[0];
    console.log('coverageVar is', coverageVar);
  }
}

var lab = exports.lab = Lab.script({ globals: [ coverageVar ]});

lab.experiment("Tests", function() {

  // ------ INDEX ------

	lab.test("GET /", { timeout: 20000 }, function(done) {
    var options = { method: "GET", url: "/" };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
