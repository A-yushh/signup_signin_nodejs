
const mongoose = require("mongoose");

const creatUesrsProfile = mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },
  lastName: {
    type: "string",
    required:true,
  },
  address:{
    type:"string",
    required:true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
 
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userProfile", creatUesrsProfile);
