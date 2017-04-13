/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


router.get('/addUser', function(req, res, next) {
    res.send("add user");
});



module.exports = router;
