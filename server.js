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
app.listen(9999, function() {
  console.log("server is running on port 9999...");
})