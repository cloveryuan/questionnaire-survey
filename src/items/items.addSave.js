module.exports = function(req,res){
	const public = require('../public');	
	var sql = "insert into `items` (`item`,`group`,`sort`) values ('" + req.body.item + "','" + req.body.group + "','" + req.body.sort + "')";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '修改成功',
                data: result[0],
            })
        } else {
            res.json({
                error: 1,
                message: '修改失败',
                data: error,
            })
        }
    })
}