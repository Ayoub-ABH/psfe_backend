const express = require("express");
const {addProduct,deleteProduct, newProducts,topProducts,allProducts,oneProduct,updateProduct,allProductsAdmin} = require("../controllers/productController");
const { upload } = require("../middlewares/uploadMiddleware");
const router = express.Router();




//home page
router.route("/home/newPrs").get(newProducts);
router.route("/home/topPrs").get(topProducts);

//shop page
router.route("/shop/allPrs").get(allProducts);

//product page
router.route("/:id").get(oneProduct);

//pour L'admin
router.route("/all/allPrds").get(allProductsAdmin);
router.route("/add/add").post(upload.single("image"),addProduct);
router.route("/delete/:id").delete(deleteProduct);
router.route("/update/:id").put(upload.single("image"),updateProduct);






module.exports = router;
