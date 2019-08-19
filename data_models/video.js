/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var video_model_1_0 = new mongoose.Schema({"codec_used" : {type: String, required : false},
		"stop_recording_time" : String,
		"focal_length" : {type: Number, required : false},
		"video_extension" : {type: String, required : false},
		"frame_per_second" : Number,
		"video_path" : String,
		"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
		"horizontal_resolution" : Number,
		"vertical_resolution" : Number,
		"start_recording" : String, 
		"type_of_video" : {type: String, required : false} });

var video_models = {
		"1.0" : video_model_1_0
};

module.exports = {
		"models" : video_models
};