const express = require("express");

const app = express();

app.use((req, res)=>{
  res.send({"name":"Mayuresh", "age": "19", "gender":"male"});
})

app.listen(5000, ()=>{
  console.log("App listening at port 5000");
});