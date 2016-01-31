var Park = mongoose.model('Park');
// var User = mongoose.model("User");

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
			User.findOne({_id: req.body.user_id}, function(err, user){
				if(!user.atPark){
					Park.findOne({google_id: req.body.place_id},function(err, park){
						if(park){
							park.users.push(req.body.user_id);
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
							newPark.users.push(req.body.user_id);
							newPark.save(function(err){
								if(err)
									res.json();
								else
									res.json({message: "added park and user"});
							})
						}
					})
				}
				else{
					Park.findUser(req.body.user_id , function(request,res){
						if(req.body.user_id){
							res.json({message: "you've already committed to play at a park, please remove yourself from that park first", google_id:request.google_id})
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