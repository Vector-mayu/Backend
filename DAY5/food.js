const express = require("express");
const app = express();
const {Auth} = require("./middleware/Auth")

app.use(express.json());

// CRUD Operations

const FoodMenu = [
	{id:1, food:"Pav Bhaji", category:"veg", price:179},
	{id:2, food:"Misal Pav", category:"veg", price:149},
	{id:3, food:"Vada Pav", category:"veg", price:49},
	{id:4, food:"Masala Dosa", category:"veg", price:129},
	{id:5, food:"Lollipop", category:"non-veg", price:199},
	{id:6, food:"Veg Biryani", category:"veg", price:189},
	{id:7, food:"Chole Bhature", category:"veg", price:159},
	{id:8, food:"Idli Sambhar", category:"veg", price:99},
	{id:9, food:"Chicken Biryani", category:"non-veg", price:229},
	{id:10, food:"Butter Chicken", category:"non-veg", price:249},
	{id:11, food:"Chicken Tikka", category:"non-veg", price:199}
];

const AddTocart = [];

// app.use("/food", Auth);

app.get("/food", Auth, (req,res)=>{
    console.log("All Food Items...");
    res.send(FoodMenu);
})

app.post("/admin", Auth, (req,res) =>{
    if(req.body){
        FoodMenu.push(req.body);
        res.send("Item Added Sucessfully...");
    }
    else{
        res.status(400).send("Bad Request...")
    }
});

app.delete("/admin/:id", Auth, (req,res)=>{
    const id = parseInt(req.params.id);
    if(id){

        const item = FoodMenu.findIndex(info => info.id === id);

        if(item === -1){
            res.status(404).send("Item dont exist");
        }
        else{
            FoodMenu.splice(item,1);
            res.status(200).send("Item Deleted Sucessfully...");
        }
    }
    else{
        res.status(400).send("Bad Request...")
    }
})

app.put("/admin", Auth, (req, res)=>{
	if(req.body.id){
		const Item = FoodMenu.find(info => info.id === req.body.id);
		const New = req.body;

		if(Item){
			if(New.food){
				Item.food = New.food;
			}
			if(New.category){
				Item.category = New.category;
			}
			if(New.price){
				Item.price = New.price;
			}

			res.status(200).send("Item Updated Sucessfully...")
		}
		else{
			res.status(404).send("Resource Not Found :( ");
		}
	}
	else{
		res.status(400).send("Bad Request Mate ..")
	}
})

app.get("/user", Auth, (req, res)=>{
	res.status(200).send(AddTocart);
})

app.post("/user/:id", Auth, (req,res)=>{
	const id = parseInt(req.params.id);

	const item = FoodMenu.find(info => info.id === id);

	if(item){
		AddTocart.push(item);
		res.status(200).send("Item Added Sucessfully...");
	}
	else{
		res.status(404).send("Item Not Found...");
	}
})

app.delete("/user/:id", Auth, (req,res)=>{
	const id = parseInt(req.params.id);
	const item = AddTocart.findIndex(info => info.id === id);

	if(!AddTocart){
		res.status(400).send("Cart Is Empty...");
	}
	else if(item){
		AddTocart.splice(item,1);
		res.status(200).send("Item Deleted Sucessfully...");
	}
	else{
		res.status(404).send("Item Not Found...")
	}

})

app.listen(2000, ()=>{
	console.log("App Listening on Port 2000");
});