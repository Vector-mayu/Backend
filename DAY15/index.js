const express = require("express");
const app = express();
const {Server} = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{ // socket consist of ID (iska naame kuch bhi rakho)

	// socket => Individual Socket
	// io => to all sockets

	socket.on("disconnect", ()=>{
		console.log("Disconnected from the server...");
	})

	socket.on('message', (data)=>{ // key value pair
		io.emit('new-message', data); // this broadcasts the msg to all user who are connected using socket.io
	})

})

server.listen(3000, ()=>{
	console.log("App Listening on Port 3000...");
})
