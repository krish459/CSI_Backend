const { Schema, model } = require("mongoose");

const OtpSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt:{type: Date, default: Date.now, index:{expires: 300}}
  },
  { timestamps: true }
);

module.exports = model("otp", OtpSchema);
