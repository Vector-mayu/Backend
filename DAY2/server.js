const http = require('http');

const Server = http.createServer((req, res)=>{
	// res.end("hello coder army")

	if(req.url === '/'){
		res.end("This is Home Page");
	}
	else if(req.url === '/Login'){
		res.end("This is Login Page");
	}
	else{
		res.end("Error: Page not Found");
	}

});

Server.listen(5000, ()=>{
	console.log("Server Listening on LocalHost 5000");
})