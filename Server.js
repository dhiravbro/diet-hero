var express = require('express');
var app = express();
var server = require('http').Server(app);
// var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./route/userroute');
const connectDB = require('./config/connectdb');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));
connectDB();
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
	next();
 });
app.use('/', router);


server.listen(5000, function() {
	console.log('server started on port 5000');
});
