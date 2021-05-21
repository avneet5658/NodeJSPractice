const express = require("express");
const multer = require("multer");

const app = express();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("single file uploaded");
});

app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.file);
  res.send("Multiple files uploaded");
});
app.listen(3000, () => {
  console.log("connected");
});
