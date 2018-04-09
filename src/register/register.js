const mysql = require('mysql');
const md5 = require('md5')
module.exports = function(req,res){
	const public = require('../public');	
	var sql = "insert into `users` (`username`,`password`,`email`,`phone`) values ('" + req.body.username + "','" + md5(req.body.password) + "','" + req.body.email + "','" + req.body.phone  + "')"
	public.query(sql,function(error,result){
		// console.log(md5(req.body.password))
		if(error == null){
			res.json({
				error:0,
				message:'注册成功',
				data:result,
				errorInfo:null,
			})		
		}else{
			res.json({
				error:1,
				message:'注册失败',
				// data:null,
				errorInfo:null,
			})
		}
	})
}