const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ravindra:Ravindra123@social-media-api.xya5p7u.mongodb.net/social-media-api"
  )
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err, "something went wrong"));

module.exports = mongoose;