// Gordon R. Dewey
// Backend HTTP Project
// February 5, 2023

/* Reflection:
   1) One way that different programs can communicate to work together in completing a goal is using rest APIs. The term 'rest api' refers to a general category of application that can be accessed using HTTP requests such as GET, POST, PUT, and DELETE. While there are few actually restrictions on what and how these API's interact, it is standard for data to be exchanged in JSON and through URL parameters.
   2) While I had used express.js before this project, I did not know how query parameters were implemented. I learned how to use query parameters so I could allow GET /api/songs to be filtered.
   3) The most important expansion of this project would be to use a dedicated relational database like graph Ql as trying to manage an interrelated database without one is like trying to write a dissertation with rocks and sand.

*/

// Data Init & Helpers
genres = [
    { id:1, name: "pop" },
    { id:2, name: "hip hop" },
    { id:3, name: "rap" },
    { id:4, name: "classical" },
    { id:5, name: "rock" },
    { id:6, name: "jazz" },
    { id:7, name: "blues" },
    { id:8, name: "electronic" }
];

const _throw = (error) => (function(){throw error}());
const get_genre = (id) => (genres.filter(c => c.id == id)[0]) || _throw("No genre found!");

songs = [
    { id:1, name: "About Damn Time", artist: "Lizzo", genre: get_genre(1),
      release: new Date("April 14, 2022") },
    { id:2, name: "Just Like That", artist: "Bonnie Raitt", genre: get_genre(5),
      release: new Date("April 22, 2022") },
    { id:3, name: "The Heart Part 5", artist: "Kendrick Lamar", genre: get_genre(2),
      release: new Date("May 8, 2022") },
    { id:4, name: "Linger Awhile", artist: "Samara Joy", genre: get_genre(6),
      release: new Date("September 16, 2022") },
    { id:5, name: "Chaise Longue", artist: "Wet eg", genre: get_genre(5),
      release: new Date("15 June 2021") },
    { id:6, name: "Paul", artist: "Big Theif", genre: get_genre(5),
      release: new Date("May 12, 2016") },
    { id:7, name: "A Lizard State", artist: "King Krule", genre: get_genre(5),
      release: new Date("January 1, 2010") },
];

const get_song = (id) => (songs.filter(c => c.id == id)[0]) || _throw("No song found!");

const parse_name = (name, list, min, max) => 
      ((name // name is given
       && genres.filter(c => c.name == name).length == 0 // is new
       && name.length < max
       && name.length > min) // right length
       ? name : null ) || _throw("Invalid name");

// Web Init
var express = require('express');
var app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

// Genre Requests
// GETs
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genre/:id', (req, res) => {
    let genre;
    try {
	genre = get_genre(req.params.id);
    } catch(e) {
	return res.status(404).send(e);
    }

    return res.send(genre);
});

// POST
app.post('/api/genres', (req, res) => {
    let genre;
    try {
	genre = {
	    id: genres.length + 1,
	    name: parse_name(req.body.name, songs, 2, 20),
	};
    } catch(e) {
	return res.status(400).send(e);
    }
    
    genres.push(genre);
    res.send(genre);
});

// PUT
app.put('/api/genre/:id', (req, res) => {
    let genre;
    try {
	genre = get_genre(req.params.id);
	genre.name = req.body.name
	    ? parse_name(req.body.name, genres, 2, 30)
	    : genre.name;
    } catch(e) {
	return res.status(400).send(e);
    }
    
    res.send(genre);
});

// DELETE
app.delete('/api/genre/:id', (req, res) => {
    // Try to fetch spcificed genre
    let genre;
    try {
	genre = get_genre(req.params.id);
    } catch(e) {
	return res.status(404).send(e);
    }

    genres.splice(genre, 1);

    // Cleanup because i'm not actually using a relational database :(
    for(song of songs.filter(c => c.genre == genre))
	song.genre = null;
    
    return res.send(genre);
});

// Song Requests
// GETs
app.get('/api/songs', (req, res) => {
    if (req.query.year || req.query.month)
	return res.send({
	    query: {
		year: req.query.year,
		month: req.query.month
	    },
	    results: songs.filter(c => (
		(req.query.year ? c.release.getFullYear() == req.query.year : true)
		    && (req.query.month ? c.release.getMonth() == parseInt(req.query.month) : true))),
	});
    res.send(songs);
});

app.get('/api/song/:id', (req, res) => {
    let song;
    try {
	song = get_song(req.params.id);
    } catch(e) {
	return res.status(404).send(e);
    }

    return res.send(song);
});

// POST
app.post('/api/songs', (req, res) => {
    let song;
    try {
	song = {
	    id: songs.length + 1,
	    name: parse_name(req.body.name, songs, 2, 30),
	    artist: parse_name(req.body.artist, [], 2, 20),
	    genre: get_genre(req.body.genre),
	    release: new Date(req.body.release)
	};
    } catch(e) {
	return res.status(400).send(e);
    }
    
    songs.push(song);
    res.send(song);
});

// PUT
app.put('/api/song/:id', (req, res) => {
    let song;
    try {
	song = get_song(req.params.id);
	song.name = req.body.name
	    ? parse_name(req.body.name, songs, 2, 30)
	    : song.name;
	song.artist = req.body.artist
	    ? parse_name(req.body.artist, [], 2, 20)
	    : song.artist;
	song.genre = req.body.genre
	    ? get_genre(req.body.genre)
	    : song.genre;
	song.release = req.body.release
	    ? new Date(req.body.release)
	    : song.release;
    } catch(e) {
	return res.status(400).send(e);
    }
    
    res.send(song);
});

// DELETE
app.delete('/api/song/:id', (req, res) => {
    // Try to fetch spcificed song
    let song;
    try {
	song = get_song(req.params.id);
    } catch(e) {
	return res.status(404).send(e);
    }

    songs.splice(song, 1);
    
    return res.send(song);
});

app.listen(8000);


