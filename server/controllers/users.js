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
				if(err){
					return res.json(false);
				}else{
					return res.json(record);
				}
			})
		},

		create: function(req, res){

			var newUser = new User({
				name: req.body.name,
				name: req.body.email,
				name: req.body.password,
				name: req.body.alias
			});

			newUser.save(function(err, newUser){
				console.log(newUser);
				if(err){ 
					res.json(err);
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