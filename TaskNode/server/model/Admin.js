const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  dob: String,
  username: String,
  password: String,
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
