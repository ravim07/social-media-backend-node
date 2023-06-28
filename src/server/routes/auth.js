const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controller/auth");
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
} = require("../validation/auth");
const { getProfile, updateProfile } = require("../controller/profile");
const { verifyToken } = require("../validation/varifyToken");

router.route("/signin").post(validateSignInRequest, isRequestValidated, signIn);


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);

router.route("/profile").get(verifyToken,getProfile);

router.route("/upload").post(updateProfile)


module.exports = router;