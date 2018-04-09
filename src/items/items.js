// 请求数据库名字是否重复验证
module.exports = function(req,res){
	const public = require('../public');	
	 var sql = "select `id`,`item`,`group`,`sort` from `items`";
    public.query(sql,function(error,result){
        if(error==null){
            res.json({
                error:0,
                message:'成功',
                data:result,
            })
        }else{
            res.json({
                error: 1,
                message: '失败',
                data:error
            }) 
        }
    })
}