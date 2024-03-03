const mongoose = require('mongoose');

const OrderShcema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        // enum: ['ring', 'earring', 'bangle', 'chain', 'necklace', 'nosepin', 'pendants', 'mangalsutra', 'others'],
        // default: 'others'
    },
    orderId: {
        type: String
    },
    image: {
        type: [String]
    },
    audio: {
        type: [String]
    },
    description: {
        type: String,
    },
    quantity: {
        type: String,
    },
    size: {
        type: String,

    },
    weight: {
        type: String
    },
    tunch: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    statusIs: {
        type: String,
        enum: ['pending', ' processing', 'completed','collect', 'rejected'],
        default: 'pending',
        required: true
    },
    urgent: {
        type: Boolean,
        default: false
    },
    kariger:{
        type: String,
        // ref: 'Kariger',
    },
    workshop: {
        type: String,
        // ref: 'Workshop',
    },
    // task: {
    //     type: [String],
    //     ref: 'AssignTask'
    // },
},
    {
        timestamps: true
    })

module.exports = mongoose.model("AddOrder", OrderShcema);