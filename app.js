const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const express = require('express');
const https = require('https'); // https required 
const app = express();
const server = https.createServer({key: key, cert: cert }, app);

var io = require('socket.io')(server);
var osc = require('osc-min'),
    dgram = require('dgram'),
    remote;

////////////////////////////////////////////////////////////////////////
server.listen(8000);
console.log("SERVER LISTENING ON port 8000");
console.log("\n ------ \n sending osc on 3333\n");
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));
////////////////////////////////////////////////////////	

var udp = dgram.createSocket('udp4', function(msg, rinfo) {
	console.log("msg : " + msg +"Remote : " + rinfo);
});

/////IO CLIENT MSGs
io.on('connection', function (socket){
console.log("user "+socket.id + " connected");
	
	socket.on('kickVol',function(data){
			var kickVol = osc.toBuffer({
			oscType: 'message',
				address: '/kick/vol',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(kickVol, 0 , kickVol.length, 3333, "localhost");
		
	});
	socket.on('hatsVol',function(data){
		var hatsVol = osc.toBuffer({
			oscType: 'message',
				address: '/hats/vol',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(hatsVol, 0 , hatsVol.length, 3333, "localhost");
	});
	socket.on('seqVol',function(data){
		var seqVol = osc.toBuffer({
			oscType: 'message',
				address: '/seq/vol',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(seqVol, 0 , seqVol.length, 3333, "localhost");
	});
	socket.on('micVol',function(data){
		var micVol = osc.toBuffer({
			oscType: 'message',
				address: '/mic/vol',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(micVol, 0 , micVol.length, 3333, "localhost");
	});
	socket.on('seqNotes',function(data){
		var seqSldVal = parseFloat(data.value);
		var seqIndex = data.index + 1;
		var seqOscMsg = "/s" + seqIndex;
		var seqNotes = osc.toBuffer({
			oscType: 'message',
				address: seqOscMsg.toString(),
				args: [{
					type: 'float',
					value: seqSldVal
								}]
			});
		udp.send(seqNotes, 0 , seqNotes.length, 3333, "localhost");
	});
	socket.on('seqGate',function(data){
		var micVol = osc.toBuffer({
			oscType: 'message',
				address: '/seqGate',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(micVol, 0 , micVol.length, 3333, "localhost");
	});
	socket.on('seqFLT',function(data){
		var seqFLT = osc.toBuffer({
			oscType: 'message',
				address: '/seq/flt',
				args: [{
					type: 'float',
					value: data
								}]
			});
		udp.send(seqFLT, 0 , seqFLT.length, 3333, "localhost");
	});
	socket.on('atRel',function(data){
		var atRel = osc.toBuffer({
			oscType: 'message',
				address: '/seq/atRel',
				args: [{
					type: 'float',
					value: data
								}]
			});
		
		udp.send(atRel, 0 , atRel.length, 3333, "localhost");
	});
	socket.on('micDel',function(data){
		var micDel = osc.toBuffer({
			oscType: 'message',
				address: '/micDel',
				args: [{
					type: 'float',
					value: data
								}]
			});
		
		udp.send(micDel, 0 , micDel.length, 3333, "localhost");
	});
	socket.on('masDel',function(data){
		var masDel = osc.toBuffer({
			oscType: 'message',
				address: '/masDel',
				args: [{
					type: 'float',
					value: data
								}]
			});
		
		udp.send(masDel, 0 , masDel.length, 3333, "localhost");
	});
	
});
