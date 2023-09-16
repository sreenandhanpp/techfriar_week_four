const express = require('express');
const userHelper = require('../helpers/userHelper');
const adminHelper = require('../helpers/adminHelper');
const signupValidator = require('../middlewares/signupValidator');
const { validationResult } = require('express-validator');
const router = express.Router();

//admin root route
router.get('/api/dashboard', (req,res)=>{
    //getting all users data and then rendering the hbs with the data object 
   adminHelper.fetchUsers().then(data => {
    console.log(data);
    res.json( data ).status(200)
   });
});

//get user details
router.post('/api/user',(req,res)=>{
    /*fetching the selected user data 
    req.params.id gets the id passes through the URL
    function matches this id with all users in the database and fetch the one 
    and render the single user data
    */
    adminHelper.getUserDetails(req.body.id).then((data)=>{
    res.json( data ).status(200)
        
    })
});

//updating the user 
router.post('/api/edit-user',signupValidator,(req,res)=>{
    /*
    Updating the selected user data,req.params.id gets the id passes through the URL
    function matches this id with all users in the database and Update the one 
    and redirect to admin dashboard
    */
   adminHelper.updateUserDetails(req.body.id,req.body).then(resp=>{
    res.json({message:resp}).status(200);
   }).catch(err=>{
    res.json({ message:"something went wrong "}).status(400)
   })
   
});

router.post('/api/delete-user',(req,res)=>{
    /* 
    Deleting the selected user,req.params.id gets the id passes through the URL
    function matches this id with all users in the database and Delete the one 
    and redirect to admin dashboard
    */
    adminHelper.deleteUser(req.body.id).then((resp)=>{
    res.json({ message:resp}).status(200)
       
    });
});
//create user post route 
router.post('/api/create-user',signupValidator,(req,res)=>{
    //getting any error on form validation
    try {
        /* function for inserting user data into database passing form data as parameter,
        promise returning inserted data and err */
        userHelper.doSignup(req.body).then(data => {
            res.json(data).status(200);
        });
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong' });
    }
});
module.exports =  router;