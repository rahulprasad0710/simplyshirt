const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");

const authUser = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
        console.log(token);
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decodedToken);
            const user = await User.findOne({
                _id: decodedToken.id,
            }).select("-password");
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        res.status(401).json({ message: " Access Denied." });
    }
});

//asgining to req.user and we can use req.user in protected routes

const authAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json("Not authorized.Access Denied.");
    }
};

module.exports = { authUser, authAdmin };
