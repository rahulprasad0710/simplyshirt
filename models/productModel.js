const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: "string",
            require: true,
        },
        rating: {
            type: Number,
        },
        Comment: {
            type: "string",
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "user",
        },
        name: {
            type: String,
            require: true,
        },

        image: {
            type: String,
        },

        category: {
            type: String,
            require: true,
        },
        brand: {
            type: String,
            default: false,
        },
        description: {
            type: String,
        },
        reviews: [reviewSchema],
        rating: {
            type: Number,

            default: 1,
        },
        numReview: {
            type: Number,

            default: 1,
        },
        price: {
            type: Number,
            require: true,
            default: 1,
        },
        totalStock: {
            type: Number,
            require: true,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
