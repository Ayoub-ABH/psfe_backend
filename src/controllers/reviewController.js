const Product = require('../models/productModel')
const Review = require('../models/reviewModel')
const asyncHandler = require("express-async-handler");






// product page
// Creer une review
// access  Private
const createProductReview =asyncHandler( async (req, res) => {   
    const { idProduct,rating, comment } = req.body;
    if( !rating || !comment){
      res.status(400);
      throw new Error("please fill all fields");
    }
  
    const userReview = await Review.find({user:req.user.id,product:idProduct});


    if (userReview[0]) {     
        res.status(400)
        throw new Error("you already reviewed this product");
    }else{
      const review = new Review({
        name: req.user.name,
        rating: rating,
        comment: comment,
        user: req.user.id,
        product:idProduct
      });
      review.save((error) => {
        if (error) {
            res.status(400)
            throw new Error( "review not added");
        } else {

          //product.numReviews = product.reviews.length;
  
          // product.rating =
          //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          //   product.reviews.length;

            res.status(200).json({ message: "review added" });
        }
    });

    }
  
     
        
      

});

// product page
// Creer une review
// access  Private
const deleteProductReview =asyncHandler( async (req, res) => {

  const {idProduct,idReview} = req.query;
  const product = await Product.findById(idProduct);
  const review = await Review.findById(idReview)
  if(product){

    Review.findByIdAndRemove(idReview, (error)=>{

        if(error){
          res.status(404)
          throw new Error( "review  not found");
        }
        else {
          res.status(200).json({ message: "review not found" });
        }
      } 
      )
    product.reviews.pull(review)

    
  }


  


});


// product page
// Creer une review
// access  Private
const getAllReviews =asyncHandler( async (req, res) => {
  const {idProduct,page,limit} = req.query;

  const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 3,
  };
  const reviews = await Review.paginate({product:idProduct},options)

  if (reviews.docs.length !== 0) {
    res.status(200).json(reviews);
  } else {
      res.status(404)
      throw new Error("No reviews found")
  }
  
});

// product page
// Creer une review
// access  Private
const updateProductReview = async (req, res) => {
    
};




module.exports = {
    createProductReview,
    getAllReviews
}