const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../middleware/authUser");
const { getAllUserController } = require("../controllers/adminController");
const {
    getAllProductController,
    createProductController,
    updateProductController,
    deleteProductController,
} = require("../controllers/adminProductController");

router.get("/admin/users", authUser, authAdmin, getAllUserController);

//Find ,Create Update And Delete Product Controller
router.get("/admin/product", authUser, authAdmin, getAllProductController);
router.post("/admin/addproduct", authUser, authAdmin, createProductController);
router.put(
    "/admin/addproduct/:id",
    authUser,
    authAdmin,
    updateProductController
);
router.put(
    "/admin/deleteproduct/:id",
    authUser,
    authAdmin,
    deleteProductController
);

module.exports = router;
