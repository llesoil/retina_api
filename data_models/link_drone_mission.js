/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_drone_mission_model_1_0 = new mongoose.Schema(
		{"drone_id" : {type : String, required : true},
		"mission_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_drone_mission_models = {
		"1.0" : link_drone_mission_model_1_0
};

module.exports = {
		"models" : link_drone_mission_models
};