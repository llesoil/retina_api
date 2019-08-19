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
		
		return { "drone" : Drone,
			"frame" : Frame, 
			"goal" : Goal,
			"intervention" : Intervention,
			"mission" : Mission,
			"sensor" : Sensor,
			"sequence" : Sequence,
			"video" : Video,
			"waypoint" : Waypoint};
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
			"waypoint" : this.waypoint[version]};
	}
}

module.exports = {
		"objects" : new Model()
};