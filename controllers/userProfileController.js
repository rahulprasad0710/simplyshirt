const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUserProfileController = asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
});

const updateUserProfileController = asyncHandler(async (req, res) => {
    console.log(req.user);

    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
    }
    const updatedUser = await user.save();

    console.log(updatedUser);

    res.status(200).json({
        _id: updatedUser._id,
        mobileNumber: updatedUser.mobileNumber,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,

        message: "Account updated successfully.",
    });
});

const updateUserAddressController = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    await user.updateOne({
        $push: { addresses: req.body },
    });

    const updatedUser = await User.findById(req.user._id);

    res.status(200).json({
        _id: updatedUser._id,
        addresses: updatedUser.addresses,
        message: "Address updated successfully.",
    });
});

module.exports = {
    getUserProfileController,
    updateUserProfileController,
    updateUserAddressController,
};
