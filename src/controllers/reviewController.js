const Product = require('../models/productModel')
const Review = require('../models/reviewModel')
const asyncHandler = require("express-async-handler");






// product page
// Creer une review
// access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { idProduct, rating, comment } = req.body;
  if (!rating || !comment) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  const userReview = await Review.find({ user: req.user.id, product: idProduct });
  const AllProductReviews = await Review.find({ product: idProduct });

  if (userReview[0]) {
    res.status(400)
    throw new Error("you already reviewed this product");
  } else {
    const review = new Review({
      name: req.user.name,
      rating: rating,
      comment: comment,
      user: req.user.id,
      product: idProduct
    });
    review.save((error) => {
      if (error) {
        res.status(400)
        throw new Error("review not added");
      } else {

        const newNumReviews = AllProductReviews.length+1 ;
        

        let newRating = AllProductReviews.reduce((acc, item) => parseInt(item.rating)  + parseInt(acc), parseInt(rating)) /newNumReviews;

        if(newRating > (Math.abs(parseInt(newRating))+0.5) )
        newRating=Math.abs(parseInt(newRating))+1
        else 
        newRating = Math.abs(parseInt(newRating));



        Product.findByIdAndUpdate(idProduct,{$set: {numReviews:newNumReviews,rating:newRating}},(error) => {
          if (error) {
              res.status(400);
              throw new Error( error);
          } 
        })

        res.status(200).json({ message: "review added" });
      }
    });

  }





});

// product page
// Creer une review
// access  Private
const deleteProductReview = asyncHandler(async (req, res) => {

  const { idReview,idProduct } = req.query;
  const AllProductReviews = await Review.find({ product: idProduct });
  const review = await Review.find({ _id:idReview });


  Review.findByIdAndRemove(idReview, (error) => {
    if (error) {
      res.status(404)
      throw new Error("review  not found");
    }
    else {
      const newNumReviews = AllProductReviews.length-1;

      let newRating=0;

      if(newNumReviews!==0){
         newRating = AllProductReviews.reduce((acc, item) => parseInt(item.rating)  + parseInt(acc), -parseInt(review[0].rating))/newNumReviews;

        if(newRating > (Math.abs(parseInt(newRating))+0.5) )
          newRating=Math.abs(parseInt(newRating))+1
        else 
          newRating = Math.abs(parseInt(newRating));
      }

      

      Product.findByIdAndUpdate(idProduct,{$set: {numReviews:newNumReviews,rating:newRating}},(error) => {
        if (error) {
            res.status(400);
            throw new Error( error);
        } 
      })

      res.status(200).json({ message: "review deleted" });
    }
  }
  )
});


// product page
// Creer une review
// access  Private
const getAllReviews = asyncHandler(async (req, res) => {
  const { idProduct, page, limit } = req.query;

  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 3,
    sort: {createdAt:-1}

  };
  const reviews = await Review.paginate({ product: idProduct }, options)

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
  getAllReviews,
  deleteProductReview
}