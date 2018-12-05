var express = require('express');
var router = express.Router();
var userModel = require('../model/users')

/* GET home page. */
router.post('/', function(req, res, next) {
  userModel.find({
  	username:req.body.username,
  	password:req.body.password
  }).then((info)=>{
  	console.log(info)
  	req.session.userInfo = info[0]
  	if(info.length === 1){
  		res.send({state:1})
  	}else{
  		res.send({state:0})
  	}
  })
})

module.exports = router;