// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	 var sql = "update `users` set `username` = '" + req.body.username + "',`email` = '" + req.body.email + "',`phone`='" + req.body.phone + "' where `id` = '" + req.body.id + "'";
    public.query(sql, function (error, result) {
        // console.log(result)
        if (error == null) {
            res.json({
                error: 0,
                message: '编辑成功',
                data: result[0],
            })
        } else {
            res.json({
                error: 1,
                message: '编辑失败',
                data: error,
            })
        }
    })
}