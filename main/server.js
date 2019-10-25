function add_get(app, cmd, value, Model, Schema){
	
	if(cmd==='/intervention/'){
		
		app.get(cmd+':gps_time', function (req, res) {
			
			var gps_time = req.params.gps_time.split("=")[1].toString();
			
			var lat1 = gps_time.split(";")[0].toString();
			var long1 = gps_time.split(";")[1].toString();
			var lat2 = gps_time.split(";")[2].toString();
			var long2 = gps_time.split(";")[3].toString();
			
			var min_lat = Math.min(lat1, lat2);
			var max_lat = Math.max(lat1, lat2);
			var min_long = Math.min(long1, long2);
			var max_long = Math.max(long1, long2);
			
			if(gps_time.size>4){
				var time = gps_time.split(";")[4].toString();
				Model.find({ 'groundbase_location.latitude' : { $gte : min_lat, $lte: max_lat},
	    	         'groundbase_location.longitude' : { $gte : min_long, $lte: max_long},
	    	         'intervention_start_time' : {$lte : time},
	    	         'end_of_intervention_time' : {$gte : time} }, function (error, item) {
		    	
				    if (error) {
						res.status(500).send(error);
						return;
				    }
				    
					if (item) {
						res.json(item);
						return;
					}
			
	    	    });
			}
			else{
			    Model.find({ 'groundbase_location.latitude' : { $gte : min_lat, $lte: max_lat},
	    	         'groundbase_location.longitude' : { $gte : min_long, $lte: max_long}}, function (error, item) {
			    	
				    if (error) {
						res.status(500).send(error);
						return;
				    }
				    
					if (item) {
						res.json(item);
						return;
					}
					
			    });
			}
			
		 });
	}
	
	app.get(cmd, function(req, res){
		
		Model.find(function (error, items) {

		      if (error) {
		        res.status(500).send(error);
		        return;
		      }

		      res.json(items);
		      
		    });
		
		});
	
	
	app.get(cmd+':body', function (req, res) {
		
		var body = req.body;
		var cop = Model;
		
		for(var att in body){
			cop = cop.where(att).equals(body[att]);
		}
		
	    cop.find(function (error, item) {

		    if (error) {
				res.status(500).send(error);
				return;
		    }
			res.json(item);
	    });
	});
	
	app.get(cmd+':id', function (req, res) {
		
		var id = req.params.id.split("=")[1];
		
	    Model.findOne({ _id : id }, function (error, item) {

		    if (error) {
				res.status(500).send(error);
				return;
		    }
		    
			if (item) {
				
				res.json(item);
				
				return;
			}
	
			res.status(404).json({
				message : value + ' with id ' + id + ' was not found.'
			});
	    });
	 });

	/*var attributes = Schema.obj;
	
	for(let att in attributes){
		
		app.get(cmd+':'+att, function (req, res) {
			var name_attribute = req.params[att].split("=")[0].toString();
			var search_val = req.params[att].split("=")[1].toString();
			
		    Model.where(name_attribute).equals(search_val).find(function (error, item) {

			    if (error) {
					res.status(500).send(error);
					return;
			    }
				res.json(item);
		    });
		 });
	}*/
}

function add_patch(app, cmd, value, Model, Schema){
	
	var attributes = Schema.obj;
	
	for(var att in attributes){
		
		app.patch(cmd+':'+att, function (req, res) {
			
			var name_attribute = req.params[att].split("=")[0].toString();
			var search_val = req.params[att].split("=")[1].toString();
			
		    Model.where(name_attribute).equals(search_val).find(function (error, items) {

			    if (error) {
					res.status(500).send(error);
					return;
			    }
			    
				if (items) {
					
					for(var i = 0; i<items.length; i++){
						var item = items[i];
						for(var property in req.body){
							if(property in item){
								item[property] = req.body[property];						
							}
						}
						
						item.save();
					}
					
					res.send(items);
					
					return;
				}
		
				res.status(404).json({
					message : value + ' with '+ name_attribute + ' ' + search_val + ' was not found.'
				});
		    });
		 });
	}
	
	app.patch(cmd+':id', function (req, res) {
		
		var id = req.params.id.split("=")[1];
		
	    Model.findOne({ _id : id }, function (error, item) {

		    if (error) {
				res.status(500).send(error);
				return;
		    }
		    
			if (item) {
				
				for(var property in req.body){
					if(property in item){
						item[property] = req.body[property];						
					}
				}
				
				var obj = new Model(item);
				
				obj.save();
				
				res.json(item);
				
				return;
			}
			
			res.status(404).json({
				message : value + ' with id ' + id + ' was not found.'
			});
	    });
	 });
}

function add_put(app, cmd, value, Model, Schema){
	
	app.put(cmd+':id', function (req, res) {
		
		var id = req.params.id.split("=")[1];
		
	    Model.findOne({ _id : id }, function (error, item) {

		    if (error) {
				res.status(500).send(error);
				return;
		    }
		    
			if (item) {
				for(var property in item){
					if(property in Schema.obj){
						if (property in req.body || property === "_id"){
							item[property] = req.body[property];
						}
						else {
							item[property] = null;
						}
					}
				}
				
				var obj = new Model(item);
				
				obj.save();
				
				res.json(req.body);
				
				return;
			}
	
			res.status(404).json({
				message : value + ' with id ' + id + ' was not found.'
			});
	    });
	 });
	
}

function add_post(app, cmd, value, Model, Schema){
	
	app.post(cmd, function(req, res){
		
		var new_object = new Model(req.body);
		
		new_object.save();
		
		res.status(201).send(new_object);
		
	});
}

function add_delete(app, cmd, value, Model, Schema){
	
	var attributes = Schema.obj;
	
	for(let att in attributes){
		
		app.delete(cmd+':'+att, function (req, res) {
			
			var name_attribute = req.params[att].split("=")[0].toString();
			var search_val = req.params[att].split("=")[1].toString();
			
		    Model.where(name_attribute).equals(search_val).deleteMany(function (error, item) {

			    if (error) {
					res.status(500).send(error);
					return;
			    }
			    
				if (item) {
					res.json(item);
					return;
				}
		
				res.status(404).json({
					message : value + ' with '+ name_attribute + ' ' + search_val + ' was not found.'
				});
		    });
		 });
	}
	
	app.delete(cmd+':id', function (req, res) {
		
		var id = req.params.id.split(":")[1];
		
	    Model.remove({ _id : id }, function (error, item) {

		    if (error) {
				res.status(500).send(error);
				return;
		    }
		    
			if (item) {
				res.json(req.body);
				return;
			}
	
			res.status(404).json({
				message : value + ' with id ' + id + ' was not found.'
			});
	    });
	 });
}

function get_server(data_version){
	
	var express = require('express');
	var app = express();
	
	var json_parser = require('body-parser');
	app.use(json_parser.json());
	
	var models = require('../data_models/data_models').objects.get_models(data_version);
	var schemas = require('../data_models/data_models').objects.get_schema(data_version);
	
	var listObjects = ['intervention', 'mission', 'drone', 'frame', 'goal', 
		'sensor', 'sequence', 'video', 'waypoint', 'link_camera_drone', 'link_drone_mission', 
		'link_frame_video', 'link_frame_waypoint', 'link_goal_mission', 'link_mission_intervention', 
		'link_sequence_video', 'link_video_camera', 'link_video_mission','link_waypoint_mission',
		'link_frame_mission'];
	
	listObjects.forEach(function(value){
		
		var cmd = '/' + value + '/';
		var Model = models[value];
		var Schema = schemas[value];
		
		add_get(app, cmd, value, Model, Schema);
		add_patch(app, cmd, value, Model, Schema);
		add_post(app, cmd, value, Model, Schema);
		add_put(app, cmd, value, Model, Schema);
		add_delete(app, cmd, value, Model, Schema);

	});
	
	app.get('/exit/', function (req, res) {
		process.exit();
	});
	
	return app;
}

module.exports = get_server;


