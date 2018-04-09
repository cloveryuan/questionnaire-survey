// 数据库里的数据传给前台展示数据
module.exports = function(req,res){
    const public = require('../public');	
    var create_id = req.body.create_id;
    var content = req.body.content;

    var titles = JSON.parse(content).questions
    var title = '';
    for(var i = 0;i<titles.length;i++){
        title += titles[i].text + ' '
    }
    console.log(title)
    var sql = "insert into `questions` (`create_id`,`content`,`title`) values ('" + create_id + "','" + content + "','" + title + "')";
    public.query(sql, function (error, result) {
        if (error == null) {
            res.json({
                error: 0,
                message: '生成问卷成功',
                data: result,
            })
        } else {
            res.json({
                error: 1,
                message: '生成问卷失败',
                data: error,
            })
        }
    })
}