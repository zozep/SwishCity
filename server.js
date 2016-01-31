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
var server = app.listen(9996, function() {
  console.log("server is running on port 9996...");
})
var message_arr = [];

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
	socket.emit("chat connect", message_arr);
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
		message_arr.push({username: socket.username, message: data})

        if(message_arr.length > 5){
            message_arr.splice(0,1);
        }
        console.log(message_arr.length)
        io.emit("new message notification", message_arr);
    })
})