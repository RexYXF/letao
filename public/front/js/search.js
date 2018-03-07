/**
 * Created by Rex on 2018/3/7.
 */
;$(function(){
    //列表渲染
    function render() {
        var arr = getStorage();
        $('.lt_history').html(template('tpl', {arr: arr}))
    }
    render()

    //添加功能
    $('.lt_search button').on('click',function(){
        var value = $('.lt_search input').val().trim();
        //如果为空提示信息
        $(".lt_search input").val('');
        if(value == "") {
            mui.toast("请输入搜索关键字");
            return;
        }

        var arr = getStorage();
        var index=arr.indexOf(value);
        if(index != -1){
            arr.splice(index,1)
        }
        if(arr.length>=10){
            arr.pop()
        }
        arr.unshift(value);
        localStorage.setItem('search_list',JSON.stringify(arr))
        render()
    })

    //删除功能
    $('.lt_history').on('click','.btn_delete',function(){
        var arr = getStorage();
        arr.splice($(this).data('index'),1)
        localStorage.setItem('search_list',JSON.stringify(arr))
        render()
    })

    //清空记录功能
    $('.lt_history').on('click','.btn_empty',function(){
        //弹出一个提示框
        mui.confirm("你确定要清空所有历史记录吗?","温馨提示",["取消","确定"],function(e){
            if(e.index==1){
                localStorage.removeItem('search_list')
                render()
            }
        })

    })

    //获得缓存记录
    function getStorage(){
        var history=localStorage.getItem('search_list')||"[]";
        arr= JSON.parse(history);
        return arr
    }
})