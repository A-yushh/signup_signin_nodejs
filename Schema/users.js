const mongoose = require("mongoose");

const userShcema = mongoose.Schema({
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  phonNumber: {
    type: "number",
    required: true,
  },
  role:{
    type:String,
    enum:["Admin", "Student", "Visitor"]
},

  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userShcema);
