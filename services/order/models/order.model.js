const mongoose = require('mongoose');

mongoose.model('order', {
     bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});