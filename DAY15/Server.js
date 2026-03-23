const express = require("express");
const app = express();
const {Server} = require("socket.io");
const http = require("http");
const path = require('path');

const server = http.createServer(app);
const io = new Server(server);

// This serves Static file like CSS/JS
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
});


io.on("connection", (socket)=>{ // socket consist of ID (iska naame kuch bhi rakho)

	// socket => Individual Socket
	// io => to all sockets

	socket.on('message', (data)=>{ // key value pair
		socket.broadcast.emit('new-message', data); // this broadcasts the msg to all user who are connected using socket.io
	})

	socket.on('join-room', (roomID)=>{
		socket.join(roomID);
	})

})


server.listen(3000, ()=>{
	console.log("App Listening on Port 3000...");
})
