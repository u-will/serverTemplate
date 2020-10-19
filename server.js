'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');
const PORT  = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
res.render('pages/index');
});
app.get('/error', (req, res) => {
  res.render('pages/error');
  });
app.get('/show', (req, res) => {
  res.render('pages/searches/show');
  });
app.get('/hello', (req, res) => {
  res.send('Hello World');
  });
app.post('/searches', createSearch);

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request.body:', req.body);
  console.log('form data:', req.body.search);

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
  .then(data => {
    console.log('google books data:', data);
    
  });
};

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});