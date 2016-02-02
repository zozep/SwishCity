var Park = mongoose.model('Park');
var User = mongoose.model("User");

module.exports = (function() {
	return {
		getUser: function(req, res){
			console.log("Server / Ctrl / Users - Index")
		},
		findUser: function(req, res){

			Park.findOne({users: {$elemMatch:{$eq:req.body.user_id}}}, function(err, parkInfo){
				if(err){
					res.json(err)
				}else{
					res.json(parkInfo)
				}
			})
		},
		add: function(req, res){

			console.log(req.body);

			User.findOne({_id: req.body.user}, function(err, user){
				if(!user.atPark){
					user.atPark = true;
					user.save();

					Park.findOne({google_id: req.body.place_id},function(err, park){
						console.log(park);
						if(park){
							park.users.push(req.body.user_id);
							park.address = req.body.address;
							park.name = req.body.name;

							park.save(function(err){
								if(err){
									console.log(err);
								}
								res.json({message: "added"});
							})
						} else {
							var newPark = new Park();
							newPark.name = req.body.title;
							newPark.google_id = req.body.place_id;

							newPark.users.push(user);
							newPark.address = req.body.address;
							newPark.name = req.body.name;

							newPark.save(function(err){
								if(err)
									res.json();
								else
									res.json({message: "added park and user"});
							})
						}
					})
				}
			})
		}
		// edit: function(req, res){
		// 	console.log("Server / Ctrl / Users - Edit")
		// },
		// update: function(req, res){
		// 	console.log("Server / Ctrl / Users - Update")
		// },
		// show: function(req, res){
		// 	console.log("Server / Ctrl / Users - Show")
		// },
		// destroy: function(req, res){
		// 	console.log("Server / Ctrl / Users - Destroy")

		// }
	}
})();