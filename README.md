# generator-hapijs-api

Yeoman generator for creating an API with Hapi.js

## Installation

`npm install -g yo`

`npm install -g generator-hapijs-api`

## Setup

`cd /path/to/project`

`yo hapijs-api`

This will create the basic structure of a Hapi.js project.

```
project
│───.aws
│   │   config
│───.elasticbeanstalk
│   │   config.yml
└───.ebextensions
│   └──nginx
│       └───conf.d
│   		    │   cors.conf
│	  .gitignore
│	  .jshintrc
│   circle.yml
│───coverage
│   │   .gitkeep
│	  env.js
└───fixtures
│   │   development.js
│   │   production.js
│   │   testing.js
│	  index.js
│───lib
│   │   .gitkeep
└───node_modules
│	  package.json
│   README.md
└───routes
│   │   .gitkeep
└───schemas
│   │   .gitkeep
└───test
│   │   test.js
│   └───routes
│       │   .gitkeep
```

## Actions

`yo hapijs-api:model`

This will create 3 files, a route, schema and test file for your model with predefined CRUD code.

It will also make the correct imports in the necessary files.


