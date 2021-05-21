const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const adminRouter = require("./routes/admin.js");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/admin", adminRouter);

mongoose
  .connect(process.env.DBConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connection successfully established at port:- " + PORT);
    })
  )
  .catch((err) => {
    console.log(err);
  });
