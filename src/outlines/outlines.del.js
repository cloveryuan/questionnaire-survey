
module.exports = function(req,res){
	const public = require('../public');
    // 查看要删除的选项是否有子级，如果有，必须删除子级才能删除父级，就是当前选择的选项
    //搜索语句，看看谁的pid和当前的id相等，就是当前的子级
    public.query("select `id` from `outlines` where `pid` = '" + req.query.id + "'",function(error,result){
        if(error==null){
            if(result.length==0){
               var sql = "delete from `outlines` where `id`='" +  req.query.id+ "'";
                public.query(sql,function(error,result){
                    console.log(result)
                    if(error==null){
                        res.json({
                            error:0,
                            message:'成功',
                        })
                    }else{
                        res.json({
                            error: 2,
                            message: '失败',
                            data:error
                        }) 
                    }
                })
            }else{
                res.json({
                    error:1,
                    message:'请先删除子选项',
                })
            }
        }else{
            res.json({
                error: 2,
                message: '失败',
                data:error
            }) 
        }
    })
}




	