const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
app.use(bodyParser.json());
app.listen(5000);

const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

mongoose.connect(
  process.env.DBCONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DBase")
);

// app.post("/", (req, res) => {
//   console.log(req.body);
// });

// app.delete("/", (req, res) => {
//   res.send("this is delete request");
// });
// app.put("/", (req, res) => {
//   res.send("this is put request");
// });
