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
        $(".lt_search input").val('');
        //如果为空提示信息
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
        //页面跳转至详情页
        location.href = "searchList.html?key="+value;

    })

    //删除功能
    $('.lt_history').on('click','.btn_delete',function(){
        that=$(this)
        mui.confirm("你确定要删除这条历史记录吗?", "温馨提示", ["取消", "确认"], function (e) {
            if (e.index === 1) {
                var arr = getStorage();
                arr.splice(that.data('index'), 1)
                localStorage.setItem('search_list', JSON.stringify(arr))
                render()
            }
        })
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
})