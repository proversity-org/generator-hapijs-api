
'use strict';

const generators = require('yeoman-generator');
var chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const htmlWiring = require("html-wiring");

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function () {
    this.pkg = require('../../package.json');
  },
  prompting: function() {
    var welcomeMessage = `Creating a new ${chalk.yellow.bold('model')}.`
  	this.log(yosay(welcomeMessage));

  	var prompts = [{
      type: 'input',
      name: 'name',
      message: 'File name',
      default: "file"
    },{
      type: 'confirm',
      name: 'includeAWS',
      message: 'Would you like to include AWS npm module?',
      default: false
    }];

    return this.prompt(prompts)
    	.then(function(answers) {
    		this.name 				= _.replace(_.toLower(answers.name), " ", "-");
    		this.includeAWS   = answers.includeAWS;
    	}.bind(this));
  },
  writing: function() {
    this.fs.copyTpl(
      this.templatePath('_route.js'),
      this.destinationPath(`routes/${_.replace(this.name, " ", "")}.js`),
      {
        name: _.replace(this.name, " ", ""),
        nameUppercase: _.replace(_.upperFirst(this.name), " ", ""),
        createSchema: this.createSchema,
        includeAWS: this.includeAWS
      }
    );

    this.fs.copyTpl(
      this.templatePath('_schema.js'),
      this.destinationPath(`schemas/${_.replace(this.name, " ", "")}.js`),
      {
        nameId: `${_.replace(this.name, " ", "")}Id`,
        nameSchema: `${ _.replace(_.upperFirst(this.name), " ", "")}Schema`,
        nameUppercase: _.replace(_.upperFirst(this.name), " ", "")
      }
    );

    this.fs.copyTpl(
      this.templatePath('_test.js'),
      this.destinationPath(`test/routes/${_.replace(this.name, " ", "")}.js`),
      {
        name: _.replace(this.name, " ", ""),
        nameId: `${_.replace(this.name, " ", "")}Id`,
      }
    );

    // Insert route
    var hook = '// ----- yeoman hook routes -----';
    var serverPath = `${this.destinationRoot()}/${this.config.get('server')}.js`;
    var serverFile = htmlWiring.readFileAsString(serverPath);
    var insertRoute = `server.route(require('./routes/${_.replace(this.name, " ", "")}'));`
    if (serverFile.indexOf(insertRoute) === -1) {
      serverFile = serverFile.replace(hook, insertRoute + '\n' + hook);
      htmlWiring.writeFileFromString(serverFile, serverPath);
    }

    // Insert test
    var hook = '// ----- yeoman hook tests -----';
    var testPath = `${this.destinationRoot('test')}/test.js`;
    var testFile = htmlWiring.readFileAsString(testPath);
    var insertTest = `require('./routes/${_.replace(this.name, " ", "")}')(server, lab);`
    if (testFile.indexOf(insertTest) === -1) {
      testFile = testFile.replace(hook, insertTest + '\n' + hook);
      htmlWiring.writeFileFromString(testFile, testPath);
    }
  },
  end: function () {
    var routeMessage = `Route ${chalk.yellow.bold(this.name + '.js')} created.\n\n`;
    var schemaMessage = `Schema ${chalk.yellow.bold(this.name + '.js')} created.\n\n`;
    var testMessage = `Test ${chalk.yellow.bold(this.name + '.js')} created.\n\n`;
    this.log(yosay(routeMessage + schemaMessage + testMessage));
  }
});
