const io =  require('socket.io-client');
const socket = io("http://131.254.101.229:3000");
const fs = require('fs');
const directory = './data/';

const intervention_elements = ['free', 'intervention_address', 'groundbase_location', 'drone_arrival_time',
                         'intervention_description', 'first_drone_deployed_time', 
                         'end_of_intervention_time', 'intervention_limits', 'intervention_name', 
                         'quality', 'intervention_start_time', 'type_of_intervention'];

const intervention_mandatory = ['end_of_intervention_time', 'intervention_name', 'intervention_start_time'];

const mission_elements = ['free', 'was_changed', 'comments', 'mission_end_time', 'was_finished', 
                    'moving_duration', 'payload_weight', 'pilot_name', 'quality', 
                    'scenario', 'mission_start_time', 'type_of_mission'];

const mission_mandatory = ['mission_start_time', 'mission_end_time', 'scenario'];

const date_regex = "(19[0-9][0-9]|20[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])T(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])";
const scenario_regex = 'S[1-4]';

const picture_extension = ['.jpg', '.png', 'jpeg'];
const video_extension = ['.mov', '.avi', '.mp4'];

var valid_intervention = true;
var valid_mission = true;

socket.on("msg", (message) => {
	console.log(message);
})

fs.readdir(directory, function(err, items) {
	for (var i=0; i<items.length; i++) {
		// check intervention json
		if(items[i] === 'intervention.json'){
			fs.readFile(directory+items[i], 'utf8', function (err, data) {
			  if (err) throw err;
			  var intervention = JSON.parse(data);
			  // intervention contains all the mandatory elements
			  intervention_mandatory.forEach(function(value){
				  if(typeof intervention[value] === 'undefined'){
					  console.log(value +' is undefined or empty for intervention.json');
					  valid_intervention = false;
				  }
			  })
			  // intervention contains only intervention elements
			  for(var key in intervention){
				  if(intervention_elements.indexOf(key) === -1){
					  console.log(key+ ' is not a valid field in intervention.json');
					  valid_intervention = false;
				  }
			  }
			  // intervention dates are real dates
			  if(intervention['end_of_intervention_time'].match(date_regex)===null || intervention['intervention_start_time'].match(date_regex)===null){
				  console.log('Wrong date format for intervention');
				  valid_intervention = false;
			  }
			  console.log(intervention);
			});
		}
		// check mission json
		if(items[i] === 'mission.json'){
			fs.readFile(directory+items[i], 'utf8', function (err, data) {
			  if (err) throw err;
			  var mission = JSON.parse(data);
			  mission_mandatory.forEach(function(value){
				  if(typeof mission[value] === 'undefined'){
					  console.log(value +' is undefined or empty for mission.json');
					  valid_mission = false;
				  }
			  })
			  for(var key in mission){
				  if(mission_elements.indexOf(key) === -1){
					  console.log(key+ ' is not a valid field in mission.json');
					  valid_mission = false;
				  }
			  }
			  if(mission['mission_end_time'].match(date_regex)===null || mission['mission_start_time'].match(date_regex)===null || mission['scenario'].match(scenario_regex)===null){
				  console.log('Wrong date or scenario format for mission');
				  valid_mission = false;
			  }
			  console.log(mission);
			});
		}
	}
	if(valid_intervention && valid_mission){
		fs.readFile(directory+'intervention.json', function(err,data){
			if(err){console.log(err)}
			socket.emit('sendFile', data, 'intervention.json');
		})
		fs.readFile(directory+'mission.json', function(err,data){
			if(err){console.log(err)}
			socket.emit('sendFile', data, 'mission.json');
		})
		for (var i=0; i<items.length; i++) {
			let name = items[i];
			var extension = name.substr(name.length-4);
			// if the file is sent, we add a prefix 'sent_' to the file name
			// if the file in the directory has already a 'sent_' prefix, we don't send it to the server
			if(name.substr(0,5)!=='sent_' && extension !== 'json'){
				fs.readFile(directory+name, function(err,data){
					if(err){console.log(err)}
					if(picture_extension.indexOf(extension) >= 0 || video_extension.indexOf(extension) >= 0){
						socket.emit('sendFile', data, name);				
					}
					else{
						console.log(name + " is not in one of the allowed format, we did not send it to the server");
					}
				});
				if(extension !== "json" && name !== 'image1.jpg' && name !== 'capture.avi'){
					fs.rename(directory+name, directory+'sent_'+name, function (err) {
						console.log('Rename file error ', err); 
					});
				}
			}
			else {
				console.log(name+'was not sent ! Please remove the sent_ prefix of your file if you want to send it');
			}
		}
	}
	else{
		console.log("Files not sent, check the error messages");
	}
});


