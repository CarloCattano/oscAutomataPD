var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

server.listen(8000);

app.use(express.static(__dirname + '/node_modules'));  
app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));
////////////////////////////////////////////////////////
io.on('connection', function (socket){
	console.log("user "+socket.id + " connected");
	socket.on('Sosc1',function(data){
		console.log("/Sosc1 "+data);
	});
	socket.on('Sosc2',function(data){
		console.log("/Sosc2 "+data);
		
	});
	
});

