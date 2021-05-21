const Admin = require("../model/Admin");

const saveAdmin = async (req, res) => {
  const admin = req.body;
  const newAdmin = new Admin(admin);
  try {
    await newAdmin.save();
    res.json(newAdmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails, "hy");
  try {
    const user = await new Admin.find({
      $and: [
        { username: userDetails.username },
        { password: username.password },
      ],
    });
    res.status(201).json(user);
    console.log("successfully login");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { saveAdmin, getUser };
