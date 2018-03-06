/**
 * Created by Rex on 2018/3/6.
 */
$(function(){
    var page=1;
    var pageSize=5;
    var picResult=[];
    //渲染商品列表
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $('tbody').html(template('firstTpl',info))
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:5,
                    totalPages:Math.ceil(info.total/info.size),
                    itemTexts:function(type,page,current){
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            default:
                                return "第"+page+"页";
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(a,b,c,p){
                        page=p
                        render()
                    },
                })
            }
        })
    }
    render()

    //添加商品
    $('.btn_add').on('click',function(){
        $('#productModal').modal('show');

        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100,
            },
            success:function(info){
                $('.dropdown-menu').html(template('secondTpl',info))
            }
        })
    })

    //给下拉菜单添加点击事件
    $('.dropdown-menu').on('click','a',function(){
        //改变选项的内容
        $('.dropdown_text').text($(this).text());
        //设置brandId
        $("[name='brandId']").val($(this).data("id"))
        //设置了brandId,让下拉菜单验证成功
        $('form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    //图片上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //限制只能传三张
            if(picResult.length>=3){
                return
            };
            //记录上传图片的地址
            var picAddr=data.result.picAddr;
            $('<img src="'+picAddr+'" width="100" height="100" alt="">').appendTo('.img_box')
            //将结果存入数组中
            picResult.push(data.result)
            //判断上传数量,改变验证结果
            if(picResult.length==3){
                //校验成功
                $('form').data('bootstrapValidator').updateStatus('productLogo','VALID')
            }else{
                //校验失败
                $('form').data('bootstrapValidator').updateStatus('productLogo','INVALID')
            }


        }
    });

    //表单验证
    var $form=$('form');
    $form.bootstrapValidator({
        //让隐藏的也校验
        excluded:[],
        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验字段
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择品牌"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        regexp:/^[1-9]\d*$/,
                        message:"请输入一个有效的商品库存"
                    }
                }
            },
            size:{
                validators:{
                    //非空
                    notEmpty:{
                        message:"请输入商品尺码"
                    },
                    //要求：2位数字-2位数字
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入一个合理的尺码（例如32-44）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入商品原价"
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入商品价格"
                    }
                }
            },
            productLogo: {
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }
        }
    })

    //给表单注册验证成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        //把数据格式化传入ajax
        var data = $form.serialize();
        //按接口要求把图片名字地址拼接到data中
        data+="&picName1="+picResult[0].picName+"&picAddr1="+picResult[0].picAddr
        data+="&picName2="+picResult[1].picName+"&picAddr2="+picResult[1].picAddr
        data+="&picName3="+picResult[2].picName+"&picAddr3="+picResult[2].picAddr

        $.ajax({
            type:'POST',
            url:'/product/addProduct',
            data:data,
            success:function(info){
                if(info.success){
                    //关闭模态框
                    $('#productModal').modal('hide');
                    //重新渲染第一页
                    page=1;
                    render();
                    //重置模态框
                    $form.data('bootstrapValidator').resetForm(true);
                    $('.dropdown_text').text('请选择二级分类');
                    $('.img_box img').remove();
                    //把存图片的数组清空
                    picResult=[];
                }
            }
        })

    })








})