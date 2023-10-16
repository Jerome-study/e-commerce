const express = require("express");
require('dotenv').config();
const { userCommerceModel } = require("../config/database");
const { isAuth } = require("../middlewares/isAuth");
const router = express.Router();


router.get("/category/:category", async (req,res) => {
    // Get the categories
    const categoryResponse = await fetch(process.env.PRODUCT_CATEGORIES_URL, {
        method: 'GET'
    });
    const categoryData = await categoryResponse.json();

    // Check the params category if it exist in the categoryResponse
    const valid = await categoryData.find(category => req.params.category === category)
    

    // All products
    const allProductsResponse = await fetch(process.env.PRODUCT_API);
    const allProductsData = await allProductsResponse.json();


    // If not exist throw a message
    if(!valid) {
        return res.send({results: allProductsData});
    }

    // If exist
    try {


        const categoryProductsResponse = await fetch(process.env.PRODUCT_CATEGORY_URL + req.params.category);
        const categoryProductsData = await categoryProductsResponse.json();
        // If user is login
        if (req.session.user) {
            return res.send({results: categoryProductsData});
        }
        
        // If user is not login
        res.send({results: categoryProductsData});
    } catch(error) {
        res.send({message: error.message});
    }    
});


router.post("/addToCart", isAuth, async (req,res) => {
    const { userId, item }= req.body;

    if (!req.session.user) {
        return res.send("Nothing to see here");
    };

    if (req.session.user !==  userId) {
        return res.send("Who are you?");
    }

    try {
        const user = await userCommerceModel.findOne({user_id: req.session.user});
        user.inCart.push(item);
        await user.save();
        res.send({message: "Success"});
        
    } catch(error) {
        res.send({message: "Something went wrong"});
    }
});


router.post("/removeFromCart", isAuth, async (req,res) => {
    const { userId, item }= req.body;

    if (!req.session.user) {
        return res.send("Nothing to see here");
    };

    if (req.session.user !==  userId) {
        return res.send("Who are you?");
    }

    try {
        const user = await userCommerceModel.findOne({user_id: req.session.user});
        user.inCart = user.inCart.filter(cart => {
            if (cart.id === item.id && cart.category === item.category) {
                return false;
            } 
            return true;
        });

        await user.save();
        res.send({message: "Deleted"});
        
    } catch(error) {
        res.send({message: "Something went wrong"});
    }
});





router.post("/checkInCart", isAuth, async (req,res) => {
    const { item, userId } = req.body
    if (req.session.user !== userId) {
        return res.send({message: "Not Valid"});
    };

    // Get user
    const user = await userCommerceModel.findOne({user_id: userId});
    
    try {
        // Get product based on req.body item
        const categoryProductsResponse = await fetch(process.env.PRODUCT_CATEGORY_URL + item.category);
        const categoryProductsData = await categoryProductsResponse.json();
        const productFound = categoryProductsData.products.find(prod => prod.id === item.id );
        // Check If product exist in all products
        if (!productFound) {
            return res.send({message: "Product not found"});
        };

        const inCartFound = user.inCart.some(product => product.id === item.id);
        res.send({status: inCartFound});
        
    } catch(error) {
        console.log(error.message);
    }
});

router.get("/inCart", isAuth, async (req,res) => {
    
    try {
        const user = await userCommerceModel.findOne({user_id: req.session.user});
        if (!user) {
            return res.send({ message: "User not found" });
        };
        
        res.send({ result: user.inCart});

    } catch(error) {
        console.log(error.message);
    }
});

module.exports = router