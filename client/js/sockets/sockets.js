$(document).ready(function(){
	console.log("it started")
	if(socket == undefined){
		var socket = io.connect();
		var name = {{dashCtrl.user.alias}}
		console.log("hello")
		
		socket.emit("new user", name);
		socket.on("new user notification", function(name){
			$("#messages").append("<p> " + name + " has joined!</p>")
		}
	})

	$("form").submit(function(){


		socket.emit("new message",$("#m").val());
		$("#m").val("");

		return false;
		// all the line above does is make it so the page does not reload when someone submits the form
	})

	socket.on("new message notification", function(data){
		$("#messages").append("<p> " + data.username + ": " + data.message + "</p>")
	})
})



// emit to server/client
// socket.emit("<event name>", <things to emit>)

// broadcast the event to everyone except for 1 person
// socket.broadcast.emit("<event name>", <things you want to broadcast>)

// broadcast to everyone

// io.emit