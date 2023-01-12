/* Gordon R. Dewey
   Irimina - Web Dev
   Backend Project
*/

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Oh hi, I didn't see you there.");
});

const courses = [
    {id: 1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name: 'Cybersecurity'},
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
	res.status(404).send("Course not found!");
	return;
    }
    res.send(course);
});
    
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
