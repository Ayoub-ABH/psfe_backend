const express = require("express");
const {createProductReview, getAllReviews, deleteProductReview, getAllReviewsAdmin} = require("../controllers/reviewController")
const router = express.Router();
const { loginRequire } = require("../middlewares/authMiddleware");








//page product 
router.route("/add").post(loginRequire,createProductReview);
router.route("/delete").delete(deleteProductReview);
router.route("/all").get(getAllReviews);
router.route("/allReviews").get(getAllReviewsAdmin);





module.exports = router;