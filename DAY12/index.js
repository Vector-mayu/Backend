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
const userRouter = require("./Routes/User")
const authRouter = require("./Routes/UserAuth")

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authRouter)


// Connect DB First then Listen it
main()
.then( async ()=> { 
	console.log("Successfully Connnected to DB");

	app.listen(process.env.PORT, ()=>{
		console.log("App Listening at port 3000");
	})

	// const result = await User.find({city:"Pune"});
	// console.log(result);
})
.catch((err)=> console.log(err));
