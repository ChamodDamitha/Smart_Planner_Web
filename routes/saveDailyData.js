
/**
 * Created by chamod on 4/20/17.
 */

var express = require('express');
var router = express.Router();


var User=require('../models/user');


router.post('/', function(req, res, next) {

    var db = req.db;
    var collection = db.get('users');
    collection.findOne({email:req.body.user_email},function(e,user){

        if(user!=null) {
            for(var i=0;i<user.daily_data.length;i++){
                if(user.daily_data[i].date==req.body.daily_data.date){
                    user.daily_data.splice(i,1);
                    break;
                }
            }

            user.daily_data.push(req.body.daily_data);

            collection.update({email: user.email}, {$set : {daily_data: user.daily_data} }, function (err, data) {
                if (err != null) {
                    res.send(JSON.stringify({success: false, msg: err}));
                }
                else {
                    res.send(JSON.stringify({success: true, msg: data}));
                }
            });

        }

    });

});



module.exports = router;
