/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_sequence_video_model_1_0 = new mongoose.Schema(
		{"sequence_id" : {type : String, required : true},
		"video_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_sequence_video_models = {
		"1.0" : link_sequence_video_model_1_0
};

module.exports = {
		"models" : link_sequence_video_models
};