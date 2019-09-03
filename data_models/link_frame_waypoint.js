/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_frame_waypoint_model_1_0 = new mongoose.Schema(
		{"frame_id" : {type : String, required : true},
		"video_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_frame_waypoint_models = {
		"1.0" : link_frame_waypoint_model_1_0
};

module.exports = {
		"models" : link_frame_waypoint_models
};