var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;

////////////////////////////////////////////////////////////////////////
server.listen(8000);

app.use(express.static(__dirname + '/node_modules'));  
app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));
////////////////////////////////////////////////////////	
	
// OSC
var udp = dgram.createSocket('udp4', function(msg, rinfo) {
	console.log(msg, rinfo);
});



/////IO CLIENT MSGs
io.on('connection', function (socket){
console.log("user "+socket.id + " connected");
	
socket.on('Sosc1',function(data){
		console.log("/Sosc1 "+data);
			var x = osc.toBuffer({
			oscType: 'message',
				address: '/love',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(x, 0 , x.length, 3333, "localhost");
		
	});
	socket.on('Sosc2',function(data){
		console.log("/Sosc2 "+data);
		
	});
	
});
