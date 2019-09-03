/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_camera_drone_model_1_0 = new mongoose.Schema(
		{"camera_id" : {type : String, required : true},
		"drone_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_camera_drone_models = {
		"1.0" : link_camera_drone_model_1_0
};

module.exports = {
		"models" : link_camera_drone_models
};