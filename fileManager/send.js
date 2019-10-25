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

const Regex = require("regex");
const date_regex = new Regex("^(19[0-9][0-9]|20[0-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])T(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]),([0-9][0-9][0-9])([+]|[-])[0-2][0-9]:[0-5][0-9]");

const test_regex = new Regex('^/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\,[0-9]{3}$');
const picture_extension = ['.jpg', '.png', 'jpeg'];
const video_extension = ['.mov', '.avi', '.mp4'];

var valid_intervention = true;
var valid_mission = true;

socket.on("msg", (message) => {
	console.log(message);
})

fs.readdir(directory, function(err, items) {
	for (var i=0; i<items.length; i++) {
		// check intervention
		if(items[i] === 'intervention.json'){
			fs.readFile(directory+items[i], 'utf8', function (err, data) {
			  if (err) throw err;
			  obj = JSON.parse(data);
			  console.log(obj);
			});
		}
		// check mission
		if(items[i] === 'mission.json'){
			fs.readFile(directory+items[i], 'utf8', function (err, data) {
			  if (err) throw err;
			  var mission = JSON.parse(data);
			  mission_mandatory.forEach(function(value){
				  if(typeof mission[value] === 'undefined'){
					  console.log(value +' is undefined or empty for mission.json');
					  valid_intervention = false;
				  }
			  })
			  for(var key in mission){
				  if(mission_elements.indexOf(key) === -1){
					  console.log(key+ ' is not a valid field in mission.json');
					  valid_intervention = false;
				  }
			  }
			  console.log(mission['mission_end_time']);
			  console.log(date_regex.test(mission['mission_end_time']));
			});
		}
	}
    for (var i=0; i<items.length; i++) {
		let name = items[i];
        fs.readFile(directory+name, function(err,data){
			if(err){console.log(err)}
			socket.emit('sendFile', data, name);
		});
    }
});
