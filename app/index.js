
'use strict';

const generators = require('yeoman-generator');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},
	initializing: function () {
    this.pkg = require('../package.json');
  },
  prompting: function() {
  	this.log(yosay('Welcome to hapi.js project generator.'));

  	var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: "app"
    },
    {
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
      type: 'confirm',
      name: 'includeAWS',
      message: 'Would you like to include AWS npm module?',
      default: false
    }];

    return this.prompt(prompts)
    	.then(function(answers) {
    		this.name 				= _.replace(_.toLower(answers.name), " ", "-");
    		this.version 			= _.toLower(answers.version);
    		this.description 	= _.toLower(answers.description);
    		this.main	 				= _.toLower(answers.main);

    		this.log(this.name, this.version, this.description, this.main);
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
  				author: this.author
  			}
  		);
  	},
  	env: function() {
  		this.fs.copyTpl(
  			this.templatePath('_env.js'),
  			this.destinationPath('env.js'),
  			{
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
  			this.templatePath('_gitignore'),
  			this.destinationPath('.gitignore')
  		);
  	},
  	circle: function() {
  		this.fs.copyTpl(
  			this.templatePath('_circle.yml'),
  			this.destinationPath('circle.yml')
  		);
  	},
  	installDependencies: function() {
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
  			'nodemon',
  			'pow-mongoose-fixtures',
  			'tape'
  		], { 'save-dev': true });
  	}
  }
});