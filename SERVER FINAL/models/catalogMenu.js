const mongoose = require('mongoose');

const CatalogMenuSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        // enum: ['ring', 'earring', 'bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        // default: 'others'
    },
    image: {
        type: String
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("CatalogMenu", CatalogMenuSchema);