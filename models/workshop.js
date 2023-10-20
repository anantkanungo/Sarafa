const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
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
module.exports = mongoose.model("Workshop" , workshopSchema);
