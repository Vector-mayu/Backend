const express = require("express");
const authRouter = express.Router();
const validateuser = require("../utils/validateUser");
const bcrypt = require("bcrypt");
const Auth = require("../Middleware/Auth")
const User = require("../Models/Users");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

authRouter.post("/register", async (req, res)=>{
	try{
		validateuser(req.body);

		// Password hashing
		req.body.password = await bcrypt.hash(req.body.password,10);

		await User.create(req.body);
		res.status(201).send("User Registered Sucessfully...");
	}
	catch(err){
		console.log("Error" + err.message);
		res.status(500).send("Error Occured " + err.message)
	}
})

authRouter.post("/login", async (req, res)=>{
	const people = await User.findById(req.body._id);
	try{
		if(!(req.body.emailID === people.emailID))
			throw new Error("Invalid Credentails...")

		const isAllowed = people.verifyPassword(req.body.password);

		if(!isAllowed){
			throw new Error("Invalid Credentails...");
		}

		// JWT Token

		// jwt.sign({PAYLOAD}, SecretKey)
		const token = people.getJWT();

		res.cookie("token", token);
		res.status(200).send("Login Successfull...	");
	}
	catch(err){
		console.log(err);
		res.send("Error Occured: "+err.message)
	}
})

authRouter.post("/logout", Auth, async (req, res)=>{
	try{
		const {token} = req.cookies;
		console.log(token);

		const paylaod = jwt.decode(token);
		console.log(paylaod);

		// Push the current token in redis and block it
		await redisClient.set(`token:${token}`, "Blocked"); // Key value pair 

		// await redisClient.expires(`token: `)

		await redisClient.expireAt(`token:${token}`, paylaod.exp)
		// payload.exp => payload consists of that token, and object {payload.exp} consist this [125545464] in seconds calculated from 1970 till Date.now();
		
		// Remove the Token from Browser and set it Null
		res.cookie("token", null, {expires: new Date(Date.now())});

		res.status(200).send("Logged Out Successfully...")
	}
	catch(err){
		console.log("Error Occured: "+ err.message);
	}
});

module.exports = authRouter;