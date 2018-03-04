/**
 * Created by Rex on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
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
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        render();
                    }
                })
            }
        })
    }
    render();

    //添加分类
    $('.btn_add').on('click',function(){
        $('#secondModal').modal('show');
    })
    //渲染下拉菜单
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            //console.log(info);
            $('.dropdown-menu').html(template('tpl1',info))
        }
    })
    //点击下拉菜单 改变dropdown_text的值
    $('.dropdown-menu').on('click','a',function(){
        $('.dropdown_text').text($(this).text());
        //储存categoryId
        var id=$(this).data('id');
        $("[name='categoryId']").val(id)
    })
    //图片上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            //e事件对象
            console.log(data);
        }
    })















});