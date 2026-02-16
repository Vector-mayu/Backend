// Why we use Mongoose (ODM -> Object Data Modeling)
// :- We use Mongoose with MongoDB mainly to make working 
// with MongoDB easier, structured, and safer in Node.js applications.

// Chracterstics of Mongoose
// 1. Schema-based structure (MongoDB itself is schema-less)
// 2. Built-in validation
// 3. Easy CRUD operations
// 4. Middleware (hooks)
// 5. Relationship handling
// 6. Cleaner, scalable backend architecture (model -> Controller -> Routes)


const mongoose = require('mongoose');

async function main() {
  await mongoose.connect("mongodb+srv://mayu_14:Mayuresh20*06@myfirstcluster.y4prmz2.mongodb.net/Instagram");

  // // Step 1 :- Create Schema
  // const userSchema = new Schema({
  // 	name: String,
  // 	age: Number,
  // 	city: String,
  // 	gender: String
  // })

  // // Step 2 :- Create Model / Collection / Table / Class Create kari hai

  // const User = mongoose.model("User", userSchema) // (name of collection, Schema)

  // Method 1 :- Creation of Document / Object
  // const user1 = new User({name:"Mayuresh Ganesh Dandekar", age:19, city:"Pune", gender:"Male"});
  // await user1.save();

  // // Method 2 :- Using .create
  // await User.create({name:"Shreyash Ganesh Dandekar", city:"Pune", age:14, gender:"Male"});

  // // Inser Many Command
  // await User.insertMany([
  // 		{name:"Dhiraj Ahire", city:"Nashik", age:20, gender:"Male"},
  // 		{name:"Ansh Helgaokar", city:"Mumbai", age:21, gender:"Male"},
  // 		{name:"Suvarna Ganesh Dandekar", city:"Pune", age:47, gender:"Female"}
  // 	])

  // Find all Entries from DB
  // const ans = await User.find({});
  // console.log(ans);

  // Find by Paricular Field
  // const ans = await User.find({city:"Pune"});
  // console.log(ans);

}



module.exports = main;