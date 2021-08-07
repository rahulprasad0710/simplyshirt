const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUserController = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, mobileNumber } = req.body;
        if ((!email, !password || !mobileNumber)) {
            return res
                .status(401)
                .json({ message: "Please enter all the fields." });
        }
        if (password.length < 8) {
            return res.status(401).json({
                message: "Password should be of atleast 8 characters.",
            });
        }

        //Checking if account with this email already exists

        const existingUser = await User.findOne({ mobileNumber: mobileNumber });
        if (existingUser) {
            return res.status(400).json({
                message: "An account with this mobile number already exists",
            });
        }

        // Hash the passwod using bcrypt
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            mobileNumber: mobileNumber,
            email: email,
            password: hashPassword,
        });

        try {
            const savedUser = await newUser.save();
            console.log("savedUser:-", savedUser);
            res.status(201).json({ message: " Your new account is created." });
        } catch (error) {
            console.error("DB_erroR:", error);
            res.status(400).send("Error");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = { registerUserController };
