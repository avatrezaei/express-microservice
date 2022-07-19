const express = require('express');
const axios = require('axios');
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


require("./models/order.model.js");

const Order = mongoose.model('order');
const url = process.env.MONGO_URL || "mongodb://mongo:27017/order";

mongoose
     .connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
     })
     .then(() => console.log('MongoDB Connected to order'))
     .catch(err => console.log(err));

app.get('/', (req, res) => {
     res.send('order service');
});

app.post('/order', (req, res) => {
     const order = new Order({
          customerId : mongoose.Types.ObjectId(req.body.customerId),
          bookId : mongoose.Types.ObjectId(req.body.bookId),
          initialDate : req.body.initialDate,
          quantity : req.body.quantity,
          deliveryDate : req.body.deliveryDate
     });
     order
          .save()
          .then(() => res.status(200).send(order))
          .catch(err => res.status(400).send(err));
});


app.get('/order', (req, res) => {
     Order.find()
          .then(orders => res.status(200).send(orders))
          .catch(err => res.status(400).send(err));
});


app.get('/order/:id', (req, res) => {
     Order.findById(req.params.id)
          .then(async order => {
               if (!order) {
                    return res.status(404).send('Order not found');
               }
               const orderObj = {
                    id : order._id,
                    initialDate : order.initialDate,
                    deliveryDate : order.deliveryDate,
                    customerName : "",
                    bookTitle : "",
               }

               await axios
                    .get(`http://127.0.0.1:3001/customer/${order.customerId}`)
                    .then(response => {
                         console.info(response);
                         orderObj.customerName = response.data.name;
                    })
                    .catch(err => console.log(err));

               await axios(`http://127.0.0.1:3000/book/${order.bookId}`)
                    .then(response => {
                         console.info(response);
                         orderObj.bookTitle = response.data.title;
                    })
                    .catch(err => console.log(err));

               res.status(200).send(orderObj);
          })
          .catch(err => res.status(400).send(err));
});

app.delete('/order/:id', (req, res) => {
     Order.findByIdAndDelete(req.params.id)
          .then((order) => {
               if(order){
                    res.status(200).send(order);
               }else{
                    res.status(404).send('Order not found');
               }
          })
          .catch(err => res.status(400).send(err));
});

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Up and running book service.Listening on port ${port}`));