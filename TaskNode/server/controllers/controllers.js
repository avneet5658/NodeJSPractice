const Admin = require("../model/Admin");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const fast2sms = require("fast-two-sms");
const multer = require("multer");
const otpGenerator = require("otp-generator");
const mailgun = require("mailgun-js");
const fs = require("fs");
const uuid = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const DOMAIN = "sandbox57949ce6cdec4045a3a2091f2f0d1e0b.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

const saveAdmin = (req, res) => {
  const admin = req.body;
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

  try {
    const user = await User.find({
      $and: [
        { username: userDetails.username },
        { password: userDetails.password },
      ],
    });
    if (user.length !== 0) {
      const status = user[0].status;
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
  try {
    const updates = await User.findByIdAndUpdate(current.id, {
      $set: { status: current.currentStatus },
    });
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

const getUserById = async (req, res) => {
  const id = req.params.id;
  await User.findById(id, (err, user) => {
    if (err) {
      return res.status(200).json({ message: "User not found" });
    }
    return res.status(201).json(user);
  });
};

const imageUploader = (req, res) => {
  const path = fs.readFileSync(req.file.path);
  const encodeImg = path.toString("base64");
  const _id = req.body.id;
  User.findOne({ _id }, (err, user) => {
    if (err || !user) {
      return res.status(200).json({ message: "User not find" });
    }
    user.updateOne({ image: encodeImg }, async (err, user) => {
      if (err || !user) {
        return res.status(200).json({ message: "User not find" });
      }
      return await res.status(201).json(user);
    });
  });
};

const paymentHandle = async (req, res) => {
  const { product, token } = req.body;
  console.log(product, token);
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charge.create(
        {
          amount: product.price * 100,
          current: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        idempotencyKey
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
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
  getUserById,
  imageUploader,
  upload,
  paymentHandle,
};
