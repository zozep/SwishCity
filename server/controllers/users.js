var User = mongoose.model('User');
module.exports = (function() {

	return {
		index: function(req, res){
			User.find({}, function(err, records){
				if(err){
					return res.json(false);
				}else{
					return res.json(records);
				}
			})
		},
		getOne: function(req, res){
			User.findOne({_id: req.params.id}, function(err, record){
				console.log({_id: req.body.name})
				if(err){
					return res.json(false);
				}else{
					return res.json(record);
				}
			})
		},
		login: function(req, res){
			User.findOne({alias: req.body.alias}, function(err, user){
				console.log(user);
				if(!user){
					return res.json({err: "User is not found!"});

				}else{
					if(user.password == req.body.password){
						return res.json(user);
					}
					return res.json({err: "password does not match user's password!"});
				}
			})
		},
		create: function(req, res){

			var newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				alias: req.body.alias,
				atPark: false
			});
			newUser.save(function(err, newUser){
				if(err){
					console.log(err)
					if(err.code == 11000){
						res.json({errors: {alias: {message: "That nickname is already taken... Please choose another."}}})
					} else {
						res.json(err);
					}
				} else {
					res.json(newUser); 
				}
			})
		},
		edit: function(req, res){
			console.log("Server / Ctrl / Users - Edit")
		},
		update: function(req, res){
			User.findOne({_id:req.params.id}, function(err, record){
				record.name = req.body.name,
				record.email = req.body.email,
				record.password = req.body.password,
				record.alias = req.body.alias

				record.save(function(err){
					if(err){
						res.json({status:false});
					}
					else{
						res.json({status:true});
					}
				})
			})
		},
		destroy: function(req, res){
			User.remove({_id:req.params.id}, function(err){
				if(err){ 
					return res.json(false);
				}
				else{ 
					return res.json(true); 
				}
			})
		}	
	}
})();