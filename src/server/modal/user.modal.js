const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        require: true
    },
    lname:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true
    },
    mobileNo:{
        type:Number,
        require: true
    }
});

const userModal = mongoose.model('userModal', userSchema);

module.exports = userModal;