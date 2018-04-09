module.exports = function(req,res){
	const public = require('../public');	
	var sql = "select `group`,`groupName` from `items` group by `group`";
    public.query(sql, function (error, result) {
        // console.log(result)
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