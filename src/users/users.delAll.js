// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	var sql = "delete from `users`";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '删除成功',
                data: result[0],
            })
        } else {
            res.json({
                error: 1,
                message: '删除失败',
                data: error,
            })
        }
    })
}