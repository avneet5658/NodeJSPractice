const Admin = require("../model/Admin");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");
var otpGenerator = require("otp-generator");

const mailgun = require("mailgun-js");
const DOMAIN = "sandbox57949ce6cdec4045a3a2091f2f0d1e0b.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const saveAdmin = (req, res) => {
  const admin = req.body;
  console.log(admin);
  try {
    Admin.findOne({ email: admin.email }, async (emailerr, emailuser) => {
      if (emailerr || emailuser) {
        return res.status(200).json({ message: "Email already exists" });
      }
      console.log("email is not duplicate");
      Admin.findOne(
        { contact: admin.contact },
        async (contacterr, contactuser) => {
          console.log(contactuser, " contact user");
          if (contacterr || contactuser) {
            return res.status(200).json({ message: "Contact already exists" });
          }
          const newAdmin = new Admin(admin);
          await newAdmin.save();
          res.json(newAdmin);
        }
      );
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAdmin = async (req, res) => {
  const userDetails = req.body;
  try {
    const user = await Admin.find({
      $and: [
        { username: userDetails.username },
        { password: userDetails.password },
      ],
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails);

  try {
    const user = await User.find({
      $and: [
        { username: userDetails.username },
        { password: userDetails.password },
      ],
    });
    console.log(user);
    if (user.length !== 0) {
      const status = user[0].status;
      console.log(status);
      if (status) {
        return res.status(201).json(user);
      }
      return res.status(200).json({ isActive: false });
    }
    return res.status(200).json({ login: "failed" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json(user);
    console.log(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const saveUser = (req, res) => {
  const userData = req.body;
  const email = userData.email;
  const contact = userData.contact;
  try {
    User.findOne({ email }, async (emailerr, emailuser) => {
      if (emailerr || emailuser) {
        return res.status(200).json({ error: "Email already exists" });
      }
      User.findOne({ contact }, async (contacterr, contactuser) => {
        if (contacterr || contactuser) {
          return res.status(200).json({ error: "Contact already exists" });
        }
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateStatus = async (req, res) => {
  const current = req.body;
  console.log(current);
  try {
    const updates = await User.findByIdAndUpdate(current.id, {
      $set: { status: current.currentStatus },
    });
    console.log(updates);
    res.status(201).json(updates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const currentId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(currentId);
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userUpdate = req.body;
  try {
    const updates = await User.findByIdAndUpdate(userUpdate.id, {
      $set: {
        name: userUpdate.names,
        email: userUpdate.email,
        contact: userUpdate.contact,
      },
    });
    res.status(201).json(updates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    User.findOne({ email }, async (err, user) => {
      if (err || !user) {
        return res.status(200).json({ message: "User does not exist" });
      }
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_RESET_PRIVATEKEY,
        { expiresIn: "5m" }
      );
      const data = {
        from: "noreply@valuecoder.com",
        to: email,
        subject: "Reset Password",
        html: `
        <h1>Press the link to reset your password</h1><br/>
        <p>Link will expires in 5 min</p>
        <a href="${process.env.CLIENT_URL}/resetPassword/${token}">click here</a>
        `,
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          res.json({ message: error.message });
        } else {
          res.json({ message: "Successfully send" });
        }
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const resetPassword = (req, res) => {
  const { token, newPass } = req.body;
  console.log(token, newPass);
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_RESET_PRIVATEKEY,
      async (err, decodedData) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Token expired or may be not a valid token" });
        } else {
          const _id = decodedData._id;
          console.log(_id);
          User.findOne({ _id }, async (err, user) => {
            if (err) {
              return res.json({ error: err.message });
            }
            await user.updateOne({ password: newPass }, (err, body) => {
              if (err) {
                return res.json({ error: err.message });
              } else {
                return res.json({ message: body });
              }
            });
          });
        }
      }
    );
  }
};

const forgetLinkOtp = async (req, res) => {
  const { contact } = req.body;
  console.log(contact);

  try {
    User.findOne({ contact }, async (err, user) => {
      if (err || !user) {
        return res.status(200).json({ message: "User does not exists" });
      }
      const otp = otpGenerator.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChars: false,
      });
      console.log(otp);
      await user.updateOne({ otp }, async (err, body) => {
        if (err) {
          return res.json({ message: err.message });
        } else {
          let options = {
            authorization: process.env.FASTSMS_API_KEY,
            message: `Your One time password is ${otp}.Enter this code for verification.`,
            numbers: [contact],
          };
          const response = await fast2sms.sendMessage(options);
          return res.json({ message: "Successfully Sent" });
        }
      });
    });
  } catch (error) {
    return res.json({ err: error });
  }
};

const verifyOtp = (req, res) => {
  const { otp } = req.body;
  try {
    User.findOne({ otp }, async (err, user) => {
      if (err || !user) {
        return res.status(200).json({ message: "Entered a wrong Otp" });
      }
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_RESET_PRIVATEKEY,
        { expiresIn: "5m" }
      );
      user.updateOne({ otp: "" }, (err, body) => {
        if (err) {
          return res.status(200).json({ message: "not updated" });
        }
        return res.json({ message: token });
      });
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = {
  saveAdmin,
  getAdmin,
  getUser,
  getAllUser,
  saveUser,
  updateStatus,
  deleteUser,
  updateUser,
  forgetPassword,
  resetPassword,
  forgetLinkOtp,
  verifyOtp,
};
