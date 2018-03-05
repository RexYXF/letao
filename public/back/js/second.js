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
                console.log(info);
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

        //渲染下拉菜单
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                //console.log(info);
                $('.dropdown-menu').html(template('tpl1',info))
            }
        })
    })

    //点击下拉菜单 改变dropdown_text的值
    $('.dropdown-menu').on('click','a',function(){
        $('.dropdown_text').text($(this).text());
        //储存categoryId
        var id=$(this).data('id');
        $("[name='categoryId']").val(id)
        //让categoryId的校验通过
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    //图片上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            var pic= data.result.picAddr;//可以获得上传后图片的地址
            //console.log(pic);
            $('.img_box img').attr('src',pic);
            //把值传给隐藏的input值
            $("[name='brandLogo']").val(pic)
            //让brandLogo校验成功
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    })

    //表单验证
    $form=$('form');
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入品牌的名称'
                    }
                }
            },
            brandLogo: {
                validators:{
                    notEmpty:{
                        message:'请上传品牌的图片'
                    }
                }
            }
        },
        //把默认排除项清除
        excluded:[]
    })

    //验证完成后添加功能
    $form.on('success.form.bv',function(e){
        //阻止默认行为
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(info){
                if(info.success){
                    $('#secondModal').modal('hide');
                    //重新渲染
                    page=1;
                    render();
                    //重置样式
                    $form.data("bootstrapValidator").resetForm(true);
                    $(".dropdown_text").text("请选择一级分类");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        })
    })












});