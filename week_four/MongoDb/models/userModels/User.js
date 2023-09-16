//importing modules
const mongoose = require('mongoose');


//defining the structure of the collection
const newUserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    fullname: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    address: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
});

//creating the model
const newUser = mongoose.model('user',newUserSchema);

module.exports = newUser;