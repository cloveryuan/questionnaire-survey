module.exports = function(req,res){
	const public = require('../public');	
	var sql = "select `item`,`id`,`group` from `items` where `group`='" + req.query.group + "'";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '选择成功',
                data: result,
            })
        } else {
            res.json({
                error: 1,
                message: '选择失败',
                data: error,
            })
        }
    })
}