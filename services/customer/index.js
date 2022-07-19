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


require("./models/customer.model.js");

const Customer = mongoose.model('customer');
const url = process.env.MONGO_URL || "mongodb://mongo:27017/customer";

mongoose
     .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
     })
     .then(() => console.log('MongoDB Connected to customer'))
     .catch(err => console.log(err));

app.get('/', (req, res) => {
     res.send('customer service');
});

app.post('/customer', (req, res) => {
     const customer = new Customer(req.body);
     customer
          .save()
          .then(() => res.status(200).send(customer))
          .catch(err => res.status(400).send(err));
});


app.get('/customer', (req, res) => {
     Customer.find()
          .then(customers => res.status(200).send(customers))
          .catch(err => res.status(400).send(err));
});


app.get('/customer/:id', (req, res) => {
     Customer.findById(req.params.id)
          .then(customer => res.status(200).send(customer))
          .catch(err => res.status(400).send(err));
});

app.delete('/customer/:id', (req, res) => {
     Customer.findByIdAndDelete(req.params.id)
          .then(() => res.status(200).send('Customer Deleted'))
          .catch(err => res.status(400).send(err));
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Up and running book service.Listening on port ${port}`));