/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


var User=require('../models/user');

router.get('/', function(req, res, next) {

    var newUser=new User({
        name: req.query.name,
        email: req.query.email
    });

    newUser.save(function (err,User) {
        if(err){
            res.send(err.toString());
        }
        else{
            res.send("User was added successfully...!");
        }
    });
});



module.exports = router;
