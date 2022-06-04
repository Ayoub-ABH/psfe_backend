const mongoose = require("mongoose");
const User = require('../models/userModel')
const Product = require('../models/productModel')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: User
    },
    orderItems: [
      {
        product: {
          type: mongoose.ObjectId,
          require: true,
          ref: Product
        },
        quantity:{
          type:Number,
          require:true
        }
      }
    ],
    shippingAddress: {
      telephone: { type: String, require: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      default:'card'
    },
    status:{
      type: String,
      enum:['pending','validated','delivered','canceled'],
      default:'pending'
    },
    name:{
      type: String,
      require:true
    },
    // paymentResult: {
    //   id: { type: String },
    //   status: { type: String },
    //   update_time: { type: String },
    //   email_address: { type: String },
    // },

    // shippingPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // isPaid: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // paidAt: {
    //   type: Date,
    // },
    // isDelivered: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // deliveredAt: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
