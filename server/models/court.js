var mongoose = require('mongoose');

var CourtSchema = new mongoose.Schema({
  name: { type: String, unique: true},
  google_id: {type: String},
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

mongoose.model('Court', CourtSchema);