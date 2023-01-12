/* Gordon R. Dewey
   Irimina - Web Dev
   Level 8 Lesson 1
*/

const fs = require('fs');

const data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Blocking Ended");

// Async Implemenation:
fs.readFile('input.txt', (err, data) => {
    if (err)
	return console.err(err);
    console.log(data.toString());
});


console.log("NonBlocking Ended");
