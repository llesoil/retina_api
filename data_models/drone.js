/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var drone_model_1_0 = new mongoose.Schema(
		{"drone_model" : {type : String, required : true},
		"documentation_path" : {type : String, required : true},
		"no_payload_flying_duration" : {type : String, required : true},
		"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
		"purchased_date" : {type : String, required : true},
		"sold_or_broken_date" : {type : String, required : false},
		"free" : [{type : String, required : false}]});

var drone_models = {
		"1.0" : drone_model_1_0
};

module.exports = {
		"models" : drone_models
};