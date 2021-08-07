const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//get user cart controller
const getUserCartController = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(req.user);
    try {
        const userCartItems = await User.findById(user._id)
            .select("cart")
            .populate("cart.item");

        res.status(200).json({ _id: user._id, cartItems: userCartItems.cart });
    } catch (error) {
        console.log(error);
        res.status(400);
    }
});

//POST METHOD add item to User Cart  Controller
const addUserCartController = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const { productId, qty } = req.body;
        console.log(productId);
        const getUserCartList = await User.findById(user._id).populate("cart");

        console.log("getUserCartList", getUserCartList);
        const checkCartItems = getUserCartList.cart.some((cartItem) => {
            return cartItem.item == productId;
        });

        if (checkCartItems) {
            const userCartItems = await User.findById(user._id)
                .select("cart")
                .populate("cart.item");
            res.status(200).json({
                _id: user._id,
                productId,
                cartItems: userCartItems.cart,
                message: "Product is already added to your cart.",
            });
        } else {
            const upadatedUserCart = await User.findByIdAndUpdate(
                user._id,
                {
                    $addToSet: {
                        cart: { item: productId, quantity: qty },
                    },
                },
                {
                    new: true,
                }
            )
                .select("cart")
                .populate("cart.item");
            res.status(200).json({
                _id: user._id,
                productId,
                cartItems: upadatedUserCart.cart,
                message: "Product  added to your cart.",
            });
        }
    } catch (error) {
        console.log("Push Error", error);
    }
});

//update item of User Cart  Controller

const updateUserCartController = asyncHandler(async (req, res) => {
    const user = req.user;
    const { cartItemId, qty } = req.body;
    console.log(req.body);
    try {
        const updateQtyUserCart = await User.findOneAndUpdate(
            { _id: user._id, "cart._id": cartItemId },
            {
                $set: { "cart.$.quantity": qty },
            },
            {
                new: true,
            }
        )
            .select("cart")
            .populate("cart.item");

        res.status(200).json({
            _id: user._id,

            cartItems: updateQtyUserCart.cart,
        });
    } catch (error) {
        console.log("Push Error", error);
    }
});

//POST METHOD delete item to User Cart  Controller
const removeItemFromCartController = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const productId = req.params.id;
        console.log(productId);

        const upadatedUserCart = await User.findByIdAndUpdate(
            user._id,
            {
                $pull: {
                    cart: { item: productId },
                },
            },
            {
                new: true,
            }
        )
            .select("cart")
            .populate("cart.item");
        res.status(200).json({
            _id: user._id,
            cartItems: upadatedUserCart.cart,
        });
    } catch (error) {
        console.log("Push Error", error);
        re.status(400).json(error);
    }
});

module.exports = {
    getUserCartController,
    addUserCartController,
    updateUserCartController,
    removeItemFromCartController,
};
