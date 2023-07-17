const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    price: {
      type: Number,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
