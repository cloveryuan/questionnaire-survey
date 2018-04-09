// 个人信息管理保存
module.exports = function(req,res){
	const public = require('../public');	
	var photo = req.body.photo;   
    var sql = "update `users` set `username` = '" + req.body.username + "',`email` = '" + req.body.email + "',`phone`='" + req.body.phone + "',`photo`='" + photo + "' where `id` = '" + req.body.id + "'";
    console.log(sql)
    public.query(sql, function (error, result) {
        // console.log(result)
        if (error == null) {
            res.json({
                error: 0,
                message: '修改成功',
            })
        } else {
            res.json({
                error: 1,
                message: '修改失败',
            })
        }
    })
}