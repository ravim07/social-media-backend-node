const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userModal = require("./server/modal/user.modal");

mongoose.connect('mongodb://127.0.0.1:27017/social-media').then(()=>console.log("db is connected")).catch(()=> console.log("something went wrong"));


const PORT = process.env.PORT || 3000

userModal({
    fname:'ravi',
    lname:'singh',
    email:'ravindra@gmail.com',
    mobileNo:9494949494
}).save()

app.get('/user', (req,res)=>{
    res.send("crud application");
})

app.listen(PORT, ()=> {
    console.log(`server is running in ${PORT}`)
})