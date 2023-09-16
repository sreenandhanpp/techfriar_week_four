// import express from 'express';
const express = require('express');
const userHelper = require('../helpers/userHelper');
const router = express.Router();
const signupValidate = require('../middlewares/signupValidator');
const { validationResult } = require('express-validator');
const isExist = require('../middlewares/checkMail');




//post signup route for form submition
router.post('/api/signup',signupValidate, async (req, res) => {
    let errs;
    // isExist(req.email).then(exists=>{
    //   errs = exists
    //   if(errs){
        //       let errors = {
            //           msg:errs 
            //         }
            //         err.errors = errors
            //     }
            // })
    let err = validationResult(req);
    if(!err.isEmpty()){
        console.log("erros");
        res.status(400).json({errors:err.array()})
    }else{
        try {
            /* function for inserting user data into database passing form data as parameter,
            promise returning inserted data and err */
            console.log(req.body);
            userHelper.doSignup(req.body).then(data => {
                req.session.user = data;
                res.json(data).status(200);
            });
        } catch (err) {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
});

//post login route for login form submition
router.post('/api/login', (req, res) => {
    try {
        userHelper.doLogin(req.body).then((data) => {
            req.session.user = data;
            res.json(data).status(200);
        }).catch(err => {
            res.status(400).json({ message: "Invalid username or password" });
        })
    } catch (err) {
        res.status(401).json({ message: 'Something went wrong' });
    }
});

router.get('/api/logout', (req,res) => {
    req.session.destroy()
    res.json({ message:"loggedout successfully" }).status(200);
     
})


module.exports = router;