const Product = require('../models/productModel')
const Review = require('../models/reviewModel')





// product page
// Creer une review
// access  Private
const createProductReview = async (req, res) => {
    const { idProduct,rating, comment } = req.body;
  
    const product = await Product.findById(idProduct);
    const userReview = await Review.find({user:req.user.id});

    
    if (product) {     
      const alreadyReviewed = await product.reviews.find(
        (r) => r.toString() === userReview[0]._id.toString()
      );

      if (alreadyReviewed) {
        return res.send({message:"you already reviewed this product"});
      }
  
      const review = new Review({
        name: req.user.name,
        rating: rating,
        comment: comment,
        user: req.user.id,
      });

      await review.save();
  
      product.reviews.push(review);
  
      //product.numReviews = product.reviews.length;
  
      // product.rating =
      //   product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      //   product.reviews.length;
  
      await product.save();
      res.send({ message: "Review added" });
    } else {
      res.send({message:"Product not found"});
    }
};

// product page
// Creer une review
// access  Private
const deleteProductReview = async (req, res) => {

  const {idProduct,idReview} = req.query;
  const product = await Product.findById(idProduct);
  const review = await Review.findById(idReview)
  if(product){

    Review.findByIdAndRemove(idReview, (error)=>{

        if(error){
          res.send({ message: "review remove" });
        }
        else {
          res.send({ message: "review not found" });
        }
      } 
      )
    product.reviews.pull(review)

    
  }


  


};

// product page
// Creer une review
// access  Private
const updateProductReview = async (req, res) => {
    
};



module.exports = {
    createProductReview
}