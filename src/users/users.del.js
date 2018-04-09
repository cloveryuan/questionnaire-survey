// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	var id = req.query.id
    var sql = "delete from `users` where  `id` = '" + id + "'";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '成功',
                data: result,
            })
        } else {
            res.json({
                error: 1,
                message: '失败',
                data: error,
            })
        }
    })
}