class Model {	
	
	constructor() {
		this.drone = require('./drone.js').models;
		this.frame = require('./frame.js').models;
		this.goal = require('./goal.js').models;
		this.intervention = require('./intervention.js').models;
		this.mission = require('./mission.js').models;
		this.sensor = require('./sensor.js').models;
		this.sequence = require('./sequence.js').models;
		this.video = require('./video.js').models;
		this.waypoint = require('./waypoint.js').models;
		this.link_camera_drone = require('./link_camera_drone.js').models;
		this.link_drone_mission = require('./link_drone_mission.js').models;
		this.link_frame_video = require('./link_frame_video.js').models;
		this.link_frame_waypoint = require('./link_frame_waypoint.js').models;
		this.link_goal_mission = require('./link_goal_mission.js').models;
		this.link_mission_intervention = require('./link_mission_intervention.js').models;
		this.link_sequence_video = require('./link_sequence_video.js').models;
		this.link_video_camera = require('./link_video_camera.js').models;
		this.link_video_mission = require('./link_video_mission.js').models;
		this.link_waypoint_mission = require('./link_waypoint_mission.js').models;
		this.link_frame_mission = require('./link_frame_mission.js').models;
	}
	
	get_models(version){
		
		var Model = require('mongoose').model;
		
		var Drone = new Model("drone", this.drone[version]);
		var Frame = new Model("frame", this.frame[version]);
		var Goal = new Model("goal", this.goal[version]);
		var Intervention = new Model("intervention", this.intervention[version]);
		var Mission = new Model("mission", this.mission[version]);
		var Sensor = new Model("sensor", this.sensor[version]);
		var Sequence = new Model("sequence", this.sequence[version]);
		var Video = new Model("video", this.video[version]);
		var Waypoint = new Model("waypoint", this.waypoint[version]);
		var Link_camera_drone = new Model("link_camera_drone", this.link_camera_drone[version]); 
		var Link_drone_mission = new Model("link_drone_mission", this.link_drone_mission[version]); 
		var Link_frame_video = new Model("link_frame_video", this.link_frame_video[version]); 
		var Link_frame_waypoint = new Model("link_frame_waypoint", this.link_frame_waypoint[version]); 
		var Link_goal_mission = new Model("link_goal_mission", this.link_goal_mission[version]); 
		var Link_mission_intervention = new Model("link_mission_intervention", this.link_mission_intervention[version]); 
		var Link_sequence_video = new Model("link_sequence_video", this.link_sequence_video[version]); 
		var Link_video_camera = new Model("link_video_camera", this.link_video_camera[version]); 
		var Link_video_mission = new Model("link_video_mission", this.link_video_mission[version]); 
		var Link_waypoint_mission = new Model("link_waypoint_mission", this.link_waypoint_mission[version]);
		var Link_frame_mission = new Model("link_frame_mission", this.link_frame_mission[version]); 
		
		return { "drone" : Drone,
			"frame" : Frame, 
			"goal" : Goal,
			"intervention" : Intervention,
			"mission" : Mission,
			"sensor" : Sensor,
			"sequence" : Sequence,
			"video" : Video,
			"waypoint" : Waypoint,
			"link_camera_drone" : Link_camera_drone,
			"link_drone_mission" : Link_drone_mission,
			"link_frame_video" : Link_frame_video,
			"link_frame_waypoint" : Link_frame_waypoint,
			"link_goal_mission" : Link_goal_mission,
			"link_mission_intervention" : Link_mission_intervention,
			"link_sequence_video" : Link_sequence_video,
			"link_video_camera" : Link_video_camera,
			"link_video_mission" : Link_video_mission,
			"link_waypoint_mission": Link_waypoint_mission,
			"link_frame_mission": Link_frame_mission};
	}
	
	get_schema(version){
		
		return {"drone" : this.drone[version],
			"frame" : this.frame[version], 
			"goal" : this.goal[version],
			"intervention" : this.intervention[version],
			"mission" : this.mission[version],
			"sensor" : this.sensor[version],
			"sequence" : this.sequence[version],
			"video" : this.video[version],
			"waypoint" : this.waypoint[version],
			"link_camera_drone" : this.link_camera_drone[version], 
			"link_drone_mission" : this.link_drone_mission[version], 
			"link_frame_video" : this.link_frame_video[version], 
			"link_frame_waypoint" : this.link_frame_waypoint[version], 
			"link_goal_mission" : this.link_goal_mission[version], 
			"link_mission_intervention" : this.link_mission_intervention[version], 
			"link_sequence_video" : this.link_sequence_video[version], 
			"link_video_camera" : this.link_video_camera[version], 
			"link_video_mission" : this.link_video_mission[version], 
			"link_waypoint_mission" : this.link_waypoint_mission[version],
			"link_frame_mission":this.link_frame_mission[version]};
	}
}

module.exports = {
		"objects" : new Model()
};