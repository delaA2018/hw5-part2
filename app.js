"use strict";
const express = require("express");
const app = express();

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.send("Hello, World from Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: '+PORT+"!");
});


// STARTLINE CODE FOR THE ASSIGNMENT
let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    }, 
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    }, 
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];

let lameJoke = [
    {
        'joke' : 'Which bear is the most condescending?',
        'response' : 'Pan-DUH'
    },
    {
        'joke' : 'What would the Terminator be called in his retirement?',
        'response' : 'The Exterminator'
    }
];

let jokebook = {funnyJoke: funnyJoke, lameJoke: lameJoke};

app.get('/jokebook/categories', (req, res) =>{
    res.json({categories: categories});
});

app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit;

    if(jokebook[category]){
        const jokes = limit ? jokebook[category].slice(0, limit): jokebook[category];
        res.json({jokes: joke});
    }else{
        res.status(404).json({ error: 'No category listed for ${category}'});
    }
});

app.post('/jokebook/joke/new', (req,res) => {
    const { category, joke, response} = req.body;

    if (category && joke && response && jokebook[category]){
        jokebook[category].push({joke: joke, response: response});
        res.json({ jokes: jokebook[category ]});
    }else {
        res.status(400).json({ error: 'Invalid or insufficient user input'});
    }
});


// ENDLINE OF ADDED CODE FOR THE ASSIGNMENT