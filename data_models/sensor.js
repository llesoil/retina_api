/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

var sensor_model_1_0 = new mongoose.Schema({"sensor_model" : String,
		"documentation_path" : {type : String, required : false},
		"focal_length" : {type : Number, required : false},
		"output_extension" : String,
		"bought_date" : {type : String, required : false},
		"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
		"sold_or_broken" : {type : String, required : false},
		"free" : [{type : String, required : false}]});

var sensor_models = {
		"1.0" : sensor_model_1_0
};

module.exports = {
		"models" : sensor_models
};