
module.exports = function(req,res){
	const public = require('../public');
	var sql = "update `questions` set `status` = '"+ req.query.status +"' where `id` = '" + req.query.id + "'";
    public.query(sql,function(error,result){
        if(error==null){
            res.json({
                error:0,
                message:'改变status状态成功',
                data:result,
            })
        }else{
            res.json({
                error: 1,
                message: '改变status状态失败',
                data:error
            }) 
        }
    })
}