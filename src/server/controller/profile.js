const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secretKey = "secratkey";
const User = require("../modal/auth");
const uploadFile = require("../middleware/upload");

const getProfile = async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authdata) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "unauthorized user!!",
      });
    } else {
      const { _id } = authdata;
      const user = await User.findOne({ _id });
      res.status(StatusCodes.OK).json({ message: "user!!", userData: user });
    }
  });
};

const updateProfile = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req?.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }
    res.status(200).send({
      message:
        "The following file was uploaded successfully: " +
        req?.file?.originalname,
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
  console.log(req);
};

module.exports = { getProfile, updateProfile };
