var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var aliasValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'Alias should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Alias should contain letters and numbers only'
  }),
];

var pwValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 15],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Password should contain letters and numbers only'
  })
];


var UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true},
  email: { type: String, required: true},
  password: { type: String, trim: true, validate: pwValidator, required: true},
  alias: { type: String, trim: true, unique: true, validate: aliasValidator, required: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  atPark: { type: Boolean }

});

var User = mongoose.model('User', UserSchema);