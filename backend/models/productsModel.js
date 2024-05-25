const mongoose = require("mongoose");
const collectionName = "products";

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: function () {
      return this.req.user ? this.req.user._id : null;
    },
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase().replace(/\s+/g, ''),
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
  },
  streetAddress: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },
});

const Products = mongoose.model(collectionName, productSchema);

module.exports = Products;
