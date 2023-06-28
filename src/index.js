const express = require("express");
const mongoose = require("./server/database/db");
const app = express();
// const userModal = require("./server/modal/user.modal");
const bodyParser = require("body-parser");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const secretKey = "secratkey";
// const bcrypt = require("bcrypt");
const authRouter = require("./server/routes/auth");

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.use("/api", authRouter);

const PORT = process.env.PORT || 8080;
const saltRounds = 10;

// app.get("/user", async (req, res) => {
//   try {
//     const user = await userModal.find({});
//     if (user.length === 0) {
//       return res.status(404).send();
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// app.post("/register", async (req, res) => {
//   const user = new userModal(req.body);
//   try {
//     console.log(req.body, user);
//     const existEmail = await userModal.findOne({ email: req.body.email });
//     const existPhone = await userModal.findOne({ mobileNo: req.body.mobileNo });
//     if (existEmail) {
//       res.status(403).send("User is already exists with this email");
//       return;
//     }
//     if (existPhone) {
//       res.status(403).send("User is already exists with this mobile no");
//       return;
//     }
//     user.password = bcrypt.hashSync(req.body.password, 8);
//     console.log(user, "inside api");

//     user.save();
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   console.log(req.body.email);
//   try {
//     if (!req.body.email && !req.body.password) {
//       res.status(400).send("Email and Password fields are mandatory");
//     }
//     if (!req.body.email) {
//       res.status(400).send("Email field is mandatory");
//     }
//     if (!req.body.password) {
//       res.status(400).send("Password field is mandatory");
//     }
//     const userExist = await userModal.findOne({ email: req.body.email });

//     if (!userExist) {
//       res.status(404).send("User is not found with this email!");
//     }
//     let passwordIsValid = bcrypt.compareSync(
//       req.body.password,
//       userExist.password
//     );
//     if (!passwordIsValid) {
//       res.status(404).send("Password does not match!");
//     }
//     jwt.sign(
//       { _id: userExist._id, role: userExist.email },
//       secretKey,
//       { expiresIn: "30d" },
//       (err, token) => {
//         res.status(200).send({
//           token: token,
//         });
//       }
//     );
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// app.get("/user/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await userModal.findById(id);
//     if (!user) {
//       return res.status(404).send("No data found");
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// app.patch("/user/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await userModal.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(400).send();
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// app.delete("/user/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await userModal.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(400).send();
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// app.post("/profile", verifyToken, (req, res) => {
//   jwt.verify(req.token, secretKey, (err, authdata) => {
//     if (err) {
//       res.send({ result: "invalid token" });
//     } else {
//       res.send({
//         result: "profile accessed",
//         authdata,
//       });
//     }
//   });
// });

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   const token = bearerHeader.split(" ")[1];
//   req.token = token;
//   next();
//   if (bearerHeader) {
//     res.send({ result: "token is ok" });
//   } else {
//     res.send({
//       message: "Token is not valid",
//     });
//   }
// }

// function compareThePassword(password, hashStoredInDB) {
//   bcrypt.compare(password, hashStoredInDB).then(function (res) {
//     console.log(re, "res after compare");
//     // res == true/false
//   });
// }
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
