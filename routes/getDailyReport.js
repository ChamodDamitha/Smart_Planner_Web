
/**
 * Created by chamod on 4/20/17.
 */

var express = require('express');
var router = express.Router();



router.post('/', function(req, res, next) {

    var reportHandler=require("../Logic/ReportHandler");

    var db = req.db;
    var collection = db.get('users');
    collection.findOne({email:req.body.user_email},function(e,user){

        if(user!=null) {
            res.send(JSON.stringify({success:true,msg:reportHandler.getReport(user,req.body.date)}));
        }
        else
        {
            res.send(JSON.stringify({success:false,msg:"No user exists...!"}));
        }

    });

});



module.exports = router;
/**
 * Created by chamod on 4/21/17.
 */
