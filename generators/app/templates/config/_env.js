
'use strict';

var def = {
  "host": "0.0.0.0",
  "mongodb_uri": "mongodb://127.0.0.1:27017/<%= name %>",
  "name": "<%= name %>",
  "node_env": "development",
  "port": 5000,
  <% if (includeAWS) { %>
  "aws_region":"",
  "aws_key_id":"",
  "aws_secret":""
  <% } %>
}

var config = {
  development: {},
  testing: {
    "node_env": "testing"
  },
  production: {
    "mongodb_uri": "",
    "node_env": "production",
    <% if (includeAWS) { %>
    "aws_region":"",
    "aws_key_id":"",
    "aws_secret":""
    <% } %>
  }
}

module.exports = Object.assign(def, config[process.env.NODE_ENV] ? config[process.env.NODE_ENV] : config['development']);