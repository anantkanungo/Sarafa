const mongoose = require('mongoose');

const CatalogShcema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ['ring', 'earring','bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        default: 'ring'
    },
    image: {
        type: String
    },
    designCode:{
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
    createdAt: {
        type: Date,
        default: Date.now
       }

})

module.exports = mongoose.model("Catalog", CatalogShcema);