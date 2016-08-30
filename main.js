// Load the http module to create an http server.
var http = require('http');
var Handlebars = require('handlebars');
var fs = require('fs');

var express = require('express'),


    app = express(),
    port = process.env.PORT || 8000;




app.listen(port)

app.use(express.static('images'));

// Configure our HTTP server to respond with Hello World to all requests.

app.get('/', function (request, response) {

    response.writeHead(200, {"Content-Type": "text/html"});

    var images = fs.readdirSync("images");

    // form this into pages with json
    // were we correctly match image to word when page is reversed
    var contents = fs.readFileSync('ord.html', 'utf8');

    var jsonData = [];

    if (images.length == 0) {
	response.end("ERROR: no images available");
	return;
    }
    
    // make sure we have an even number
    while (images.length%8) {
	images.push(images[0]);
    }
    
    for (var i = 0; i < images.length; i+=8) {
	var entry = {};
	entry.word0 = images[i+0].split('.')[0].toUpperCase();
	entry.word1 = images[i+1].split('.')[0].toUpperCase();
	entry.word2 = images[i+2].split('.')[0].toUpperCase();
	entry.word3 = images[i+3].split('.')[0].toUpperCase();
	entry.word4 = images[i+4].split('.')[0].toUpperCase();
	entry.word5 = images[i+5].split('.')[0].toUpperCase();
	entry.word6 = images[i+6].split('.')[0].toUpperCase();
	entry.word7 = images[i+7].split('.')[0].toUpperCase();

	entry.fs0 = entry.word0.length >= 5 ? "30px" : "50px";
	entry.fs1 = entry.word1.length >= 5 ? "30px" : "50px";
	entry.fs2 = entry.word2.length >= 5 ? "30px" : "50px";
	entry.fs3 = entry.word3.length >= 5 ? "30px" : "50px";
	entry.fs4 = entry.word4.length >= 5 ? "30px" : "50px";
	entry.fs5 = entry.word5.length >= 5 ? "30px" : "50px";
	entry.fs6 = entry.word6.length >= 5 ? "30px" : "50px";
	entry.fs7 = entry.word7.length >= 5 ? "30px" : "50px";
	
	entry.img0 = images[i+0];
	entry.img1 = images[i+1];
	entry.img2 = images[i+2];
	entry.img3 = images[i+3];
	entry.img4 = images[i+4];
	entry.img5 = images[i+5];
	entry.img6 = images[i+6];
	entry.img7 = images[i+7];
	jsonData.push(entry);
    }

    jsonData;
    
    var template=Handlebars.compile(contents);
    
    response.end(template(jsonData));
});

// Listen on port 8000, IP defaults to 127.0.0.1
//server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

