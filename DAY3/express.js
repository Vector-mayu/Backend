const express = require("express");

const app = express();

app.use("/About", (req, res)=>{
  res.send("This is Home page Buddy");
})

app.use("/Profile", (req, res)=>{
  res.send("This is Profile Page Dude")
});

app.use("/Category", (req, res)=>{
  res.send("This is Category Page Silly");
});

app.use("/",(req, res)=>{
  res.send({"name":"Mayuresh", "age": "19", "gender":"male"});
});

app.listen(5000, ()=>{ 
  console.log("App listening at port 5000");
});