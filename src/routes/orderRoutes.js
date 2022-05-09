const express = require("express");
const {saveOrder,getMyOrders, getAllOrders} = require("../controllers/orderController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");




//checkout page
router.route("/checkout").post(loginRequire,saveOrder);

//profile page
router.route("/my").get(loginRequire,getMyOrders);


//admin
router.route("/all").get(getAllOrders);







module.exports = router;