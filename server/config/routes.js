module.exports = function(app) {
  	var users = require('../controllers/users.js');

// User
    // Index
	app.get('/users', users.index);

	// New
	app.get('/users/new', users.create);

	// Show
	app.get('/users/:id', users.show);

	// Edit 
	app.post('/users/:id/edit', users.update);

	// Create
	app.post('/users', users.create);	

	// Destroy app.delete('/users/:id')
	app.post('/users/:id/destroy', users.destroy);
	
	// Update app.put/patch('/users/:id') 
	app.post('/users/:id/update', users.update);
}