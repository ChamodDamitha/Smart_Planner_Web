/**
 * Created by chamod on 5/6/17.
 */

/**
 * Created by chamod on 4/13/17.
 */
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
        res.send("working");
    }
);


module.exports = router;