var users = require("../controllers/users.js");
var parks = require("../controllers/parks.js");

module.exports = function(app) {
//USER
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

	// Log in
	app.post('/login', users.login);

app.post('/add/park', parks.add);

// //DASHBOARD
//  	// Index
// 	app.get('/dashboard', dashboard.index);

// 	// Show
// 	app.get('/dashboard/:id', dashboard.getOne);
		
// 	// Create
// 	app.post('/dashboard', dashboard.create);	


//PARKS

	// //Index
	// app.get('/parks', parks.index);

	// // Show
	// app.get('/parks/:id', parks.getOne);
		
	// // Create
	// app.post('/indiv_infos', parks.create);	
}