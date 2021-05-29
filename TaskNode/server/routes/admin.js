const express = require("express");
const {
  saveAdmin,
  getAdmin,
  getAllUser,
  saveUser,
  updateStatus,
  deleteUser,
  updateUser,
  getUser,
  forgetPassword,
  resetPassword,
  forgetLinkOtp,
  verifyOtp,
} = require("../controllers/controllers");
const router = express.Router();

router.post("/signup", saveAdmin);
router.post("/loginAdmin", getAdmin);
router.post("/loginUser", getUser);
router.get("/user", getAllUser);
router.patch("/status", updateStatus);
router.post("/registerUser", saveUser);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser", updateUser);
router.put("/forgetPassword", forgetPassword);
router.put("/resetPassword", resetPassword);
router.put("/otp", forgetLinkOtp);
router.put("/verifyOtp", verifyOtp);

module.exports = router;
