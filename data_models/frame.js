/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var frame_model_1_0 = new mongoose.Schema(
		{"camera_orientation" : {
			"camera_angle_north" : Number,
			"camera_angle_vertical" : Number,
			"camera_horizontal_angle" : Number
		},
		"drone_gps_coordinates" : {
			"altitude" : {type : Number, required : false},
			"latitude" : {type : Number, required : false},
			"longitude" : {type : Number, required : false}
		},
		"frame_time" : String,
		"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
		"zoom_ratio" : { type : Number, required : false, default : 1.0},
		"free" : [{type : String, required : false}]});

var frame_models = {
		"1.0" : frame_model_1_0
};

module.exports = {
		"models" : frame_models
};