var username = prompt("Please enter a username:");

var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value) {
		socket.emit('chat message', {chatmsg : input.value, username : username});
		input.value = '';
	}
});

socket.on('chat message', function(msg) {
	var item = document.createElement('li');
	item.textContent = msg;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on('disconnect', function() {
	alert('Oh no, you got disconnected');
});

socket.on('user joined', function() {
  var item = document.createElement('li');
  item.textContent = "user joined";
  //item.
  messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user left', function() {
  var item = document.createElement('li');
  item.textContent = "user left";
  //item.
  messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});