/**
 * Created by Rex on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //console.log(info);
                $('tbody').html(template('tpl', info))

                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    numberOfPages:5,
                    //当页码被点击触发时
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        //重新渲染
                        render()
                    }
                })
            }
        })
    }
    render()

    $('tbody').on('click','.btn',function(){
        //console.log(aaa);
        $('#userModal').modal('show');
        var id=$(this).parent().data('id');
        var isDelete=$(this).hasClass('btn-success')?1:0;
        $('.btn_confirm').off().on('click',function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success){
                        $('#userModal').modal('hide');
                        render()
                    }
                }
            })
        })

    })
});