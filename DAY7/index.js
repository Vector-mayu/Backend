const express = require("express");
const main = require("./Database");
const User = require("./Models/Users");
const app = express();

app.use(express.json());

// CRUD operations in Database

app.get("/info", async (req, res)=>{
	const ans = await User.find({city:"Pune"})
	res.send(ans);
});

app.post("/info", async (req,res)=>{
	// const ans = new User(req.body);
	// await ans.save();

	try{
		await User.create(req.body);
	res.send("Successfully Added new User...");
	}
	catch(err){
		res.status(500).send(err);
	}
})

app.delete("/info/:name", async (req, res)=>{
	const name1 = req.params.name;
	console.log(name1);

	try{
		const ans = await User.deleteOne({name : name1});
		res.send(`Deleted ${name1} successfully...`)
	}
	catch(err){
		console.log(err);
	}

})

app.put("/info", async (req, res)=>{
	const ans = await User.updateOne({name: "Dhiraj Ahire"}, {city:"Pune"});
	res.send("Successfully Updated User...")
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
