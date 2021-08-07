const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
    {
        contactName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        addressName: {
            type: String,
            require: true,
        },
        ward: {
            type: Number,
        },
        tole: {
            type: String,
        },
        city: {
            type: String,
        },
        district: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },

        mobileNumber: {
            type: String,
            require: true,
            unique: true,
        },

        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
        },
        cart: [
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                },
                quantity: {
                    type: Number,
                    require: true,
                },
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
        ],

        addresses: [addressSchema],
    },
    {
        timestamps: true,
    }
);

//model name is - "user"

module.exports = User = mongoose.model("user", userSchema);
