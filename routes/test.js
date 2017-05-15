/**
 * Created by chamod on 5/6/17.
 */

/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

    var emailHandler=require("../Logic/EmailHandler");
    emailHandler.sendEmail("d","hariniyasasri@gmail.com");

        res.send("working");
    }
);


module.exports = router;