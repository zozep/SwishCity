var users = require("../controllers/users.js");

module.exports = function(app) {
  	var users = require('../controllers/users.js');

// User
    // Index
	app.get('/users', users.index);

	// Show
	app.get('/user/:id', users.getOne);

	// Create
	app.post('/users', users.create);	

	// Edit 
	app.post('/users/:id/edit', users.edit);

	// Update
	app.put('/users/:id', users.update);

	// Destroy
	app.delete('/users/:id', users.destroy);

}