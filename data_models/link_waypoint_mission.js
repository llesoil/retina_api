/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_waypoint_mission_model_1_0 = new mongoose.Schema(
		{"waypoint_id" : {type : String, required : true},
		"mission_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_waypoint_mission_models = {
		"1.0" : link_waypoint_mission_model_1_0
};

module.exports = {
		"models" : link_waypoint_mission_models
};