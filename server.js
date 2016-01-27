var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/client"));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);


app.listen(9999, function() {
  console.log("server is running on port 9999...");
})