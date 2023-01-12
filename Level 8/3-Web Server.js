/* Gordon R. Dewey
   Irimina - Web Dev
   Level 8 Lesson 3
*/

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello World\n");
}).listen(3000);
console.log("Server up on port 3000");
