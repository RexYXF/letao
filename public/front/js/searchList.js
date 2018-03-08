/**
 * Created by Rex on 2018/3/7.
 */
;$(function(){
    var page=1;
    var pageSize=4
    //根据input值ajax请求渲染页面
    function render(callback){
        //处理ajax请求的数据
        var param={};
        //必传数据
        //每次都从input里取value值
        param.proName = $(".lt_search input").val();
        param.page=page;
        param.pageSize=pageSize;
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
                    callback(info)
                },1000)
            }
        })
    }
    //获得上一页传来的地址栏数据渲染
    var value = getUrlParam("key");
    $(".lt_search input").val(value);
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
                    page=1;
                    render(function(info){
                        //渲染数据
                        $(".product").html(template("tpl", info));
                        //渲染完成后结束下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //重置上拉加载
                        mui(".mui-scroll-wrapper").pullRefresh().refresh(true);
                    })
                }
            },
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    page++;
                    render(function(info){
                        if(info.data.length>0) {
                            //渲染数据,在第一页后追加
                            $(".product").append(template("tpl", info));
                            //渲染完成结束上拉加载,如果还有数据false
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }else{
                            //没有数据true
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true)
                        }
                    })
                }
            }
        }
    });

    //点击搜索事件
    $('.lt_search button').on('click',function(){
        //先把所有的排序都重置
        $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        //再触发下拉刷新一下页面
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        //改变缓存里的值,以及搜索页面的历史记录
        var value = $(".lt_search input").val();
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
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
    })
})