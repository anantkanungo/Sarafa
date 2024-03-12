const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

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
  agent: {
    type: String,
    ref: "Distributor"
  },
  profile: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: Number
  }
})

module.exports = mongoose.model("Customer", customerSchema);