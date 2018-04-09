const mysql = require('mysql');
const md5 = require('md5')
module.exports = function(req,res){
	const public = require('./public');
	var username = req.body.username;
	var password = md5(req.body.password);
	var sql = "select `id`,`username`,`password`,`auth`,`email`,`phone` ,`photo` from `users` where `username` = '"+ username+"'";
	public.query(sql,function(error,result){
		if(error){
			res.json({
				error:3,
				message:'失败',
				data:null,
				errorInfo:null,
			})
		}else{
			if(result == ''){
				res.json({
					error:1,
					message:'用户名不存在',
					data:null,
					errorInfo:null
				})
			}else{
				console.log(result[0])
				if (password == (result[0].password)){
					res.cookie('username', username);
					res.cookie('photo', result[0].photo);
					res.cookie('email',result[0].email);
					res.cookie('phone', result[0].phone);
					res.cookie('auth', result[0].auth);
					res.cookie('id', result[0].id);

					// res.cookie('userinfo', JSON.stringify(result[0]))
					//cookies插件设置cookie值方法
					// cookies = new Cookies(req,res);
					// cookies.set('username',result[0].username,{httpOnly:false})
					res.json({
						error:0,
						message:'成功',
						data:result[0],
						errorInfo:null
					})
				}else{
					res.json({
						error:2,
						message:'用户名与密码不匹配',
						data:null,
						errorInfo:null
					})
				}
			}
		}
	})
}