const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  status: {
    type: Boolean,
    default: true,
  },
  contact: Number,
  username: String,
  password: String,
  otp: Number,
  image: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
