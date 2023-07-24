const express = require("express");
const router = express.Router();
const { verifyToken } = require("../validation/varifyToken");
const { getAllPost, addPost } = require("../controller/post");

router.route("/allPost").get(verifyToken, getAllPost);
router.route("/addPost").post(verifyToken, addPost);



module.exports = router;