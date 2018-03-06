/**
 * Created by Rex on 2018/3/5.
 */
$(function(){
    //一级分类
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function(info){
            $('.first').html(template('firstTpl',info))
            renderSecond(info.rows[0].id)
        }
    })
    //添加点击切换事件
    $('.first').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        renderSecond(id);
        //让区域滚动重新到0,0的位置,scroll()打印出来的是个伪数组[1]对应右边的区域滚动
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300)
    })
    //二级分类
    function renderSecond(id) {
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(info){
                //console.log(info);
                $('.second').html(template('secondTpl',info))
            }
        })
    }
})