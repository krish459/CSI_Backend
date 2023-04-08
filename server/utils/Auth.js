const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET, PROXY } = require("../config");
const passport = require("passport");
const tokenModel = require("../models/tokenModel");
const shortId = require("shortid");
const { sendEmail } = require("./email");
const _ = require("lodash")
// const axios = require("axios")
const otpGenerator = require("otp-generator")
const Otp = require("../models/otpModel");
const { sendOtp } = require("./otpMobile");

const userRegister = async (userDets, res) => {
  try {
    // validate the user
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false,
      });
    }
    let emailRegistered = await validateEmail(userDets.email);
    if (!emailRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }
    let numberRegistered = await validateNumber(userDets.number);
    if (!numberRegistered) {
      return res.status(400).json({
        message: `Number is already registered.`,
        success: false,
      });
    }

    const OTP = otpGenerator.generate(6, {
      digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    })
    console.log(`OTP: ${OTP}`);    
    await sendOtp(OTP, '+91' + userDets.number)

    // get the hashed password
    const hashedPassword = await bcrypt.hash(userDets.password, 12);

    const newUser = new User({
      ...userDets,
      password: hashedPassword,
    });

    await newUser.save();

    let token = await new tokenModel({
      userId: newUser._id,
      token: shortId.generate(),
    }).save();

    const message = `${PROXY}/api/users/verify/${newUser._id}/${token.token}$`;

    await sendEmail(newUser.email, "verify Email", message);
    // await sendMagicLinkEmail(newUser.email, "verify Email", message);

    return res.status(201).json({
      message: `User is successfully registered. Check your mail.`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unable to create your account`,
      success: false,
    });
  }
};

const userLogin = async (userCreds, res) => {
  let { username, password } = userCreds;
  // first check if username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: `Username is not found. Invalid login credentials`,
      success: false,
    });
  }
  if (!user.confirmed) {
    return res.status(404).json({
      message: "Please confirm your email to login",
      success: false,
    });
  }
  if (!user.otpConfirmed) {
    return res.status(404).json({
      message: "Please confirm your Number to login",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // issue the token
    let token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: `User is successfully Logged in`,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: `Incorrect Password`,
      success: false,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("invalid link 1");

    const token = await tokenModel.findOne({
      userId: user._id,
      // token: req.params.token,
    });
    // console.log(user._id);
    // console.log(token.userId)
    if (!token) return res.status(400).send("invalid link 2");

    await User.updateOne({ _id: user._id, confirmed: true });
    await tokenModel.findByIdAndRemove(token._id);

    res.status(200).send("Email verify Successfully");
  } catch (error) {
    res.status(400).send(`An error occurred ${error}`);
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};
const validateNumber = async (number) => {
  let user = await User.findOne({ number });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    name: user.name,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  verifyEmail,
};
