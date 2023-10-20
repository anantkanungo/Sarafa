const mongoose = require("mongoose");

const adminLoginSchema = new mongoose.Schema({
  userId :{
    type: String,
    required: true
  },
  password:{
    type : String,
    required: true,
    lowercase: true
  }

})

module.exports = mongoose.model("AdminLogin", adminLoginSchema);
