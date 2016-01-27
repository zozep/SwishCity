mongoose = require('mongoose');
var fs = require('fs');

//change to name of project
mongoose.connect('mongodb://localhost/{name of project}');

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})