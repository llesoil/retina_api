/**
 * http://usejsdoc.org/
 */

var intervention = {"intervention_address" : { "street_number" : "263",
	"street_name" : "Avenue Général Leclerc",
	"postal_code" : "35000",
	"city" : "Rennes",
	"country_code" : "FRA",
	"country" : "France", 
	"lines" : {"line1" : "E218 Office"} },
	"groundbase_location" : { "altitude" : 0.00,
		"latitude" : 48.452670, 
		"longitude" : -1.6406853},
		"drone_arrival_time" : "2019-05-02T16:30:00,000+02:00",
		"intervention_description" : "Fire on the second and third floors, 3 victims saved",
		"first_drone_deployed_time" : "2019-05-02T16:35:00,000+02:00",
		"end_of_intervention_time" : "2019-05-02T17:50:00,000+02:00",
		"intervention_limits" : [{ "altitude" : 0,
			"latitude" : 48.452670, 
			"longitude" : -1.640683},  
			{ "altitude" : 0,
				"latitude" : 48.452120, 
				"longitude" : -1.640684},
				{ "altitude" : 0,
					"latitude" : 48.452610, 
					"longitude" : -1.640685}],
					"intervention_name" : "general_leclerc_may2019",
					"quality" : 2,
					"intervention_start_time" : "2019-05-02T16:30:00,000+02:00",
					"type_of_intervention" : "fire"};


var mission = {"was_changed" : false,
		"comments" : "Third goal far from the original objective",
		"mission_end_time" : "2019-05-02T17:05:56,000+02:00",
		"was_finished" : false,
		"moving_duration" : "P0Y0M0DT0H19M53,254S",
		"payload_weight" : 2.3,
		"pilot_name" : "Olivier",
		"quality" : 2,
		"scenario" : "S1",
		"mission_start_time" : "2019-05-02T16:36:52,154+02:00",
		"type_of_mission" : "building recognition"};


var drone = {"drone_model" : "Matrix 600 Pro",
		"documentation_path" : "/home/eeyes/doc/material/matrix_600_pro.pdf",
		"no_payload_flying_duration" : "P0Y0M0DT0H35M00,000S",
		"quality" : 2.0,
		"purchased_date" : "2018-12-14T12:00:00,000+02:00",
		"sold_or_broken_date" : ""};

var frame = {"camera_orientation" : {
	"camera_angle_north" : 15.2342,
	"camera_angle_vertical" : 20.7542,
	"camera_horizontal_angle" : 148.3742},
	"drone_gps_coordinates" : {
		"altitude" : 12.01,
		"latitude" : 48.452652,
		"longitude" : -1.6406947
	},
	"frame_time" : "2019-05-02T16:28:15,562+02:00",
	"quality" : 2.0,
	"zoom_ratio" : 1.0};

var goal = {"order_in_mission" : 2,
		"estimated_battery_level" : 80,
		"goal_location" : {"altitude" : 15.310,
			"latitude" : 48.452670, 
			"longitude" : -1.6406853},
			"quality" : 2,
			"is_reached" : true};

var sensor = {"sensor_model" : "FLIR view pro R",
		"documentation_path" : "/home/eeyes/doc/material/flir_view_pro_r.pdf",
		"focal_length" : 6.8,
		"output_extension" : ".mov",
		"bought_date" : "2018-09-05T00:00:00,000+02:00",
		"sold_or_broken" : ""};

var sequence = {"end_of_sequence" : "2019-05-02T16:42:15,648",
		  "name" : "fire out in the second floor",
		  "video_path" : "/home/eeyes/data/video/video21.mp4",
		  "quality" : 2,
		  "start_of_sequence" : "2019-05-02T16:12:52,005" };

var video = {"codec_used" : "mp1v",
		"stop_recording_time" : "2019-05-02T17:05:58,137",
		"focal_length" : 6.8,
		"video_extension" : ".mp4",
		"frame_per_second" : 8,
		"video_path" : "/home/eeyes/data/video/video21.mp4",
		"quality" : 2,
		"horizontal_resolution" : 356,
		"vertical_resolution" : 256,
		"start_recording" : "2019-05-02T16:10:40,824+02:00", 
		"type_of_video" : "visible" };

var waypoint = {"battery_level" : 80.5,
		"waypoint_location" : {"altitude" : 15.321,
			"latitude" : 48.452666, 
			"longitude" : -1.6406852},
			"end_pose_time" : "2019-05-02T17:05:32,854+02:00",
			"quality" : 2,
			"arrival_time" : "2019-05-02T17:05:24,413+02:00",
			"temperature" : 14.3,
			"wind_direction" : 320.4,
			"wind_strength" : 25};

var samples = {
		"drone" : drone, 
		"frame" : frame,
		"goal" : goal,
		"intervention" : intervention,
		"mission" : mission,
		"sensor" : sensor,
		"sequence" : sequence,
		"video" : video,
		"waypoint" : waypoint
};

function load_examples(){
	// works with the first data version
	
	var models = require('../data_models/data_models.js').objects.get_models("1.0");
	
	var listObjects = ['intervention', 'mission', 'drone', 'frame', 
		'goal', 'sensor', 'sequence', 'video', 'waypoint'];
	
	listObjects.forEach(function(value){
		models[value](samples[value]).save().then(console.log(value, 'saved!'));
	});
}

module.exports = {
		"samples" : samples,
		"load_examples": load_examples
};
