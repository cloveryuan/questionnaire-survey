
module.exports = function(req,res){
	const public = require('../public');	
	console.log(req.query.id)
     var sql = "select `item`, `group` , `id`,`sort` from `items` where `id`='" + req.body.id + "' ";
    public.query(sql,function(error,result){
        // console.log(result)
        if(error==null){
            res.json({
                error:0,
                message:'成功',
                data:result[0],
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