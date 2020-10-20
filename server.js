'use strict';

const express = require('express');
const superagent = require('superagent');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
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
// app.get('/show', (req, res) => {
//   res.render('pages/searches/show');
// });
app.get('/new', (req, res) => {
  res.render('pages/searches/new');
});
app.get('/hello', (req, res) => {
  res.send('Hello World');
});
app.get('*', errorMessage)

app.post('/searches', createSearch);

function Books(book) {

this.title = book.authors ? book.authors: 'none available';
this.authors = book.title ? book.title: 'none available';
let coverArt = google_books_data.imageLinks.Thumbnail ? 'google books data':, book.imageLinks.Thumbnail: 'https://i.imgur.com/J5LVHEL.jpg';
if (book.imageLinks.smallThumbnail.slice(0, 5) !== 'https') {
  coverArt = 'https' + coverArt.slice(4, coverArt.length)
}
this.coverArt = coverArt;
// const greeting = 'hello' + personalbar.object ? person.name: 'person';
}


function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log('request.body:', req.body);
  console.log('form data:', req.body.search);

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
  .then(data => {
    // let bookModel = new Books(book);
    // console.log(bookModel);
      console.log('google books data:', data.body.items[0].volumeInfo);
      let apiInfo = data.body.items.map(x => {
        return new Books(x);
      })
res.render('pages/searches/show', {bookModel: apiInfo});
    // }).catch (error) {
    // errorMessage();
    // }
    
  });
}

function errorMessage(request, response) {

  response.status(500).send('OOPS!');
  //response if things go wrong
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});