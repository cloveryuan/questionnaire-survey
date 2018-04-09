const mysql = require('mysql');
const public = mysql.createConnection({
    host: '127.0.0.1',
    // port:'3306',
    user: 'root',
    password: '',
    database: 'qs'
});
public.connect();//链接数据库
module.exports = public;