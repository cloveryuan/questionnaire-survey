// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
	const public = require('../public');	
	 var sql = "insert into `outlines` (`pid`,`text`) values ('"+ req.body.pid +"','" + req.body.text + "')";
    public.query(sql, function (error, result) {
        console.log(result)
        if (error == null) {
            res.json({
                error: 0,
                message: '添加成功',
                data: result,
            })
        } else {
            res.json({
                error: 1,
                message: '添加失败',
                data: error,
            })
        }
    })
}