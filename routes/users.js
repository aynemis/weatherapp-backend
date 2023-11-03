var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');

router.post('/signup', (req,res) => {
    User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(dbData => {
    if (!checkBody(req.body, ["name", "email", "password"])){
        res.json({result : false, error : "Missing or empty fields"});
    }else if (dbData !== null){
        res.json({ result: false, error: 'User already exists' });
    }else{
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        newUser.save().then(()=>{
            res.json({ result: true })
        })
    }
})
})

router.post('/signin', (req,res) => {
    User.findOne({ email: { $regex: new RegExp(req.body.email) }, password: { $regex: new RegExp(req.body.password) } }).then(dbData => {
    if (!checkBody(req.body, ["email", "password"])){
        res.json({result : false, error : "Missing or empty fields"});
    } else if (dbData === null){
        res.json({result : false, error : "User not found"});
    } else {
        res.json({result : true});
    }
    })
})




module.exports = router;