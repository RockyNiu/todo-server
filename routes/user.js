
/*
 * GET users listing.
 */

//exports.list = function(req, res){
//  res.send("respond with a resource");
//};

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/user', function(req, res) {
  res.send("respond with a resource");
});

module.exports = router;