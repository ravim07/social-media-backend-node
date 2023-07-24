const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secretKey = "secratkey";
const User = require("../modal/auth");
const uploadFile = require("../middleware/upload");

const getAllPost = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const post = await User.findOne({ _id }).select("post");
      if (!post) {
        res.status(404).send("User not found!!");
      } else {
        res.status(StatusCodes.OK).json({ message: "Post!!", post: post });
      }
    }
  });
};

const addPost = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req?.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }

    jwt.verify(req.token, secretKey, async (err, authdata) => {
      if (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "unauthorized user!!",
        });
      } else {
        console.log(req.file)
        const { _id } = authdata;
        const user = await User.findOne({ _id });
        if (user) {
          console.log(req.file.path);
          await User.updateOne(
            { _id: _id },
            { $push: { post: req.file.path } }
          );
          const updatedData = await User.findOne({ _id });

          res.status(200).send({
            message:
              "File was uploaded successfully: " + req?.file?.originalname,
            user: updatedData,
          });
        } else {
          res.status(400).send({
            message: "No user found!",
          });
        }
      }
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File larger than 2MB cannot be uploaded!",
      });
    }
    res.status(500).send({
      message: `Unable to upload the file: ${req?.file?.originalname}. ${err}`,
    });
  }
};

module.exports = { getAllPost, addPost };
