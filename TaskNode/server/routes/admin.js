const express = require("express");
const { saveAdmin, getUser } = require("../controllers/controllers");
const router = express.Router();

router.post("/", saveAdmin);
router.get("/", getUser);

module.exports = router;
