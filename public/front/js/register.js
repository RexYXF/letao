/**
 * Created by Rex on 2018/3/10.
 */
$(function(){
    //获取验证码功能
    $('.btn_getcode').on('click',function(){
        var $this = $(this);
        //禁用
        $this.prop('disabled',true).addClass('disabled').text('发送中')
        //发送ajax请求
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function (info) {
                console.log(info.vCode);
                //验证码发送成功开始倒计时60秒
                var count=60;
                var timer=setInterval(function(){
                    count--;
                    $this.text(count+'秒后再次发送')

                    if (count==0) {
                        clearInterval(timer)
                        $this.prop('disable',false).removeClass('disabled').text('再次发送')
                    }
                },1000)
            }
        })
    })

    //注册功能
    $('.btn_register').on('click',function(e){
        e.preventDefault();
        // 对所有数据进行校验
        var username=$('[name="username"]').val();
        var password=$('[name="password"]').val();
        var repassword=$('[name="repassword"]').val();
        var mobile=$('[name="mobile"]').val();
        var vCode=$('[name="vCode"]').val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }

        if(!password){
            mui.toast("请输入密码");
            return false;
        }
      
        if(repassword !== password){
            mui.toast("两次输入的密码不一致");
            return false;
        }
      
        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        if(!/^1[3-8]\d{9}$/.test(mobile)){
            mui.toast("手机号码格式不对");
            return false;
        }

        if(!vCode){
            mui.toast("请输入手机验证码");
            return false;
        }

        if(!$('.ck').prop('checked')){
            mui.toast("请阅读并勾选《会员服务协议》");
            return false;
        }


        //所有验证成功后发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode,
            },
            success:function (info) {
                if(info.error === 403){
                    mui.toast(info.message);
                }

                if(info.success){
                    mui.toast("恭喜你，注册成功了，一秒后跳转到登录页");
                    setTimeout(function () {
                      location.href = "login.html";
                    }, 1000);
                }
            }
        })












    })















})