const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const secretKey = "secratkey";

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Please provide authentication",
    });
    return;
  }
  const token = bearerHeader.split(" ")[1];
  req.token = token;
  next();
  //   if (bearerHeader) {
  //     res.send({ result: "token is ok" });
  //   } else {
  //     res.send({
  //       message: "Token is not valid",
  //     });
  //   }
}

module.exports = { verifyToken };
