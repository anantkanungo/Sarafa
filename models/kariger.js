const mongoose = require('mongoose');

const karigerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    workshop:{
        type: String
    },
    address: {
        type: String
    }
})
module.exports = mongoose.model("Kariger" , karigerSchema);
