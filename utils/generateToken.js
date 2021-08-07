const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const tokenGenerated = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
    return tokenGenerated;
};

module.exports = generateToken;
