const bcrypt = require("bcrypt");

const password = "Mayuresh14"

async function Hashing(){
	const salt = await bcrypt.genSalt(10);
	console.log(salt); // salt :- $2b$10$qvFryBzqgGjMCQs.sXmRfO

	const hashpass = await bcrypt.hash(password, salt);
	console.log(hashpass); // hashcode :- $2b$10$qvFryBzqgGjMCQs.sXmRfOFtijaJUkNfJ0sYG.lUWaa8UyB9D0eYy

	const comp = await bcrypt.compare("Mayuresh14", hashpass); 
	console.log(comp); // true
}

Hashing();