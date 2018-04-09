
module.exports = function(req,res){
	const public = require('../public');
	var sql = "select `ctime`,`mtime`,`title`,`status`,`id` from `questions` where `create_id` = '"+ req.query.create_id +"'";
    public.query(sql,function(error,result){
        if(error==null){
            res.json({
                error:0,
                message:'获取问卷详情成功',
                data:result,
            })
        }else{
            res.json({
                error: 1,
                message: '获取问卷详情失败',
                data:error
            }) 
        }
    })
}