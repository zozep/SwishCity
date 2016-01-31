var mongoose = require('mongoose');

var ParkSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  google_id: {type: String},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Park = mongoose.model('Park', ParkSchema);