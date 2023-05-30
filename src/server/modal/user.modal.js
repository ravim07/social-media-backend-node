const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModal = mongoose.model('userModal', userSchema);

module.exports = userModal;