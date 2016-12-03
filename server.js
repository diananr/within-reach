var express = require("express");

var app = express();

app.use(express.static(__dirname + "/public"));

app.listen(2410, function(){
	console.log("encendido");
});