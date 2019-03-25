const path = require('path');
const express = require('express');
const app = express();
const socket = require(path.join(__dirname, './db/index.js'));


// server static assets
// app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('public'));

app.post('/orders', (req, res) => res.send('Hello, Accounting here!', socket));
// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('VirtualStoreServer listening on port 3000!'));
