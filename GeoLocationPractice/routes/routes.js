const express = require("express");
const GeoLoc = require("../model/model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const status = await new GeoLoc(req.body).save();
    res.status(201).json(status);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/", (req, res) => {
  const options = {
    location: {
      $geoWithin: {
        $centerSphere: [[77.023922, 28.488168], 0.5 / 3963.2],
      },
    },
  };
  GeoLoc.find(options)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

module.exports = router;
