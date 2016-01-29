var express = require("express");
var app = express();

//Body Parser Config
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Sockets
// io = require("socket.io").listen(server)

//Mongoose Validation
validate = require("mongoose-validator");

//Static Folder Config
app.use(express.static(__dirname + "/client"));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

//Routes Config
var server = app.listen(9998, function() {
  console.log("server is running on port 9998...");
})

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
	console.log(">>>>>>>>>>>>>>>>>>");
	console.log("a user has connected with socket!");
	console.log("<<<<<<<<<<<<<<<<<<");

	socket.on("disconnect", function(){
		console.log(">>>>>>>>>>>>>>>>>>");
		console.log("a user has disconnected from server!");
		console.log("<<<<<<<<<<<<<<<<<<");
	})

	socket.on("new user", function(name){
		socket.username = name;
		socket.broadcast.emit("new user notification", name);
	})

	socket.on("new message", function(data){
		io.emit("new message notification", {
			username: socket.username,
			message: data
		});
	})
})