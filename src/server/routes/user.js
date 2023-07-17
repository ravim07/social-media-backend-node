const express = require("express");
const router = express.Router();
const { verifyToken } = require("../validation/varifyToken");
const { getAllUser, addFriend, acceptFriendRequest, getFriendList } = require("../controller/user");

router.route("/allUser").get(verifyToken, getAllUser);
router.route("/addFriend").post(verifyToken, addFriend);
router.route("/acceptRequest").post(verifyToken, acceptFriendRequest);
router.route("/getFriendList").get(verifyToken, getFriendList);



module.exports = router;