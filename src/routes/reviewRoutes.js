const express = require("express");
const {createProductReview, getAllReviews} = require("../controllers/reviewController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");








//page product 
router.route("/add").post(loginRequire,createProductReview);
router.route("/all").get(getAllReviews);





module.exports = router;