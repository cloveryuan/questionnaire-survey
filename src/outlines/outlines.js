
module.exports = function(req,res){
	const public = require('../public');
	var sql = "select `id`,`pid`,`text` from `outlines`";
    public.query(sql,function(error,result){
    	var data=[];
    	for(var i = 0;i<result.length;i++){
            // result[i].items = [];
    		if(result[i].pid==0){
    			result[i].children = [];
    			data.push(result[i]);
    			for(var j = 0;j<result.length;j++){
    				if(result[j].pid==result[i].id){
    					result[i].children.push(result[j])
    				}
    			}
    		}
    	}
        if(error==null){
            res.json({
                error:0,
                message:'成功',
                data:data,
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