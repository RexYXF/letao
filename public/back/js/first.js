/**
 * Created by Rex on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $('tbody').html(template('tpl',info))
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:5,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(event,originalEvent,type,page1){
                        page=page1;
                        render();
                    }
                })
            }
        })
    }
    render();

    $('.btn_add').on('click',function(){
        $('#firstModal').modal('show');
    })

    var $form=$('form');
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryName: {
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
                    }
                }
            }
        }
    })

    $form.on('success.form.bv',function(e){
        e.preventDefault();

        $.ajax({
            type:"POST",
            url:"/category/addTopCategory",
            data: $form.serialize(),
            success:function (info) {

                if(info.success) {
                    //关闭模态框
                    $("#firstModal").modal("hide");
                    //重置表单的样式和内容
                    $form.data("bootstrapValidator").resetForm(true);
                    //重新渲染第一页
                    page = 1;
                    render();
                }
            }
        });

    })

















})