const express = require("express");
const main = require("./Database");
const User = require("./Models/Users");
const app = express();

app.use(express.json());

app.get("/register", async (req, res)=>{
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
		await User.create(req.body);
		res.status(201).send("User Registered Sucessfully...");
	}
	catch(err){
		console.log("Error" + err.message);
		res.status(500).send("Error Occured " + err.message)
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

app.patch("/user", async (req, res)=>{
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
