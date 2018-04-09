// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	var sql = "insert into `users` (`username`,`email`,`phone`) values ('" + req.body.username + "','" + req.body.email + "','" + req.body.phone + "')";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '保存成功',
                data: result[0],
            })
        } else {
            res.json({
                error: 1,
                message: '保存失败',
                data: error,
            })
        }
    })
}