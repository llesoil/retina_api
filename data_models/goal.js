/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var goal_model_1_0 = new mongoose.Schema({"order_in_mission" : Number,
		"estimated_battery_level" : {type : Number, required : false, min : [0, 'in percentage'], max : 100},
		"goal_location" : {"altitude" : {type : Number, default : 0},
			"latitude" : Number, 
			"longitude" : Number},
			"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
			"is_reached" : {type: Boolean, required : false},
			"free" : [{type : String, required : false}]});


var goal_models = {
		"1.0" : goal_model_1_0
};

module.exports = {
		"models" : goal_models
};