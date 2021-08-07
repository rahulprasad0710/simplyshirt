const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const userLoginController = asyncHandler(async (req, res) => {
    try {
        const { password, mobileNumber } = req.body;
        if (!password || !mobileNumber) {
            return res
                .status(401)
                .json({ message: "Please enter all the fields." });
        }

        //Checking if account with this email  exists

        const existingUser = await User.findOne({ mobileNumber: mobileNumber });
        if (!existingUser) {
            return res.status(400).json({
                message: "No account is registered with is mobile number.",
            });
        }
        if (existingUser) {
            const passwordCheck = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (!passwordCheck) {
                return res.status(401).json({
                    message: "Wrong Email or Password",
                });
            }
        }

        res.status(200).json({
            _id: existingUser._id,
            isAdmin: existingUser.isAdmin,
            token: generateToken(existingUser._id),
            message: "you are logged in successfully.",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = { userLoginController };
