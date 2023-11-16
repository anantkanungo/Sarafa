const mongoose = require('mongoose');

const OrderShcema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ['ring', 'earring','bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        default: 'others'
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
    },
    // createdBy:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
       },
    urgent:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("AddOrder", OrderShcema);
