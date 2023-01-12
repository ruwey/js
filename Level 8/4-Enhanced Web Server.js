/* Gordon R. Dewey
   Irimina - Web Dev
   Level 8 Lesson 3
*/

var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname.substring();
    console.log("Request for " + pathname + " received.");
    fs.readFile (pathname, (err, data) => {
	if(err) {
	    console.log(err);
	    res.writeHead(404, {'Content-Type': 'text/html'});
	} else {
	    res.writeHead(404, {'Content-Type': 'text/html'});
	    res.write(data.toString());
	};
	res.end();
    });
}).listen(3000);

console.log("Server up on port 3000");
