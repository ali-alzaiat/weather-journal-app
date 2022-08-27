// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


//GET the data from the server
const getdata = (req,res) => {res.send(projectData);};
app.get('/all',getdata);

//POST the data from the API and the user input to the server and store it in projectData.
const postWeather = (req,res) => {
    const entry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };
    projectData = entry;    
};
app.post('/weather', postWeather);

// Setup Server
const port = 8000;
const listening = () => {console.log("server running on port: "+port)};
const server = app.listen(port, listening);
