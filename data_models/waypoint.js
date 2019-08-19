/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var waypoint_model_1_0 = new mongoose.Schema({
	"battery_level" : {type : Number, required : false, min : [0, 'in percentage'], max : 100},
		"waypoint_location" : {"altitude" : Number,
			"latitude" : Number, 
			"longitude" : Number},
			"end_pose_time" : {type: String, required : false},
			"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
			"arrival_time" : String,
			"temperature" : {type : Number, required : false},
			"wind_direction" : {type : Number, required : false},
			"wind_strength" : {type : Number, required : false}});

var waypoint_models = {
		"1.0" : waypoint_model_1_0
};

module.exports = {
		"models" : waypoint_models
};