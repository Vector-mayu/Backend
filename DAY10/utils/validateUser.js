const validator = require("validator");

function validateUser(data){
	// API Level Validating
	const mandatoryField = ["firstName", "emailID", "age", "password"];

	const isAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

	if(!isAllowed)
		throw new Error("Fields are missing...");

	if(!validator.isEmail(data.emailID))
		throw new Error("Invalid Credentails...");

	if(!validator.isStrongPassword(data.password))
		throw new Error("Weak Password...");

	if(!(data.firstName.length >=2 && data.firstName.length <= 20))
		throw new Error("Name should have atleast 2 char and atmost 20 char")
}

module.exports = validateUser;