const mongoose = require("mongoose");
const User = require('./userModel')
const mongoosePaginate = require('mongoose-paginate-v2');


const reviewSchema = mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
      user: {
        type: mongoose.ObjectId,
        require: true,
        ref: User,
      },
      product:{
        type: mongoose.ObjectId,
        require: true,
        ref: "Product" ,
      },
      productName:{
        type: String,
      }
    },
    {
      timestamps: true,
    }
);

reviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Review",reviewSchema);
