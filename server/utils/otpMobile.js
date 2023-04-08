const bcrypt = require("bcrypt");
const _ = require("lodash");
// const axios = require("axios")
const otpGenerator = require("otp-generator");
const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER } = require("../config");

const sendOtp = async (OTP, number) => {
  try {

    const accountSid = ACCOUNT_SID;
    const authToken = AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const message = await client.messages.create({
      body: `Your OTP is ${OTP}`,
      from: PHONE_NUMBER,
      to: number,
    });

    console.log(`OTP sent successfully to ${message.to}`);



    const otp = new Otp({ number: number, otp: OTP });

    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const resultOtp = await otp.save();
    console.log("Otp sent successfully");
  } catch (error) {
    console.log(`OTP not sent ${error}`);
  }
};

const verifyOtp = async (OTP, number, req, res) => {
  try {
    
    const otpHolder = await Otp.find({
      number: "+91" + number,
    });
    // console.log(otpHolder.length)
    if (otpHolder.length === 0)
      return res.status(400).send("You are using an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(OTP, rightOtpFind.otp);

    // console.log(validUser)
    // console.log(rightOtpFind.number)
    // console.log(req.body.number)
    if (rightOtpFind.number === '+91'+ req.body.number && validUser) {
      const user = new User(_.pick(req.body, ["number"]));
      const token = user.generateJWT();
      
      const result = user;
      
      await User.updateOne({ number: user.number }, { otpConfirmed: true });

      const OTPDelete = await Otp.deleteMany({
        number: rightOtpFind.number,
      });
      
      return res.status(200).send({
        message: "Otp verification Successful",
        token: token,
        data: result,
      });
      
    }
  } catch (error) {
    console.log(`OTP Verification Error :  ${error}`);
  }
};

module.exports = { sendOtp, verifyOtp };
