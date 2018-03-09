/**
 * Created by Rex on 2018/3/10.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            if(info.error){
                location.href="login.html"
            }
            //如果成功，会直接返回个人信息
            $(".user_info").html( template("tpl", info) );
        }
    })

    //退出功能
    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'get',
            url:"/user/logout",
            success:function (info) {
                if(info.success) {
                    //跳转到登录页
                    location.href = "login.html";
                }
            }
        })
    })



})

