/**
 * Created by Rex on 2018/3/8.
 */
;$(function(){
    //渲染列表
    function render() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function (info) {
                console.log(info);
                setTimeout(function(){
                    if(info.error){
                        //此时没有登录,跳转到登录页，登录成功还需要跳回来
                        location.href = "login.html?retUrl="+location.href;
                    }
                    //对列表进行渲染
                    $('#OA_task_2').html(template('tpl', {info: info}))
                    //渲染完成后结束下拉
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                    //把总金额改成00.00
                    $(".lt_total span").text("0.00");
                },1000)
            }
        })
    }

    //配置下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    render();
                }
            }
        }
    });

    //删除功能
    $('#OA_task_2').on('tap','.btn_del',function(){
        var id=$(this).data('id');
        mui.confirm("确认要删除此件商品吗?","温馨提示",["确认","取消"],function(e){
            if(e.index==0){
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{
                        id:[id]
                    },
                    success:function(info){
                        if(info.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
    })

    //修改编辑功能
    $('#OA_task_2').on('tap','.btn_edit',function(){

        var data = this.dataset;//dataset:BOM方法不是jQ方法所以用this而不是$(this)
        console.log(data);
        var content = template('editTpl',data)
        //去掉所有的换行
        content=content.replace(/\n/g,"")

        mui.confirm(content,"编辑商品",["确认","取消"],function(e){
            if(e.index==0){
                //获取ajax所需要的数据
                var id = data.id;
                var size = $(".lt_edit_size span.now").text();
                var num = $(".mui-numbox-input").val();
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num,
                    },
                    success:function(info){
                        if(info.success){
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })

        //给span添加点击事件
        $(".lt_edit_size span").on("tap", function () {
            $(this).addClass("now").siblings().removeClass("now");
        })
        //初始化numbox
        mui(".mui-numbox").numbox();
    })

    //勾选算出订单总价功能
    $('#OA_task_2').on('change','.ck',function(){
        var total=0;
        $(":checked").each(function(){
            //获得当前勾选框的价格
            var price=$(this).data('price')
            var num=$(this).data('num')
            total+=price*num
        })
        //取两位小数
        $(".lt_total span").text(total.toFixed(2));
    })

})