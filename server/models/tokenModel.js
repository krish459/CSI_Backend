const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("token", TokenSchema);
