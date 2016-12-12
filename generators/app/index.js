
'use strict';

const generators = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function () {
    this.pkg = require('../../package.json');
  },
  prompting: function() {
    var welcomeMessage = `Welcome to ${chalk.yellow.bold('hapijs')} generator.`
  	this.log(yosay(welcomeMessage));

  	var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: "app"
    },{
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    },{
      type: 'input',
      name: 'description',
      message: 'Description',
      default: ""
    },{
      type: 'input',
      name: 'main',
      message: 'Entry point',
      default: 'index'
    },{
      type: 'input',
      name: 'author',
      message: 'Author',
      default: ''
    },{
      type: 'input',
      name: 'repo',
      message: 'Git repo',
      default: 'https://github.com'
    },{
      type: 'confirm',
      name: 'includeAWS',
      message: 'Would you like to include AWS npm module?',
      default: false
    }];

    return this.prompt(prompts)
    	.then(function(answers) {
    		this.name 				= _.replace(_.toLower(answers.name), " ", "-");
    		this.version 			= answers.version;
    		this.description 	= answers.description;
    		this.main	 				= _.toLower(answers.main);
    		this.includeAWS   = answers.includeAWS;
    	}.bind(this));
  },
  writing: {
  	packageJson: function() {
  		this.fs.copyTpl(
  			this.templatePath('_package.json'),
  			this.destinationPath('package.json'),
  			{
  				name: this.name,
  				version: this.version,
  				description: this.description,
  				main: this.main,
  				author: this.author,
          repo: this.repo
  			}
  		);

      this.config.set({'server': this.main});
  	},
  	env: function() {
  		this.fs.copyTpl(
  			this.templatePath('config/_env.js'),
  			this.destinationPath('env.js'),
  			{
          includeAWS: this.includeAWS,
  				name: this.name
  			}
  		);
  	},
  	entryPoint: function() {
  		this.fs.copyTpl(
  			this.templatePath('_index.js'),
  			this.destinationPath(`${this.main}.js`)
  		);
  	},
  	gitignore: function() {
  		this.fs.copyTpl(
  			this.templatePath('config/_gitignore'),
  			this.destinationPath('.gitignore')
  		);
  	},
  	circle: function() {
  		this.fs.copyTpl(
  			this.templatePath('config/_circle.yml'),
  			this.destinationPath('circle.yml')
  		);
  	},
  	test: function() {
  		this.fs.copyTpl(
  			this.templatePath('_test.js'),
  			this.destinationPath('test/test.js'),
  			{
  				includeAWS: this.includeAWS,
  				main: this.main
  			}
  		);
  	},
    readMe: function() {
      this.fs.copyTpl(
        this.templatePath('config/_README.md'),
        this.destinationPath('README.md'),
        {
          name: this.name,
          description: this.description,
        }
      );
    },
    jshintrc: function() {
      this.fs.copyTpl(
        this.templatePath('config/_jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },
    fixtures: function() {
      mkdirp.sync('fixtures');
      this.fs.copyTpl(
        this.templatePath('fixtures/development.js'),
        this.destinationPath('fixtures/development.js')
      );
      this.fs.copyTpl(
        this.templatePath('fixtures/testing.js'),
        this.destinationPath('fixtures/testing.js')
      );
      this.fs.copyTpl(
        this.templatePath('fixtures/production.js'),
        this.destinationPath('fixtures/production.js')
      );
    },
    aws: function() {
      mkdirp.sync('.aws');
      this.fs.copyTpl(
        this.templatePath('config/_awsConfig'),
        this.destinationPath('.aws/config')
      );
    },
    elasticbeanstalk: function() {
      mkdirp.sync('.elasticbeanstalk');
      this.fs.copyTpl(
        this.templatePath('config/_elasticbeanstalk.yml'),
        this.destinationPath('.elasticbeanstalk/config.yml')
      );
    },
    nginx: function() {
      mkdirp.sync('.ebextensions/nginx/conf.d');
      this.fs.copyTpl(
        this.templatePath('config/_cors.conf'),
        this.destinationPath('.ebextensions/nginx/conf.d/cors.conf')
      );
    },
  	generateFolders: function() {
      mkdirp.sync('coverage');
  		mkdirp.sync('lib');
  		mkdirp.sync('routes');
  		mkdirp.sync('schemas');
      mkdirp.sync('test/routes');

      this.fs.copyTpl(
        this.templatePath('config/_gitkeep'),
        this.destinationPath('.aws/.gitkeep')
      );
      this.fs.copyTpl(
        this.templatePath('config/_gitkeep'),
        this.destinationPath('.ebextensions/.gitkeep')
      );
      this.fs.copyTpl(
        this.templatePath('config/_gitkeep'),
        this.destinationPath('.elasticbeanstalk/.gitkeep')
      );
      this.fs.copyTpl(
        this.templatePath('config/_gitkeep'),
        this.destinationPath('coverage/.gitkeep')
      );
  		this.fs.copyTpl(
  			this.templatePath('config/_gitkeep'),
  			this.destinationPath('lib/.gitkeep')
  		);
  		this.fs.copyTpl(
  			this.templatePath('config/_gitkeep'),
  			this.destinationPath('routes/.gitkeep')
  		);
  		this.fs.copyTpl(
  			this.templatePath('config/_gitkeep'),
  			this.destinationPath('schemas/.gitkeep')
  		);
      this.fs.copyTpl(
        this.templatePath('config/_gitkeep'),
        this.destinationPath('test/routes/.gitkeep')
      );
  	},
  },
  install: function() {
  	this.npmInstall([
  			'bluebird',
  			'boom',
  			'good',
  			'good-console',
  			'good-squeeze',
  			'hapi',
  			'mongoose',
  			this.includeAWS ? 'aws-sdk' : null
  		], { 'save': true });

  		this.npmInstall([
  			'code',
  			'istanbul',
  			'jshint',
  			'lab',
  			'nodemon',
  			'pow-mongoose-fixtures',
  			'tape'
  		], { 'save-dev': true });
  },
  end: function () {
    var endMessage = `The generator ${chalk.yellow.bold('finish')} the ${chalk.yellow.bold('setup')} of your project.\n\n`
    var howToRun =
      '\To run your project use ' +
      chalk.yellow.bold('npm start') + '\n\n'

     var howToTest =
      '\To test your project use ' +
      chalk.yellow.bold('npm test') + '\n\n'

    this.log(yosay(endMessage + howToRun + howToTest));
  }
});