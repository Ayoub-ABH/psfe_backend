const express = require("express");
const {addProduct,deleteProduct, newProducts,topProducts,allProducts,oneProduct,updateProduct} = require("../controllers/productController")
const router = express.Router();




//home page
router.route("/home/newPrs").get(newProducts);
router.route("/home/topPrs").get(topProducts);

//shop page
router.route("/shop/allPrs").get(allProducts);

//product page
router.route("/:id").get(oneProduct);

//pour L'admin
router.route("/add").post(addProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/update/:id").put(updateProduct);






module.exports = router;
