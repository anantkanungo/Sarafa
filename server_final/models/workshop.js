const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({

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
  kariger:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kariger'
  }],
  task: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AddOrder' 
 }],
 completedDate:{
  type: Date,
  default: null

}
})

module.exports = mongoose.model("Workshop", workshopSchema);