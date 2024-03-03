const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId :{
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String
  },

  role:{
    type: String,
    required: true,
    enum: ['customer', 'distributor', 'workshop', 'kariger'],
    default: 'customer'
  },
name: {
  type: String,
  required: true
},
device_info: {
  type: mongoose.Schema.Types.Mixed
}
})

module.exports = mongoose.model("User", userSchema);
