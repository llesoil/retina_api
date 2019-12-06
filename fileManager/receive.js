/**
 * http://usejsdoc.org/
 */

const io = require("socket.io");
const fs = require('fs');
const request = require('request');

const server = io.listen(3000);
const location =  '/home/drone/data/';
const api_url = 'http://127.0.0.1:1337/';

const video_extension = ['.mov', '.avi', '.mp4'];
const picture_extension = ['.jpg', '.png', 'jpeg'];

var link_saved;
var mission_saved;
var intervention_saved;
var address;
var extension;
var link_mission_intervention;
var link_frame_mission;
var link_video_mission;
var frame;
var video;

server.on("connection", async function(socket) {
	mission_saved = false;
	intervention_saved = false;
	link_saved = false;
	link_mission_intervention = new Object();
	link_frame_mission = new Object();
	link_video_mission = new Object();
	console.log("New connection.");
	socket.emit('msg', 'Connected!');
	socket.on('sendFile', function(data, filename){
		var buff = Buffer.from(data, 'base64');
		address = location+filename;
		fs.writeFileSync(address, buff);
		extension = filename.substr(filename.length-4);
		// save the intervention
		if(filename === 'intervention.json'){
			fs.readFile(address, 'utf8', function(err, jsonString){
			    if (err) {
			        console.log("intervention.json impossible to read :", err)
			        return
			    }
			    //console.log(JSON.parse(jsonString));
			    request.post(api_url+'intervention/', {json: JSON.parse(jsonString)}, 
			    	  (error, res, body) => {
				    	  if (error) {
				    	    console.error(error);
				    	    return
				    	  }
			    	  //console.log(`statusCode: ${res.statusCode}`);
				      link_mission_intervention.intervention_id = body['_id'];
			    });
			})
			intervention_saved = true;
			socket.emit('msg', filename+' received from client and saved!');
		}
		//save the mission
		if(filename === 'mission.json'){
			fs.readFile(address, 'utf8', function(err, jsonString){
			    if (err) {
			        console.log("mission.json impossible to read :", err);
			        return
			    }
			    //console.log('File data:', JSON.parse(jsonString));
			    request.post(api_url+'mission/', {json: JSON.parse(jsonString)}, 
			    	  function(error, res, body){
				    	  if (error) {
				    	    console.error(error);
				    	    return
				    	  }
			    	  //console.log(`statusCode: ${res.statusCode}`);
				      link_mission_intervention.mission_id = body['_id'];
				      link_video_mission.mission_id = body['_id'];
				      link_frame_mission.mission_id = body['_id'];
			    });
			})
			mission_saved = true;
			socket.emit('msg', filename+' received from client and saved!');
		}
		// once you saved the intervention and the mission, save the link between intervention and mission
		if((link_mission_intervention.mission_id !== undefined) && (link_mission_intervention.intervention_id !== undefined) && !link_saved){
			request.post(api_url+'link_mission_intervention/', {json: link_mission_intervention}, 
			    	  function(error, res, body){
				    	  if (error) {
				    	    return
				    	  }
			    	  console.log('Link between intervention and mission ok!');
			    	  link_saved = true;
			});
		}
		if(picture_extension.indexOf(extension)>=0){	
			frame = new Object();
			frame.frame_path = location+filename;
			request.post(api_url+'frame/', {json: frame}, 
			    	  function(error, res, body){
				    	  if (error) {
				    	    return
				    	  }
			    	  link_frame_mission.frame_id = body['_id'];
			    	  link_frame_mission.mission_id = link_mission_intervention.mission_id;
			    	  request.post(api_url+'link_frame_mission/', {json: link_frame_mission}, 
					    	  function(error, res, body){
						    	  if (error) {
						    	    return
						    	  }
						      console.log('Link between frame and mission ok!');
			    	  });
			});
			console.log('File received from client! Picture saved at : '+location+filename);
			socket.emit('msg', 'Picture received from client! '+filename+' saved!');
		}
		if(video_extension.indexOf(extension)>=0){
			video = new Object();
			video.video_path = location+filename;
			video.video_extension = extension;
			if(link_video_mission.mission_id !== undefined){
				request.post(api_url+'video/', {json: video}, 
			    	  function(error, res, body){
				    	  if (error) {
				    	    return
				    	  }
			    	  link_video_mission.video_id = body['_id'];
			    	  link_video_mission.mission_id = link_mission_intervention.mission_id;
			    	  console.log(link_video_mission);
			    	  request.post(api_url+'link_video_mission/', {json: link_video_mission}, 
					    	  function(error, res, body){
						    	  if (error) {
						    	    return
						    	  }
						      console.log('Link between video and mission ok!');
			    	  });
				});
			}
			console.log('File received from client! Video saved at : '+location+filename);
			socket.emit('msg', 'Video received from client! '+filename+' saved!');
		}
	})
});
