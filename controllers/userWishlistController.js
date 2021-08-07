const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//get user Wishlist controller
const getUserWishlistController = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const getUserWishlist = await User.findById(user._id).populate(
            "wishlist"
        );

        res.status(200).json({
            _id: getUserWishlist._id,
            wishlist: getUserWishlist.wishlist,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});

//add item to User wishlist  Controller

const postUserWishlistController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    try {
        if (!user.wishlist.includes(req.body.wishlistId)) {
            const upadtedWishlist = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: {
                        wishlist: req.body.wishlistId,
                    },
                },
                {
                    new: true,
                }
            ).populate("wishlist");

            res.status(200).json({
                _id: upadtedWishlist._id,
                wishlist: upadtedWishlist.wishlist,
                message: "Product added to wishlist ",
            });
        } else {
            await user.updateOne({ $pull: { wishlist: req.body.wishlistId } });
            const getUserWishlist = await User.findById(req.user._id).populate(
                "wishlist"
            );

            res.status(200).json({
                _id: getUserWishlist._id,
                wishlist: getUserWishlist.wishlist,
                message: "Product removed from wishlist ",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});

module.exports = {
    getUserWishlistController,
    postUserWishlistController,
};
