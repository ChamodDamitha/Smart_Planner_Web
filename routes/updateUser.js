/**
 * Created by chamod on 4/13/17.
 */
/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
    console.log(req.query.old_email);
    console.log(req.query.new_email);
    console.log(req.query.new_name);
    // User.findOneAndUpdate({email:req.query.old_email},{name:req.query.new_name , email:req.query.new_email},
    //     function (err,user) {
    //         if(err) {
    //             res.send(err);
    //         }
    //         if(user==null){
    //             res.send("No user exists by the given email...!");
    //         }
    //         else {
    //             res.send("User was updated successfully...!");
    //         }
    // });

});



module.exports = router;
