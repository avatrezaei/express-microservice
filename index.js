let book = connet("127.0.0.1:27017/book");
let customer = connet("127.0.0.1:27017/customer");
let order = connet("127.0.0.1:27017/order");


book.book.insertMany([
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8f8"),
          title : "The Lord of the Rings",
          author : "J.R.R. Tolkien",
          pages : 1254,
          publisher : "Allen & Unwin",
          published : true,
          publishDate : new Date("1954-01-01"), 
          price : 19.99,
          genre : "Fantasy",
          year : 1954,
          language : "English",
          cover : "https://images-na.ssl-images-amazon.com/images/I/51Zu%2Btj3%2BHXL._SX331_BO1,204,203,200_.jpg",
          __v : 0,
     },
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8f9"),
          title : "The Hobbit",
          author : "J.R.R. Tolkien",
          pages : 310,
          publisher : "Allen & Unwin",
          published : true,
          publishDate : new Date("1937-01-01"),
          price : 19.99,
          genre : "Fantasy",
          year : 1937,
          language : "English",
          cover : "https://images-na.ssl-images-amazon.com/images/I/51Zu%2Btj3%2BHXL._SX331_BO1,204,203,200_.jpg",
          __v : 0,
     }
]);


customer.customer.insertMany([
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8fa"),
          name : "John",
          age : 25,
          surname : "Doe",
          email : "johndoe@gmail.com",
          password : "123456",
          address : "123 Main St",
          city : "New York",
          state : "NY",
          zip : "10001",
          phone : "123-456-7890",
          __v : 0,
     },
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8fb"),
          name : "Jane",
          surname : "Doe",
          age : 25,
          email : "janedoe@gmail.com",
          password : "123456",
          address : "123 Main St",
          city : "New York",
          state : "NY",
          zip : "10001",
          phone : "123-456-7890",
          __v : 0,
     }
]);

order.order.insertMany([
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8fc"),
          customerId : ObjectId("5b8f8f8f8f8f8f8f8f8f8fa"),
          bookId : ObjectId("5b8f8f8f8f8f8f8f8f8f8f8"),
          quantity : 1,
          initialDate : new Date("2019-01-01"),
          deliveryDate : new Date("2019-01-01"),
          __v : 0,
     },
     {
          _id: ObjectId("5b8f8f8f8f8f8f8f8f8f8fd"),
          customerId : ObjectId("5b8f8f8f8f8f8f8f8f8f8fa"),
          bookId : ObjectId("5b8f8f8f8f8f8f8f8f8f8f9"),
          quantity : 1,
          initialDate : new Date("2019-01-01"),
          deliveryDate : new Date("2019-01-01"),
          __v : 0,
     }
]);