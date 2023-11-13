const mongoose = require('mongoose');

const OrderShcema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ['ring', 'earring','bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        default: 'ring'
    },
    image: {
       type: String
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        min: 1
    },
    size: {
        type: Number,

    },
    weight: {
        type: Number
    },
    tunch: {
        type: Number,
        min: 1,
        max: 100
    }

})

module.exports = mongoose.model("AddOrder", OrderShcema);
