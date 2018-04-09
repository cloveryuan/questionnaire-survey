// 请求数据库名字是否重复验证
module.exports = function(req,res){
	const public = require('../public');	
	console.log(req.query.username)
    var sql = 'select `username` from `users` where `username` = "'+ req.query.username + '"';
    public.query(sql,function(error,result){
        if(error==null){
            if (result.length == 0) {
                res.send('true')
            } else {
                res.send('false')
            }
        }else{
            res.send(error)
        }       
    })
}