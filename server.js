// Object to hold data in the server memory. Data not persisted to disk.
const projectData = {};
projectData['data'] = [];

// Import required packages.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up instance of Express app.
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Set path to static web content.
app.use(express.static('website'));

app.post('/weather', function(req, res) {
    console.log('Post request received.');
    projectData['data'].push(req.body);
    res.send();
})

app.get('/weather', function(req, res) {
    console.log('Get request received.');
    res.send(projectData['data']);
})

// Set up and start our server.
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is listening on port ${server.address().port}`);
}
