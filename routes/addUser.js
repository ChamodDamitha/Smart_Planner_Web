/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


var User=require('../models/user');

router.post('/', function(req, res, next) {

    var newUser=new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser.save(function (err,User) {
        if(err){
            res.send(JSON.stringify({success:false,msg:err.toString()}));
        }
        else{
            res.send(JSON.stringify({success:true,msg:"User was added successfully...!"}));
        }
    });
});



module.exports = router;
