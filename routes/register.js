var express = require('express');
var router = express.Router();
var userModel = require('../model/users')

/* GET home page. */
router.post('/', function(req, res, next) {
	userModel.find({username:req.body.username}).then((info)=>{
		console.log(info)
		if(info.length != 0){
			//用户名已存在
			
			res.send({state:'0'})
			return
		}else{
			userModel.create({
			  	username:req.body.username,
			  	password:req.body.password
			  }).then(result=>{
			  	res.send({state:1})
			  }).catch(err=>{
			  	res.send(err)
			  })
		}
	})
  
});

module.exports = router;