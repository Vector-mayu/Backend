const express = require("express");
const app = express();

app.use(express.json()); // used when we do calls like POST... cuz we get data in JSON we need to convert it into JS Object     

const BookStore = [
	{id:1, name:"Harry Potter", author:"J.K Rowling"},
	{id:2, name:"Zero to One", author:"Peter Thiel"},
	{id:3, name:"Rich Dad Poor Dad", author:"Robert Kiyosaki"},
	{id:4, name:"Norweigein Wood", author:"i dont know"},
	{id:5, name:"The Depth", author:"Mayuresh"},
	{id:6, name:"Miss Curvaceous", author:"Mayuresh"}
];

// app.get("/book", (req, res)=>{
// 	res.send(BookStore);
// })

app.get("/book/:id", (req,res)=>{
	const id = parseInt(req.params.id); // parseInt is used to convert string to INT
	const ans = BookStore.find(info => info.id === id);
	console.log(ans);
	res.send(ans);
})

app.post("/book", (req,res)=>{
	BookStore.push(req.body); // data comes in req within {req.body} also can bee seen on postman
	res.send("Data Saved Successfully in RAM")
})


app.patch("/book", (req, res)=>{
	res.send("Patch");
	if(req.body.author){
		const Book = BookStore.find(info => info.id === req.body.id);
		Book.author = req.body.author;
	}

	if(req.body.name){
		const changes = BookStore.find(info => info.id === req.body.id);
		changes.name = req.body.name;
	}
})

app.put("/book", (req, res)=>{ // Update name and author
	const Book = BookStore.find(info => info.id === req.body.id);
	Book.name = req.body.name;
	Book.author = req.body.author;
	res.send("Updated Completely using Put");
})

app.delete("/book/:id", (req,res)=>{ // Delete and item from array
	const id = parseInt(req.params.id);
	const index = BookStore.findIndex(info => info.id === id);

	BookStore.splice(index,1);
	res.send("Data Deleted Successfully");
})

app.get("/book", (req, res)=>{ // Find by author name
	const Book = BookStore.filter(info => info.author === req.query.author);
	res.send(Book);
})

app.listen(3000, ()=>{
	console.log("App Listening on 3000");
})