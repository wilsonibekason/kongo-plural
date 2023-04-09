const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductMongooseSchema = new Schema({
  description: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductMongooseSchema);
