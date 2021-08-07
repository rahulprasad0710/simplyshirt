const pageNotFound = (req, res, next) => {
    res.status(404).json("Page Not Found");
    next();
};

module.exports = pageNotFound;
