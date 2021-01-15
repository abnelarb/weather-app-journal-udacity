// Setup empty JS array to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


//intialize all codes with callback function
app.get('/all',sendData);
//setup a function to get /all data
function sendData(req,res) {
    res.send(projectData);
    projectData = [];
}
//function to post the data 
app.post('/add',addData); 
function addData (req, res) {
    console.log(req.body);
newData = {
    date: req.body.date,
    content: req.body.content,
    temp: req.body.temp,
    };
projectData.push(newData);
}


// Setup Server
const port = 8000;
const server = app.listen(port,listening);
function listening (){
    // to log the server is running on the callback debug
    console.log(`server is running on localhost: ${port}`);
};