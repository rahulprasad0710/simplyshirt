const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authUser");
const { userLoginController } = require("../controllers/loginController");
const {
    getUserProfileController,
    updateUserProfileController,
    updateUserAddressController,
} = require("../controllers/userProfileController");

const { registerUserController } = require("../controllers/registerController");
const {
    getUserCartController,
    addUserCartController,
    updateUserCartController,
    removeItemFromCartController,
} = require("../controllers/userCartController");

const {
    getUserWishlistController,
    postUserWishlistController,
} = require("../controllers/userWishlistController");

const {
    getUserOrderController,
    postUserOrderController,
} = require("../controllers/placeOrderControllers");

router.post("/auth/login", userLoginController);
router.post("/auth/register", registerUserController);
router.get("/user/profile", authUser, getUserProfileController);
router.put("/user/profile", authUser, updateUserProfileController);
router.post("/user/address", authUser, updateUserAddressController);

//user cart routes
router.get("/user/cart", authUser, getUserCartController);
router.post("/user/cart", authUser, addUserCartController);
router.put("/user/cart", authUser, updateUserCartController);
router.delete("/user/cart/:id", authUser, removeItemFromCartController);

//user wishlist routes
router.get("/user/wishlist", authUser, getUserWishlistController);
router.post("/user/wishlist", authUser, postUserWishlistController);

//user Orders Routes
router.get("/user/orders", authUser, getUserOrderController);
router.post("/user/placeorder", authUser, postUserOrderController);
module.exports = router;
