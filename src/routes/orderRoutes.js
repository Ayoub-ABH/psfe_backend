const express = require("express");
const {saveOrder,getMyOrders, getAllOrders,checkoutSession, deleteOrder, updateOrderStatus} = require("../controllers/orderController")
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
router.route("/delete/:id").delete(deleteOrder)
router.route("/update/:id").post(updateOrderStatus)







module.exports = router;