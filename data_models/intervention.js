/**
 * http://usejsdoc.org/
 */

var mongoose =  require('mongoose');

var intervention_model_1_0 = new mongoose.Schema(
		{"intervention_address" : 
			[{ "street_number" : {type : String, required : false},
				"street_name" : {type : String, required : false},
				"postal_code" : {type : String, required : false},
				"city" : {type : String, required : false},
				"country_code" : {type : String, required : false},
				"country" : {type : String, required : false}, 
				"lines" :
				{"line1" : {type :String, required: false},
					"line2" : {type :String, required: false}} 
			}],
			"groundbase_location" : 
			{"altitude" : {type : Number, required : false},
				"latitude" : {type : Number, required : false},
				"longitude" : {type : Number, required : false}},
				"drone_arrival_time" : {type : String, required : false},
				"intervention_description" : {type : String, required : false},
				"first_drone_deployed_time" : {type : String, required : false},
				"end_of_intervention_time" : {type : String, required : false},
				"intervention_limits" : 
					[{"altitude" : {type : Number, required : false},
						"latitude" : {type : Number, required : false}, 
						"longitude" : {type : Number, required : false}}],
						"intervention_name" : {type : String, required : false},
						"quality" : {type: Number, min: [0, 'quality is negative'], max: 9},
						"intervention_start_time" : String,
						"type_of_intervention" : String,
						"free" : [{type : String, required : false}]});

var intervention_models = {
		"1.0" : intervention_model_1_0
};

module.exports = {
		 "models" : intervention_models
};


