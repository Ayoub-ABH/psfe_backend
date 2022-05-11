const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//home page
//new products
//access simple users
const newProducts = asyncHandler (async (req, res) => {
    const newProducts = await Product.find({})
        .select('name image category price old_price rating')
        .sort({ createdAt: -1 })
        .limit(5);

    if (newProducts) {
        res.json(newProducts);
    } else {
        res.status(404)
        throw new Error("No products found")
    }
    
});

//home page
//top selling
//access simple users
const topProducts = asyncHandler (async (req, res) => {
    const topProducts = await Product.find({})
        .select('name image category price old_price rating')
        .sort({ rating: -1 })
        .limit(6);

    if (topProducts) {
        res.json(topProducts);
    } else {
        res.status(404)
        throw new Error("No products found")
    }
});

//shop page
//all products with paginate and filters
//access simple user
const allProducts = asyncHandler (async (req, res) => {
    const { page, limit, category, min_price, max_price, brand, name, sortBy } = req.query;
    const options = {
        select: 'name image category price old_price rating createdAt',
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 9,
    };

    if (sortBy) {
        let obj = {};
        obj[sortBy] = -1;
        options.sort = obj;
    }

    let query = {};
    if (category) {
        query.category = category
    }
    if (brand) {
        query.brand = brand
    }
    if (min_price && max_price) {
        query.price = { $lt: max_price, $gte: min_price }
    }
    if (name) {
        query.name = name
    }


    const newProducts = await Product.paginate(query, options);
    if (newProducts) {
        res.json(newProducts);
    } else {
        res.status(404)
        throw new Error("No products found")
    }
    
});


//product page
//one product
//access simple user
const oneProduct = async (req, res) => {
    const oneProduct = await Product.findById(req.params.id);

    if (oneProduct) {
        res.json(oneProduct);
    } else {
        res.status(404)
        throw new Error("No product found")
    }
};




//ajouter un produit
//access Admin
const addProduct = async (req, res) => {
    const product = new Product(req.body);
    product.save((error) => {
        if (error) {
            res.status(400)
            throw new Error( "product not added");
        } else {
            res.status(200).json({ message: "product added" });
        }
    });
};

//suprrimer un produit
//access Admin
const deleteProduct = async (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.status(400)
            throw new Error( "product not removed");
        } else {
            res.status(200).json({ message: "product removed" });
        }
    });
};

//modifier un produit
//access admin
const updateProduct = async (req,res)=>{

    Product.findByIdAndUpdate(req.params.id,{$set: req.body},(error) => {
        if (error) {
            res.status(400)
            throw new Error( "product not updated");
        } else {
            res.status(200).json({ message: "product updated" });
        }
    })
}

module.exports = {
    addProduct,
    deleteProduct,
    newProducts,
    topProducts,
    allProducts,
    oneProduct,
    updateProduct
};
