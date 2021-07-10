// Object to hold data in the server memory. Data not persisted to disk.
projectData = {};

// Import required packages.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up instance of Express app.
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);
app.use(cors());

// Set path to static web content.
app.use(express.static('website'));

const port = 3000;






