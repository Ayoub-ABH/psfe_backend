const Order = require('../models/orderModel')
const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");




//checkout page
//passer une commande 
//access simple user
const saveOrder =asyncHandler( async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice
    } = req.body;

    // let newOrderItems = [];
    let order = {};

    if (orderItems && orderItems.lenght == 0) {
        res.status(400)
        throw new Error("no order items found")
     } 
    // else {
    //     orderItems.forEach(async (orderItem) => {
    //         newOrderItems.push({
    //             product: await Product.findById(orderItem.product),
    //             quantity: orderItem.quantity
    //         })
            
    //     });
    // }

    if (shippingAddress) {
        order = new Order({
            user: req.user.id,
            orderItems ,//:newOrderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice
        })
    } else {
        const user =await User.findById(req.user.id);
        order = new Order({
            user: req.user.id,
            orderItems,//: newOrderItems,
            shippingAddress: user.billingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice
        })
    }


    order.save((error) => {
        if (error) {
            res.status(404)
            throw new Error("order not saved");
        } else {
            res.status(200).json({ message: "order saved" });
        }
    });


})

// page profile
// all orders of a user
// access user
const getMyOrders =asyncHandler( async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(400)
        throw new Error("no orders found")
    }
  });


//page admin
// all orders of all users
//access Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(400)
        throw new Error("no orders found")
    }
  });


module.exports = { saveOrder,getMyOrders,getAllOrders}