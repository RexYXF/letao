/**
 * Created by Rex on 2018/3/8.
 */
;$(function(){
    var productID=getUrlParam("productId");
    //console.log(productID);
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:productID},
        success:function(info){
            console.log(info);
            $('.mui-scroll').html(template('tpl',info))
            //重新初始化轮播图
            mui(".mui-slider").slider();
            //重新初始化numbox
            mui(".mui-numbox").numbox();
            //可以选择尺码
            $(".lt_size span").on("click", function () {
                $(this).addClass("now").siblings().removeClass("now");
            });
        }
    })

    //加入购物车
    $('.btn_addCart').on('click',function(){
        var size=$('.lt_size span.now').text();
        var num=$('.mui-numbox-input').val();

        if(!size){
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:productID,
                num:num,
                size:size,
            },
            success:function(info){
                //加入购物车时需要登录,所以会有error
                if(info.error){
                    mui.toast("请先登录")
                    location.href = "login.html?retUrl="+location.href;
                }
                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                        if(e.index==0){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        })






    })






})