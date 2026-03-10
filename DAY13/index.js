const express = require("express");
const main = require("./Database");
const User = require("./Models/Users");
const validateuser = require("./utils/validateUser");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Auth = require("./Middleware/Auth");
const app = express();
require('dotenv').config();
const userRouter = require("./Routes/Crud");
const authRouter = require("./Routes/UserAuth");
const redisClient = require("./config/redis");

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter)


// Redis and MongoDB Parallel Connection

const startServer = async()=>{
	try{
		// Takes Time to connect redis and Mongo Separatly

		// await redisClient.connect();
		// console.log("Connected to Redis DB");

		// await main();
		// console.log("Connected to MongoDB");

		// Parallel Connection for Mongo and Redis

		await Promise.all([redisClient.connect(), main()]); // Promise.al(Array[func1, func2])
		console.log("Connected to DB...");

		app.listen(process.env.PORT, ()=>{
			console.log("App Listening on Port 3000...");
		})
	}
	catch(err){
		console.log("Error Occured : "+err);
	}
}

startServer();


// // Connect DB First then Listen it
// main()
// .then( async ()=> { 
// 	console.log("Successfully Connnected to DB");

// 	app.listen(process.env.PORT, ()=>{
// 		console.log("App Listening at port 3000");
// 	})

// 	// const result = await User.find({city:"Pune"});
// 	// console.log(result);
// })
// .catch((err)=> console.log(err));
