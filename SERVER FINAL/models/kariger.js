const mongoose = require("mongoose");

const karigerSchema = new mongoose.Schema({
    
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId :{
        type: String,
        required: true,
        unique: true
      },
      password:{
        type : String,
        // required: true
      },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workshop'
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddOrder' 
     }],
    // task: {
    //     type: [String],
    // },
    // task: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AssignTask' }],
    statusIs: {
        type: String,
        enum: ['busy', 'availabe'],
        default: 'availabe'
    }
})

module.exports = mongoose.model("Kariger", karigerSchema);