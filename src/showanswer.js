module.exports = function(req,res){
	const public = require('./public');
	var id = req.query.id;
	
	var sql = "select * from `questions` where `id` = '"+ id +"'";
	public.query(sql,function(error,result){
		console.log(result)
		if(error==null){
			res.json({
				error:0,
				message:'查看问卷成功',
				data:result[0],
			})
		}else{
			res.json({
				error:1,
				message:'查看问卷失败',
				data:null,
			})
		}
	})
}