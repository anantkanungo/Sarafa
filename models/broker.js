const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    address: {
        type: String
    }
})
module.exports = mongoose.model("Broker" , brokerSchema);
