const mongoose = require('mongoose');

const AssignTaskShcema = new mongoose.Schema({
    order: [{
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
    }],
    kariger: {
        name: {
            type: String,
            ref: "User",
            required: true
        },
        profile: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: Number
        },
        workshop: {
            type: String,
            ref: 'Workshop'
        },
    },
    workshop: {
        name: {
            type: String,
            ref: "User",
            required: true
          },
          profile: {
            type: String
          },
          address: {
            type: String
          },
          phone: {
            type: Number
          },
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("AssignTask", AssignTaskShcema);