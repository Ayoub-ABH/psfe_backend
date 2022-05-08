const express = require("express");
const {saveOrder} = require("../controllers/orderController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");




//checkout page
router.route("/checkout").post(loginRequire,saveOrder);







module.exports = router;