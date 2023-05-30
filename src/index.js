const express = require("express");
const mongoose = require("./server/database/db");
const app = express();
const userModal = require("./server/modal/user.modal");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secratkey = "secratkey";

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());
// mongoose
//   .connect(
//     "mongodb+srv://ravindra:Ravindra123@social-media-api.xya5p7u.mongodb.net/?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("db is connected"))
//   .catch((err) => console.log(err, "something went wrong"));

const PORT = process.env.PORT || 8080;

// userModal({
//     fname:'ravi',
//     lname:'singh',
//     email:'ravindra@gmail.com',
//     mobileNo:9494949494
// }).save()

app.get("/user", async (req, res) => {
  try {
    const user = await userModal.find({});
    if (user.length === 0) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/userragister", async (req, res) => {
  const user = new userModal(req.body);
  try {
    console.log(req.body, user);
    user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    userName: "ravindra",
    email: "ravi@gmail.com",
  };
  jwt.sign({ user }, secratkey, { expiresIn: "500s" }, (err, token) => {
    res.send({
      token: token,
    });
  });
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findById(id);
    if (!user) {
      return res.status(404).send("No data found");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(400).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secratkey, (err, authdata)=>{
    if(err){
      res.send({result: "invalid token"});
    } else {
      res.send({
        result:"profile accessed",
        authdata
      })
    }
  })
});

function verifyToken(req, res, next){

  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader.split(" ")[1]
  req.token = token;
  next();
  if(bearerHeader) {
    res.send({ result :"token is ok"})
  } else {
    res.send({
      message: "Token is not valid"
    })
  }
}

app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
