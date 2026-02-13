const mongoose = require("mongoose");
const {Schema} = mongoose;

// Step 1 :- Create Schema
const userSchema = new Schema({
	name: String,
	age: Number,
	city: String,
	gender: String
})

// Step 2 :- Create Model / Collection / Table / Class Create kari hai

const User = mongoose.model("User", userSchema) // (name of collection, Schema)

module.exports = User;