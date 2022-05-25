const express = require("express");
const {saveOrder,getMyOrders, getAllOrders,checkoutSession} = require("../controllers/orderController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");




//checkout page
router.route("/checkout").post(loginRequire,saveOrder);

//checkout page stripe
router.route("/create-checkout-session").post(loginRequire,checkoutSession);

//profile page
router.route("/my").get(loginRequire,getMyOrders);


//admin
router.route("/all").get(getAllOrders);







module.exports = router;