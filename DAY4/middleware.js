const express = require("express");
const app = express();

// Middleware is used to maintian logs 
// Used to handle authentication for authenticated user to do ant request
// Instead of writting Auth Code again and again we prefer to write in Middleware 
// Middelware is just a function
// Use next() whenever that function is Middleware

//Syntax RH => Route Handler
// app.use(route, [RH,RH,RH,RH]) we can keep them in array or single single or hybrid

app.use(express.json());

app.use("/user", (req,res,next)=>{
	console.log("I am MiddleWare 1");
	next();
});

app.get("/user", (req, res)=>{
	console.log("Haha Im actual function");
	res.send("Data Fetched Sucessfully");
})

app.listen(3000, ()=>{
	console.log("App Listening on port 3000");
})