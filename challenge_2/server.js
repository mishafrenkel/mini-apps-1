// install dependencies
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const transform = require(path.join(__dirname, './traverse.js'));


// // serve static assets (aka HTML page and app.js client actions scripts)
app.use(express.static(path.join(__dirname, 'client')));

// add logging middleware
app.use(function (request, response, next) {
  console.log(request.method, request.path);
  next();
});

// parse body
const bodyparser = require('body-parser');
app.use(bodyparser.json());

// POST request
// to load the data into the server
// app.post('/data', (req, res) => res.send('Hello Mars!'+ req));
app.post('/data', (req, res) => {
  // console.log(JSON.stringify(transform.traverse(req.body)));
  res.send(transform.traverse(req.body));
});

// GET request
// to pull all data out of the server
app.get('/data', (req, res) => res.send('Hello World!'));

// set server to listen
app.listen(3001, () => console.log('Example app listening on port 3001!'));