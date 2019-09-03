/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_goal_mission_model_1_0 = new mongoose.Schema(
		{"goal_id" : {type : String, required : true},
		"mission_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_goal_mission_models = {
		"1.0" : link_goal_mission_model_1_0
};

module.exports = {
		"models" : link_goal_mission_models
};
