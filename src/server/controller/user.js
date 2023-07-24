const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secretKey = "secratkey";
const User = require("../modal/auth");

// pending request for the request which is comes to the me
// sended request are the request which is i sended

const getAllUser = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const user = await User.find().select("-hash_password");
      const allUser = user.filter((usr) => usr._id != _id);
      res.status(StatusCodes.OK).json({ message: "user!!", userData: allUser });
    }
  });
};

const addFriend = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "UserId is missing.",
    });
  }
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const userDetail = await User.findOne({ _id });

      if (!userDetail) {
        return res.status(404).send({
          message: "No user found !",
        });
      }
      const friendList = userDetail.friends;
      const sendedRequest = userDetail.sendedRequest;
      const pendingRequest = userDetail.pendingRequest;

      const requestedUser = await User.findOne({ _id: userId });

      if (friendList.length > 0 && friendList.includes(userId)) {
        res.status(403).send({
          message: "User is already a friend",
        });
      } else if (sendedRequest.length > 0 && sendedRequest.includes(userId)) {
        res.status(403).send({
          message: "Request is already a sended",
        });
      } else if (pendingRequest.length > 0 && pendingRequest.includes(userId)) {
        // ---------------------
        res.status(403).send({
          message: "Request is already a sended",
        });
      }

      // for requested user
      else if (!requestedUser) {
        res.status(403).send({
          message: "The provided user is not found",
        });
      } else if (requestedUser.length > 0 && requestedUser.includes(userId)) {
        res.status(403).send({
          code: 403,
          message: "Request is already a sended",
        });
      }
      // for requested user
      else {
        // added current user's request sended array
        await User.findOneAndUpdate(
          { _id },
          {
            $push: {
              sendedRequest: userId,
            },
          }
        );

        // added into the sended user pending request.
        await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              pendingRequest: _id,
            },
          }
        );

        const userDetailAfterRequestSended = await User.findOne({ _id });
        res.status(200).send({
          message: "Request has been sended.",
          userDetail: userDetailAfterRequestSended,
        });
      }
    }
  });
};

const acceptFriendRequest = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "UserId is missing.",
    });
  }
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const userDetail = await User.findOne({ _id });

      if (!userDetail) {
        return res.status(404).send({
          message: "No User Found !",
        });
      }

      const pendingRequest = userDetail.pendingRequest;

      const userSendedRequest = await User.findOne({ _id: userId });

      if (!pendingRequest.includes(userId)) {
        return res.status(403).send({
          message: "No Request with this user!",
        });
      } else {
        if (!userSendedRequest.sendedRequest.includes(_id)) {
          return res.status(403).send({
            message: "No Request with this user!",
          });
        }
        // add user into friend list from pending list
        await User.findOneAndUpdate(
          { _id },
          {
            $pull: {
              pendingRequest: userId,
            },
            $push: {
              friends: userId,
            },
          }
        );

        // added the user friend list who send the request
        await User.findOneAndUpdate(
          { _id: userId },
          {
            $pull: {
              sendedRequest: _id,
            },
            $push: {
              friends: _id,
            },
          }
        );

        const userDetailAfterRequestAccepted = await User.findOne({ _id });
        return res.status(200).send({
          message: "Request Accepted",
          userDetail: userDetailAfterRequestAccepted,
        });
      }
    }
  });
};

const getFriendList = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const friendList = await User.findOne({ _id }).select("friends");
      if (!friendList) {
        res.status(404).send("User not found!!");
      } else {
        res
          .status(StatusCodes.OK)
          .json({ message: "friend list!!", friendList: friendList });
      }
    }
  });
};

module.exports = { getAllUser, addFriend, acceptFriendRequest, getFriendList };
