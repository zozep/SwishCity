// var User = mongoose.model('User');

// module.exports = (function() {
// 	return {
// 		index: function(req, res){
// 			console.log("Server / Ctrl / Users - Index")
// 		},
// 		new: function(req, res){
// 			console.log("Server / Ctrl / Users - New")
// 		},
// 		create: function(req, res){
// 			console.log("Server / Ctrl / Users - Create")
// 			var newUser = new User(req.body)
// 			newUser.save(function(err, user){
// 				if(err)
// 					res.json(err)
// 				else
// 					res.json(user)
// 			})
// 		},
// 		edit: function(req, res){
// 			console.log("Server / Ctrl / Users - Edit")
// 		},
// 		update: function(req, res){
// 			console.log("Server / Ctrl / Users - Update")
// 		},
// 		show: function(req, res){
// 			console.log("Server / Ctrl / Users - Show")
// 		},
// 		destroy: function(req, res){
// 			console.log("Server / Ctrl / Users - Destroy")

// 		}
// 	}
// })();