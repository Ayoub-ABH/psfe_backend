const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const User = require('../models/userModel')



//checkout page
//passer une commande 
//access simple user
const saveOrder = async (req, res) => {
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
        return res.send({ message: "no order items found" })
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
            res.send({ message: "order not saved" });
        } else {
            res.send({ message: "order saved" });
        }
    });


}




module.exports = { saveOrder }