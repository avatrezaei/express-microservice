const mongoose = require('mongoose');

mongoose.model('book', {
     title :{
          type : String,
          required : true
     },
     author :{
          type : String,
          required : true
     },
     publisher :{
          type : String,
          required : false
     },
     publishDate :{
          type : Date,
          required : false
     },
     price :{
          type : Number,
          required : false
     },
     genre :{
          type : String,
          required : false
     },
     year :{
          type : Number,
          required : false
     },
     language :{
          type : String,
          required : false
     },
     published :{
          type : Boolean,
          required : true
     },
     cover :{
          type : String,
          required : false
     },
     pages :{
          type : Number,
          required : false
     },
     description :{
          type : String,
          required : false
     },
     publisher : {
          type : String,
          required : false
     }
});