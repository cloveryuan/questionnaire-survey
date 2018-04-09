const express = require('express');
const app = express();
var public = require('./src/public');
const multer = require('multer');
const uuidv1 = require('uuid/v1')

app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));



//上传到文件夹下
// destination 是用来确定上传的文件应该存储在哪个文件夹中 。如果没有设置 destination，则使用操作默认的临时文件夹注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的。
// filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的
var storage = multer.diskStorage({//磁盘存储引擎可以让你控制文件的存储。
    destination: function (req, file, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        var filename = uuidv1() + '.' + file.originalname.split('.').pop()
        cb(null, filename)
    }
})

app.use(multer({
    storage: storage,//用这个就不用设置dest:'tmp'了
    limits: {
        fileSize: 1 * 1024 * 1024//限制大小
    },
    fileFilter: function (req, file, cb) {//限制后缀名
        // console.log(file);
        // console.log(['png', 'jpg', 'html'].indexOf(file.originalname.split('.').pop()))
        if (['png', 'jpg', 'html'].indexOf(file.originalname.split('.').pop()) < 0) {
            cb(null, false)
        }
        cb(null, true)
    }
}).array('file'))//multer返回值是一个对象，调用array的方法，file控件名称  就是上传的input name=file


// upload路由  上传插件server
app.post('/upload', function (req, res) {
    res.send(req.files)
})







//登录
app.post('/login',require('./src/login.js'));

// 注册
app.post('/register',require('./src/register/register.js'));

// 注册时请求数据库名字是否重复验证
app.get('/isSame',require('./src/register/isSame.js'));

// 用户管理开始
    // 分组管理  数据库里的数据传给前台展示数据
    app.get('/users/show',require('./src/users/users.show.js'));

    // 根据前台传过来的id，选出数据，删除数据库，前台在重新刷新获取数据库
    app.get('/users/del',require('./src/users/users.del.js'))

    //编辑获取数据，前台传回id，选出这组数据，把数据传给前台，前台回填
    app.get('/users/getUsers',require('./src/users/users.getUsers.js'))

    //用户管理的编辑保存
     app.post('/users/editSave',require('./src/users/users.editSave.js'));

    //用户管理的增加保存
    app.post('/users/addSave',require('./src/users/users.addSave.js'));

    //用户管理的全部删除
    app.get('/users/delAll',require('./src/users/users.delAll.js'));

    //个人信息  编辑回填保存
    app.post('/users/proSave',require('./src/users/users.proSave.js'));

// 用户管理结束



// 问卷选项分组管理开始
    //分组获取数据，展示到前台
    app.get('/items',require('./src/items/items.js'));

    //分组删除数据
    app.get('/items/del',require('./src/items/items.del.js'));

    //分组的编辑,回填数据
    app.post('/items/getUsers', require('./src/items/items.getUsers.js'))

    //问卷分组的编辑保存
    app.post('/items/editSave', require('./src/items/items.editSave.js'));

    //问卷分组的添加保存
    app.post('/items/addSave', require('./src/items/items.addSave.js'));

    //获取问卷分组
    app.get('/items/groups', require('./src/items/items.groups.js'));

    //获取问卷对应分组号里的选项样式item
    app.get('/items/getItems', require('./src/items/items.getItems.js'));

// 问卷选项分组管理结束




// 大纲问卷类型分组管理开始
    // 大纲管理展示数据
    app.get('/outlines',require('./src/outlines/outlines.js'));

    // 大纲管理删除
    app.get('/outlines/del',require('./src/outlines/Outlines.del.js'));

    //大纲问卷的添加保存
    app.post('/outlines/addSave', require('./src/outlines/outlines.addSave.js'));

    //大纲问卷的编辑保存
    app.post('/outlines/editSave', require('./src/outlines/outlines.editSave.js'));

    //大纲问卷的选择完questions和items，生成问卷，保存在后台questions里
    app.post('/questions/create', require('./src/outlines/questions.create.js'));

    //大纲问卷获取保存在后台的问卷详情，展示在前台
    app.get('/questions/getQuestion', require('./src/outlines/questions.getQuestion.js'));

    //大纲问卷点击关闭或者开启，来改变对应status状态
    app.get('/questions/changeStatus', require('./src/outlines/questions.changeStatus.js'));

     //大纲问卷删除对应问卷
    app.get('/questions/delQuestions', require('./src/outlines/delQuestions.js'));


// 大纲问卷类型分组管理结束


//answer,出现问卷页面
    app.get('/showanswer',require('./src/showanswer.js'))
    
//answer,出现问卷页面结束

app.listen(80)