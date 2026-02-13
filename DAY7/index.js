const express = require("express");
const main = require("./Database");
const User = require("./Models/Users")
const app = express();

app.use(express.json());

// Connect DB First then Listen it
main()
.then( async ()=> { 
	console.log("Successfully Connnected to DB");

	app.listen(3000, ()=>{
		console.log("App Listening at port 3000");
	})

	const result = await User.find({city:"Pune"});
	console.log(result);
})
.catch((err)=> console.log(err));
