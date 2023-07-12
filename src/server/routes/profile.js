const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controller/profile");
const { verifyToken } = require("../validation/varifyToken");

router.route("/profile").get(verifyToken, getProfile);

router.route("/profile").post(verifyToken,updateProfile);


module.exports = router;