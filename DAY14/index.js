require("dotenv").config();
const express = require("express");
const app = express();
const main = require("./ChatBot");


app.use(express.json());

const chattingHistory = {}; // created a Database for user history

// User asks questions to chatbot using post API (Post API hides it)
app.post("/chat", async (req, res)=>{

	const {id, msg} = req.body; // we grabbed the user message and id

	// Check if its a new users
	if(!chattingHistory[id]){
		chattingHistory[id] = []; // if its a new user assign it with a new array 
	}

	// Extract previos history 
	const History = chattingHistory[id];

	// Extracted Histroy + Current Msg => give it to ChatBot
	const promptMessage = [...History, {
		role:'user',
		parts: [{text:msg}]
	}]
	// by giving History to current prompt we get Better Context in chat

	// Call the LLM
	const answer = await main(promptMessage);

	// After we get the response from LLM 
	// we store msg and answer into History
	History.push({role:"user", parts:[{text:msg}]}); // pushed user question
	History.push({role:"model", parts:[{text:answer}]}); // pushed LLM reply

	res.status(200).send(answer);
})


app.listen(3000, ()=>{
	console.log("App Listening on port 3000...")
})