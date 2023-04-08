const { Schema, model } = require("mongoose");

const ItemSchema = new Schema(
  {
    
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,

    }
  },
  { timestamps: true }
);

module.exports = model("item", ItemSchema);
