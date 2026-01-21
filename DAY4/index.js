const express = require("express");
const app = express();

const BookStore = [
	{id:1, name:"Harry Potter", author:"J.K Rowling"},
	{id:2, name:"Zero to One", author:"Peter Thiel"}
];

app.get("/book", (req, res)=>{
	res.send(BookStore);
})


app.listen(3000, ()=>{
	console.log("App Listening on 5000");
})