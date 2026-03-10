const express = require("express");
const authRouter = express.Router();
const validateuser = require("../utils/validateUser");
const bcrypt = require("bcrypt");
const User = require("../Models/Users");

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
		res.status(400).send("Error Occured " + err.message)
	}
})

authRouter.post("/login", async (req, res)=>{
	const people = await User.findById(req.body._id);
	try{
		if(!(req.body.emailID === people.emailID))
			throw new Error("Invalid Credentails...")

		const isAllowed = await people.verifyPassword(req.body.password);

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

module.exports = authRouter;