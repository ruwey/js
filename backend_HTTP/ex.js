/* Gordon R. Dewey
   Irimina - Web Dev
   Backend Project
*/

const express = require('express');
const app = express();
app.use(express.json());

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

app.post('/api/courses', (req, res) => {
    if (req.body.name.length <= 3) {
	res.status(404).send("Name too short!");
	return;
    }
    const course = {
	id: courses.length + 1,
	name: req.body.name
    }

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
	res.status(404).send("Course not found!");
	return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    console.log(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
	res.status(404).send("Course not found!");
	return;
    }

    courses.splice(course, 1);
    res.send(course);
});
    
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

/* Reflection:
   I have always liked hacking on apis. I think that they are one of
   the more accessible ways to interact with the backend's of websites
   you use. For example, my first exposure to web development was
   hacking on the Spotify API to get account data. It is also key
   to give API support to your app as it allows other people to
   adapt that project to there own use cases. 
*/
