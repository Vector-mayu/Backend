const express = require("express");
const main = require("./Database");
const User = require("./Models/Users");
const validateuser = require("./utils/validateUser");
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Auth = require("./Middleware/Auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/register",Auth, async (req, res)=>{
	try{
		const result = await User.find(); 
		res.status(200).send(result); 
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error" + err.message);
	};
})

app.get("/user/:id", async(req,res)=>{
	try{
		const result = await User.findById(req.params.id);
		res.status(200).send(result);
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error Occured : " + err.message);
	}
})

app.post("/register", async (req, res)=>{
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

app.post("/login", async (req, res)=>{
	const people = await User.findById(req.body._id);
	try{
		if(!(req.body.emailID === people.emailID))
			throw new Error("Invalid Credentails...")

		const isAllowed = await bcrypt.compare(req.body.password, people.password);

		if(!isAllowed){
			throw new Error("Invalid Credentails...");
		}

		// JWT Token

		// jwt.sign({PAYLOAD}, SecretKey)
		const token = jwt.sign({_id:people._id, emailID:people.emailID}, "Mayuresh"); 

		res.cookie("token", token);
		res.status(200).send("Login Successfull...	");
	}
	catch(err){
		console.log(err);
		res.send("Error Occured: "+err.message)
	}
})

app.delete("/user/:id", async(req, res) => {
	try{
		await User.findByIdAndDelete(req.params.id);
		res.status(200).send("User Deleted Successfully...");
	}
	catch(err){
		console.log(err);
		res.status(500).send("Error Occured : " + err.message);
	}
})

app.patch("/user", Auth, async (req, res)=>{
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



// Connect DB First then Listen it
main()
.then( async ()=> { 
	console.log("Successfully Connnected to DB");

	app.listen(3000, ()=>{
		console.log("App Listening at port 3000");
	})

	// const result = await User.find({city:"Pune"});
	// console.log(result);
})
.catch((err)=> console.log(err));
