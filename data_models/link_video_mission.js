/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_video_mission_model_1_0 = new mongoose.Schema(
		{"video_id" : {type : String, required : true},
		"mission_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_video_mission_models = {
		"1.0" : link_video_mission_model_1_0
};

module.exports = {
		"models" : link_video_mission_models
};