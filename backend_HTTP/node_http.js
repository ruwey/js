/* Gordon R. Dewey
   Irimina - Web Dev
   Backend Project
*/

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/') {
	res.write('Hello World ');
	res.write('First test server =)');
	res.end();
    } else if (req.url == '/api/courses') {
	res.write(JSON.stringify([1,2,3]));
	res.write('This is a list of offerings');
	res.write(' at Brooklyn Tech');
	res.end();
    }
});

server.listen(3000);
console.log("Server up on port 3000");
