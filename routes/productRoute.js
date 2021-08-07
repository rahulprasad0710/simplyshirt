const express = require("express");
const router = express.Router();
const {
    getAllProduct,
    getProductById,
} = require("../controllers/productController");

router.get("/products", getAllProduct);

router.get("/products/:id", getProductById);

module.exports = router;
