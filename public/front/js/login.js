/**
 * Created by Rex on 2018/3/8.
 */
;$(function(){
    //登录按钮
    $('.btn_login').on('click',function(){
        var username = $("[name=username]").val().trim();
        var password = $("[name=password]").val().trim();
        if (!username) {
            mui.toast("请输入用户名");
            return false;
        }
        if (!password) {
            mui.toast("请输入密码");
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password,
            },
            success:function(info){
                if (info.error === 403) {
                    mui.toast(info.message);
                }
                if(info.success){
                    //跳转到刚才的页面或者跳转到会员中心
                    //通过判断地址栏是否有拼接的retUrl
                    if(location.search.indexOf("retUrl") != -1){
                        //说明有，跳转到retUrl指定的地址
                        location.href = location.search.replace("?retUrl=", "");
                    }else {
                        //说明没有，跳转到用户中心
                        location.href = "user.html";
                    }
                }
            }
        })
    })
})