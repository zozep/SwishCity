var Park = mongoose.model('Park');

module.exports = (function() {
	return {
		getUser: function(req, res){
			console.log("Server / Ctrl / Users - Index")
		},
		add: function(req, res){
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
							res.json(err);
						else
							res.json({message: "added park and user"});
					})
				}
			})
		},
		edit: function(req, res){
			console.log("Server / Ctrl / Users - Edit")
		},
		update: function(req, res){
			console.log("Server / Ctrl / Users - Update")
		},
		show: function(req, res){
			console.log("Server / Ctrl / Users - Show")
		},
		destroy: function(req, res){
			console.log("Server / Ctrl / Users - Destroy")

		}
	}
})();