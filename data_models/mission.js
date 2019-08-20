/**
 * http://usejsdoc.org/
 */

var mongoose = require('mongoose');

var mission_model_1_0 = new mongoose.Schema(
		{"was_changed" : {type : Boolean, required : false},
			"comments" : {type : String, required: false},
			"mission_end_time" : String,
			"was_finished" : {type : Boolean, required : false},
			"moving_duration" : {type : String, required : false},
			"payload_weight" : {type : Number, required : false},
			"pilot_name" : {type : String, required : false},
			"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
			"scenario" : {type : String, enum : ["S1","S2", "S3", "S4"]},
			"mission_start_time" : String,
			"type_of_mission" : {type : String, required : false},
			"free" : [{type : String, required : false}]});

var mission_models = {
		"1.0" : mission_model_1_0
};

module.exports = {
		"models" : mission_models
};