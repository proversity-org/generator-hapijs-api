
'use strict';

const mongoose = require('mongoose');

var <%= nameSchema %> = new mongoose.Schema({
	// <%= nameId %>: {type: String, required: true},
});

module.exports = mongoose.model('<%= nameUppercase %>', <%= nameSchema %>);