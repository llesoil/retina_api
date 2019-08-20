/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var sequence_model_1_0 = new mongoose.Schema({"end_of_sequence" : String,
		"name" : {type: String, required : false},
		"video_path" : String,
		"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
		"start_of_sequence" : String,
		"free" : [{type : String, required : false}]});

var sequence_models = {
		"1.0" : sequence_model_1_0
};

module.exports = {
		"models" : sequence_models
};
