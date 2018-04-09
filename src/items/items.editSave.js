// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	 var sql = "update `items` set `item` = '" + req.body.item + "',`group` = '" + req.body.group + "',`sort`='" + req.body.sort + "' where `id` = '" + req.body.id + "'";
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