/**
 * Created by Rex on 2018/3/2.
 */
;(function(){

    $("form").bootstrapValidator({
        //Ҫ���û��� ����Ϊ��  2-6λ
        //     ���� ����Ϊ��  ����ĳ�����6-12λ
        fields: {
            //��Ӧ��form�е�name����
            username:{
                //��username����У�����
                validators:{
                    //�ǿյĹ���
                    notEmpty: {
                        message: '�û�������Ϊ��'
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:'����Ӧ����2-6λ'
                    },
                    //ר��������ʾ��Ϣ
                    callback: {
                        message:'�û�������'
                    }

                }

            },

            password: {
                validators:{
                    //�ǿյĹ���
                    notEmpty: {
                        message: '���벻��Ϊ��'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'���볤��Ӧ����6-12λ'
                    },
                    callback: {
                        message:'�������'
                    }

                }
            }
        },
        //����Сͼ��, �ɹ� ʧ��  У����
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })
    //����֤�ɹ�,��ֹ��Ĭ���ύ��ʽ,ʹ��ajax��֤�ύ
    $('form').on("success.form.bv",function(e){
        e.preventDefault();

        //����ajax�����¼
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.error==1000){
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error === 1001) {
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
                if(info.success) {
                    location.href = "index.html";
                }
            }
        })
    })

    //���ñ��� ������е���ʽ
    $("[type='reset']").on("click",function(){
        $("form").data("bootstrapValidator").resetForm(true)
    });

});