const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
            default: 0,
        },
        old_price: {
            type: Number,
            require: true,
            default: 0,
        },
        category: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        details: {
            type: String,
        },
        brand: {
            type: String,
        },
        image: {
            type: String,
            require: true,
        },

    //images: [{ titre: { type: String } }],
    //review:[reviewSchema],

        rating:{
            type:Number,
            default:0
        },
        numReviews:{
            type:Number,
            default:0
        }
    },
    {
      timestamps: true,
    }
    
);

productSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Product",productSchema);
