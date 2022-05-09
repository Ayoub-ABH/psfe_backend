const express = require("express");
const {createProductReview} = require("../controllers/reviewController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");








//page product 
router.route("/add").post(loginRequire,createProductReview);





module.exports = router;