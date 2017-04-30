/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


var User=require('../models/user');

router.post('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('users');


    collection.findOne({email:req.body.email},function (err,user) {
        if(err) {
            res.send(JSON.stringify({success:false,msg:err.toString()}));
        }
        if(user!=null) {
            res.send(JSON.stringify({success:false,msg:"email already exists"}));
        }
        else {
            collection.insert(
                {
                    name: req.body.name,
                    email: req.body.email,
                    daily_data:[],
                    daily_report:[]
                },
            function (err,data) {
                if(err) {
                    res.send(JSON.stringify({success:false,msg:err.toString()}));
                }
                if(data!=null) {
                    res.send(JSON.stringify({success:true,msg:data}));
                }
            })

        }
    });

});



module.exports = router;
