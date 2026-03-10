const express = require("express");
const Auth = require("../Middleware/Auth");
const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.get("/people",  async (req,res)=>{
	try{
		const ans = await User.findOne();
		res.status(200).send(ans);
	}
	catch(err){
		console.log(err);
		res.status(400).send("Error Occured: "+ err);
	}
})

userRouter.get("/:id", Auth, async(req,res)=>{
	try{
		const result = await User.findById(req.params.id);
		res.status(200).send(result);
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error Occured : " + err.message);
	}
})


userRouter.delete("/:id", Auth, async(req, res) => {
	try{
		await User.findByIdAndDelete(req.params.id);
		res.status(200).send("User Deleted Successfully...");
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error Occured : " + err.message);
	}
})

userRouter.patch("/", Auth, async (req, res)=>{
	const {_id, ...update} = req.body; // we destructured the given body from postman request
	try{
		await User.findByIdAndUpdate(_id, update, {"runValidators": true});
		res.status(200).send("User Updated Successfully...");
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error Occured : " + res.message);
	}
})

module.exports = userRouter;