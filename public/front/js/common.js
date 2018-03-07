/**
 * Created by Rex on 2018/3/5.
 */
//初始化区域滚动
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});

//初始化轮播图
mui(".mui-slider").slider({
    interval:2000
})

//获得缓存记录
function getStorage(){
    var history=localStorage.getItem('search_list')||"[]";
    arr= JSON.parse(history);
    return arr
}

//获得地址栏的字段,并且封装成对象{name:"hucc",age:18, desc:"很帅"}
function getUrlParam(param){
    var url = decodeURI(location.search);
    var urlParam = url.slice(1).split('&');
    var obj={}
    urlParam.forEach(function(element,index){
        var k=element.split('=')[0];
        var v=element.split('=')[1];
        obj[k]=v;
    })
    return obj[param]
}