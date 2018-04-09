// 请求数据库名字是否重复验证
module.exports = function(req,res){
	const public = require('../public');	
	console.log(req.query.id)
    var sql = "delete from `items` where  `id`='"+ req.query.id +"'";
    public.query(sql,function(error,result){
        if(error==null){
            res.json({
                error:0,
                message:'删除成功',
                data:result,
            })
        }else{
            res.json({
                error: 1,
                message: '删除失败',
                data:error
            }) 
        }
    })
}