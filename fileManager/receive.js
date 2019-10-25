/**
 * http://usejsdoc.org/
 */

const io = require("socket.io");
const server = io.listen(3000);
const fs = require('fs');
const location =  '/home/drone/data/';

server.on("connection", function(socket) {
  console.log("Nouvelle connection...");
  socket.emit('msg', 'Connecté!');
  socket.on('sendFile', function(data, filename){
		var buff = Buffer.from(data, 'base64');
		fs.writeFileSync(location+filename, buff);
		console.log('File received from client! File created : '+location+filename);
		socket.emit('msg', 'File received from client! File created : '+location+filename);
	})
});