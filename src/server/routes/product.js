const express = require("express");
const router = express.Router();
const { verifyToken } = require("../validation/varifyToken");
const { addProduct, getProduct, updateProduct, updateProductWithPatch, deleteProduct } = require("../controller/product");

router.route("/product").get(verifyToken, getProduct);

router.route("/product").post(verifyToken, addProduct);
router.route("/product/:id").put(verifyToken, updateProduct);
router.route("/product/:id").patch(verifyToken, updateProductWithPatch)
router.route("/product/:id").delete(verifyToken, deleteProduct)

module.exports = router;
