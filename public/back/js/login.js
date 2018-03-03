/**
 * Created by Rex on 2018/3/2.
 */
;(function(){

    $("form").bootstrapValidator({
        //要求：用户名 不能为空  2-6位
        //     密码 不能为空  密码的长度在6-12位
        fields: {
            //对应了form中的name属性
            username:{
                //给username配置校验规则
                validators:{
                    //非空的规则
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'长度应该在2-6位'
                    },
                    //专门用来提示信息
                    callback: {
                        message:'用户名错误'
                    }

                }

            },

            password: {
                validators:{
                    //非空的规则
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度应该是6-12位'
                    },
                    callback: {
                        message:'密码错误'
                    }

                }
            }
        },
        //配置小图标, 成功 失败  校验中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })
    //表单验证成功,阻止表单默认提交方式,使用ajax认证提交
    $('form').on("success.form.bv",function(e){
        e.preventDefault();

        //发送ajax请求登录
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.error==1000){
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error === 1001) {
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if(info.success) {
                    location.href = "index.html";
                }
            }
        })
    })

    //重置表单， 清除所有的样式
    $("[type='reset']").on("click",function(){
        $("form").data("bootstrapValidator").resetForm(true)
    });

});