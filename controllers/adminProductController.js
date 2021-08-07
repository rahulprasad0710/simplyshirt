const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { cloudinary } = require("../utils/cloudinary");
//GET request get all product
const getAllProductController = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({});
    console.log(allProducts);
    res.status(200).json(allProducts);
});

//POST request Create Product
const createProductController = asyncHandler(async (req, res) => {
    const { name, category, price, brand, description, totalStock, image } =
        req.body;

    try {
        var uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: "bookitem",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error in Image upload" });
    }
    console.log(uploadResponse);
    const newProduct = new Product({
        user: req.user._id,
        name,
        brand,
        category,
        price,
        description,
        totalStock,
        image: uploadResponse.url,
    });

    try {
        await newProduct.save();
        const allProducts = await Product.find({});

        res.status(200).json(allProducts);
    } catch (error) {
        res.status(400).json({
            message: "Something went Wrong.Try Again",
        });
    }
});

//PUT request update Product
const updateProductController = asyncHandler(async (req, res) => {
    const { name, image, price, brand, category, totalStock } = req.body;

    const product = await Product.find(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.image = image;
        product.brand = brand;
        product.image = image;
        product.category = category;
        product.totalStock = totalStock;
        try {
            const updatedProduct = await Product.save();
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(error);
            res.status(500).json("Something Went Wrong.");
        }
    } else {
        res.status(404).json("Product Not Found.");
    }

    const newProduct = new Product({
        name: "sample name",
        price: 0,
        description: "Sample description",
        totalStock: 50,
        image: "/images/sample.jpg",
    });

    const createdProduct = await newProduct.save();

    res.status(200).json(createdProduct);
});

// Delete Product
const deleteProductController = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    const allProducts = await Product.find({});
    console.log(allProducts);
    res.status(200).json(allProducts);
});

module.exports = {
    getAllProductController,
    createProductController,
    updateProductController,
    deleteProductController,
};
