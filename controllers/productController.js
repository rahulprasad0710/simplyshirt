const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const products = require("../data/products");

const getAllProduct = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({});
    console.log(allProducts);
    res.status(200).json(allProducts);
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(404).json("Something went Wrong.");
    }
});

module.exports = { getAllProduct, getProductById };
