const express = require("express");
const mongoose = require("mongoose");
const locRouter = require("./routes/routes.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/loc", locRouter);
mongoose.connect(
  "mongodb+srv://avneet5658:Hello@cluster0.o2bdy.mongodb.net/geoloc?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);
app.listen(5000);
