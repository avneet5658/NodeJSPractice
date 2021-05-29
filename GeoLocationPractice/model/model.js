const mongoose = require("mongoose");

const GeoLoc = mongoose.Schema({
  title: { type: String, required: true },
  location: { type: Object, required: true },
});

module.exports = mongoose.model("geoLoc", GeoLoc);
