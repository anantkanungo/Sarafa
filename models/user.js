const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId :{
    type: String,
    required: true
  },
  password:{
    type : String,
    required: true,
    lowercase: true
  },
  role:{
    type: String,
    required: true,
    enum: ['customer','broker', 'workshop', 'kariger'],
    default: 'customer'
  }

})

module.exports = mongoose.model("User", userSchema);
