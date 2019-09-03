/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var link_mission_inter_model_1_0 = new mongoose.Schema(
		{"intervention_id" : {type : String, required : true},
		"mission_id" : {type : String, required : true},
		"free" : [{type : String, required : false}]});

var link_mission_inter_models = {
		"1.0" : link_mission_inter_model_1_0
};

module.exports = {
		"models" : link_mission_inter_models
};