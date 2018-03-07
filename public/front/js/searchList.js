/**
 * Created by Rex on 2018/3/7.
 */
;$(function(){
    //获得上一页传来的地址栏数据渲染
    var value = getUrlParam("key");
    $(".lt_search input").val(value);

    //根据input值ajax请求渲染页面
    function render(){
        //loading延迟效果
        $(".product").html('<div class="loading"></div>');
        //处理ajax请求的数据
        var param={};
        //必传数据
        param.proName=value;
        param.page=1;
        param.pageSize=100;
        //可选数据
        //price,num
        var temp=$('.lt_sort a.now')
        if(temp.length>0){
            var sortName=temp.data('type');
            var sortValue=temp.find('span').hasClass("fa-angle-down")?2:1;
            param[sortName]=sortValue;
        };

        $.ajax({
            type:'GET',
            url:'/product/queryProduct',
            data:param,
            success:function(info){
                //console.log(info);
                setTimeout(function(){
                    $(".product").html(template("tpl",info));
                },1000)
            }
        })
    }
    render()

    //点击搜索事件
    $('.lt_search button').on('click',function(){

        value=$(".lt_search input").val();
        render()
        //清空input
        $(".lt_search input").val('')
        //改变缓存里的值,以及搜索页面的历史记录
        var arr =getStorage();
        var index=arr.indexOf(value)
        if(index != -1){
            //删除重复的那一项
            arr.splice(index,1)
        }
        if(arr.length>=10){
            //删除最后一项
            arr.pop();
        }
        arr.unshift(value)
        //设置localStorage
        localStorage.setItem('search_list',JSON.stringify(arr))
    })

    //排序功能
    $('.lt_sort a[data-type]').on('click',function(){
        var $this=$(this);
        if($this.hasClass('now')){
            //fa-angle-down  fa-angle-up
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }else{
            $this.addClass('now').parent().siblings().children().removeClass('now');
            $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down')
        }
        render()
    })















})