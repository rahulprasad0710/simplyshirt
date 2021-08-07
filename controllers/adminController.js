const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getAllUserController = asyncHandler(async (req, res) => {
    const user = await User.find({}).select("-password");
    res.status(200).json(user);
});

module.exports = {
    getAllUserController,
};
