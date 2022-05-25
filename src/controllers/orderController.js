const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);




const checkoutSession = async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "MA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    }, line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });

}








//checkout page
//passer une commande 
//access simple user
const saveOrder = asyncHandler(async (req, res) => {

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
  } = req.body;
  

  if(!shippingAddress.telephone || !shippingAddress.address || !shippingAddress.city|| !shippingAddress.postalCode|| !shippingAddress.country || !totalPrice){
    res.status(400);
    throw new Error("please fill all fields");
  }

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order items found");
  }
  else {

    let newOrderItems =  orderItems.map(  (orderItem) => {
      
      const newQuantity=(orderItem.quantity - orderItem.cartQuantity);
      
      Product.findByIdAndUpdate(orderItem._id,{$set: {quantity:newQuantity}},(error) => {
        if (error) {
            res.status(400);
            throw new Error( error);
        } 
      })


      return {
        product: orderItem._id,
        quantity: orderItem.cartQuantity
      }
    });




    const order = new Order({
    user: req.user.id,
    orderItems: newOrderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
    })


    order.save((error) => {
        if (error) {
            res.status(404);
            throw new Error("error order not saved");
        } else {
            res.status(200).json({ message: "order saved" });
        }
    });

  }
})

// page profile
// all orders of a user
// access user
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400)
    throw new Error("no orders found")
  }
});


//page admin
// all orders of all users
//access Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400)
    throw new Error("no orders found")
  }
});


module.exports = { saveOrder, getMyOrders, getAllOrders, checkoutSession }