const express = require("express");
const {createProductReview, getAllReviews, deleteProductReview} = require("../controllers/reviewController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");








//page product 
router.route("/add").post(loginRequire,createProductReview);
router.route("/delete").delete(deleteProductReview);
router.route("/all").get(getAllReviews);





module.exports = router;