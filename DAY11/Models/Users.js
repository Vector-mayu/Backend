const mongoose = require("mongoose");
const {Schema} = mongoose;

// Step 1 :- Create Schema
const userSchema = new Schema({
	firstName:{
		type: String,
		required: true,
		minLength: 2,
		maxLength: 20
	},
	lastName:{
		type: String,
	},
	age:{
		type: Number,
		min: 14,
		max: 65
	},
	gender:{
		type: String,
		// enum: ["Male", "Female", "Other"],
		// validate(value){ -> Schema Level Validation
		// 	if(!["Male", "Female", "Others"].includes(value)){
		// 		throw new Error("Invalid Gender...");
		// 	}
		// }
	},
	emailID:{
		type:String,
		required: true,
		unique: true,
		trim: true, 
	},
	password:{
		type:String,
		required: true,
	},
	photo:{
		type:String,
		default: "User-Profile-Photo"
	},
},
{
	timestamps: true,
})

// Step 2 :- Create Model / Collection / Table / Class Create kari hai

const User = mongoose.model("User", userSchema) // (name of collection, Schema)

module.exports = User;