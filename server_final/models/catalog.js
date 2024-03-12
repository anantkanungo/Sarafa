const mongoose = require('mongoose');

const CatalogShcema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        // enum: ['ring', 'earring','bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        // default: 'ring'
    },
    image: {
        type: [String]
    },
    designCode:{
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    size: {
        type: String,

    },
    weight: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
       }

})

module.exports = mongoose.model("Catalog", CatalogShcema);