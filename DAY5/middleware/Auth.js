const Auth = (req, res, next)=>{
	// Token Based Authentication
	const Token = "MAYU14";
	const Access = Token === "MAYU14" ?1:0;

	if(!Access){
		res.status(403).send("Permission Not Granted");
	}

	next();
}

module.exports ={
	Auth,
}