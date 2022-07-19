const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


require("./models/book.model.js");

const Book = mongoose.model('book');
const url = process.env.MONGO_URL || "mongodb://mongo:27017/book";

mongoose
     .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
     })
     .then(() => console.log('MongoDB Connected to book'))
     .catch(err => console.log(err));

app.get('/', (req, res) => {
     res.send('book service');
});

app.post('/book', (req, res) => {
     const book = new Book(req.body);
     book
          .save()
          .then(() => res.status(200).send(book))
          .catch(err => res.status(400).send(err));
});


app.get('/book', (req, res) => {
     Book.find()
          .then(books => res.status(200).send(books))
          .catch(err => res.status(400).send(err));
});


app.get('/book/:id', (req, res) => {
     Book.findById(req.params.id)
          .then(book => res.status(200).send(book))
          .catch(err => res.status(400).send(err));
});

app.delete('/book/:id', (req, res) => {
     Book.findByIdAndDelete(req.params.id)
          .then(() => res.status(200).send('Book Deleted'))
          .catch(err => res.status(400).send(err));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Up and running book service.Listening on port ${port}`));