'use strict';
var demo = {}
demo.index = {}//首页js
demo.reg = {}//注册js
demo.login = {}//登录js
demo.profile = {}


// index
//点击引进几个页面
demo.index.jump = function (page) {
    $.get('./' + page + '.html', function (res) {
        $('#content').html(res)
    })
}

/*
    hash事件+ajax读取页面
*/
window.onload = function(){
    if(!window.location.hash){//如果一开始没有hash值，就return
        return 
    }
    var url = window.location.hash.substr(1)+".html";
    $.get(url, function (result) {
            $('#content').html(result)
    })
}
window.onhashchange=function(){
    if (!window.location.hash) {//如果没有hash值，就return
        return
    }
    var url=window.location.hash.substr(1)+'.html';
    $.get(url,function(result){
        $('#content').html(result)
    })
}



//注销
demo.index.logout = function () {
    Cookies.remove('username');
    Cookies.remove('auth');
    location.reload();
}

//判断是否有账户Cookies
// console.log(Cookies.get('username'))
if (Cookies.get('username')) {
    // location.href = '/index.html';
    $('.login2').hide()   
    if(Cookies.get('photo')){
        $('.username').html('<img class="icon img-thumbnail" src="/upload/' + Cookies.set('photo') + '">') ;
    }else{
        $('.username').text(Cookies.get('username'));
    }
    $('.username').click(function () {
        demo.index.jump('profile')
    })
} else {
    $('.login1').hide();     
}

















