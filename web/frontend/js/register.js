jQuery('.register-form').show();

//验证码
var verificationCode;

var FormValidation = function () {

    // basic validation
    var handleLoginValidation = function () {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var form = $('#register-form');
        var error = $('.alert-danger', form);
        var success = $('.alert-success', form);

        //1.引入jquery.min.js   2.引入 jquery.validate.js
        form.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate alls fields including form hidden input  忽略某些元素不验证
            messages: {
                rpassword: {
                    equalTo: "两次密码输入不一致."
                }
            },
            rules: {
                username: {
                    required: true,

                },
                phone: {
                    required: true,
                    checkPhoneNum: true
                },
                password: {
                    required: true,
                    checkPwd: true
                },
                rpassword: {
                    required: true,
                    equalTo: "#register_passwd"
                },
                // vcode: {
                //     required: true,
                //     checkViCode: true
                // }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                success.hide();
                error.show();
                App.scrollTo(error, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },

            //编写验证通过执行的内容
            submitHandler: function (form) {
                success.show();
                error.hide();
                post_register();
                // form.submit();
            }
        });


    }

    $.validator.addMethod("checkPwd", function (value, element, params) {
        var checkPwd = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;
        return this.optional(element) || (checkPwd.test(value));
    }, "密码至少包一个大写字母、一个小写字母，长度至少8位");

    $.validator.addMethod("checkPhoneNum", function (value, element, params) {
        var checkPwd = /^1[3,5,7,8]\d{9}$/g;
        return this.optional(element) || (checkPwd.test(value));
    }, "*请输入合法的手机号！");
    $.validator.addMethod("checkViCode", function (value, element, params) {
        var ViCode = /^\d{6}\b/;
        return this.optional(element) || (ViCode.test(value));

    }, "*验证码错误，请重试！");
    return {
        //main function to initiate the module
        init: function () {

            handleLoginValidation();

        }

    };

}();

jQuery(document).ready(function () {
    FormValidation.init();
    sendCode();
});

function sendCode() {
    var ordertime = 60 //设置再次发送验证码等待时间
    var timeleft = ordertime
    var btn = $("#vcode_send_btn")
    // var phone = $("#register_phone")

    // btn.removeAttr("disabled")

    //计时函数
    function timeCount() {
        timeleft -= 1
        if (timeleft > 0) {
            btn.html(timeleft + " 秒后重发");
            setTimeout(timeCount, 1000)
        } else {
            btn.html("重新发送");
            timeleft = ordertime //重置等待时间
            btn.removeAttr("disabled");
        }
    }

    //事件处理函数
    btn.off().click(function () {
        $(this).attr("disabled", true); //防止多次点击
        console.log("test-front")
        // post_ajax_vcode_data_phone();
        timeCount(this);
    })

}

function register_back_login() {
    window.document.location.href = "login.html";
}

var sess = null;

// function post_ajax_vcode_data_phone() {
//     var vcode_json = {
//         "phoneNumber": $('#register_username').val(),
//         "operation": 0
//     };
//     $.ajax({
//         url: ajaxBasePath + ajaxget_regsms,
//         type: "post",
//         contentType: "application/json",
//         data: JSON.stringify(vcode_json),
//         dataType: "json",
//         success: function (res) {
//             console.log($('#register_username').val())
//             console.log(res)
//             if (res.retureValue == 0) {
//                 sess = res.retureData.sessionId
//                 console.log(res.retureMsg)
//             } else {
//                 bootbox.alert(res.retureMsg);
//             }
//         },
//         error: function (res) {
//             bootbox.alert("发送验证码失败");
//         },
//         complete: function (res) {

//         }
//     });
// }

// function post_ajax_register_data_user_passwd() {
//     console.log(sess);
//     $.ajax({
//         url: ajaxBasePath + verifySmsCode,
//         type: "post",
//         data: JSON.stringify({
//             phoneNumber: $('#register_username').val(),
//             verifyCode: $('#verifyCode_front').val()
//         }),
//         contentType: "application/json",
//         dataType: "json",
//         success: function (res) {
//             if (res.retureValue == 0) {
//                 console.log(res);
//                 post_register();
//             } else {
//                 bootbox.alert(res.retureMsg);
//             }
//         },
//         error: function (res) {

//         },
//     });
// }
// function post_register(){
//         var register_json = {
//         "phone": $('#register_phone').val(),
//         "userName": $('#register_username').val(),
//         "password": $('#register_passwd').val()
//         };
//         console.log($('#register_username').val())
//         console.log($('#register_passwd').val())
//         console.log($('#verifyCode_front').val())
//         $.ajax({
//         url: addSession(ajaxBasePath+ajax_register, sess, ";"),
//         type: "get",
//         contentType: "application/json",
//         data: JSON.stringify(register_json),
//         dataType: "json",
//         success: function(res) {
//             console.log(res)
//             if (res.retureValue == 0) {
//                 bootbox.alert({
//                     message: "注册成功",
//                     callback: function() {
//                         window.document.location.href = "login.html"
//                     }
//                 });
//             } else {
//                 bootbox.alert(res.retureMsg);
//             }
//         },
//         error: function(res) {
//             bootbox.alert("注册失败");
//         },
//         complete: function(res) {

//         }
//     });
// }
function post_register() {
    var userName = $('#register_username').val(),
        password = $('#register_passwd').val(),
        repassword = $('#register_repasswd').val(),
        phone = $('#register_phone').val(),
        code = $('#verifyCode_front').val();
    console.log("填写的code是：", code);
    console.log("从后台接受的全局验证嘛是：", verificationCode);
    if(phone == "undefined" || phone == null || phone == ""){
        bootbox.alert("电话号码不能为空");
    }
    else if(phone.match(/^1[3,5,7,8]\d{9}$/g) == null ){
        bootbox.alert("请输入合法的手机号！");
    }
    else if(userName == "undefined" || userName == null || userName == ""){
        bootbox.alert("用户名不能为空");
    }
    else if(password.match(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g) == null){
        bootbox.alert("密码至少包一个大写字母、一个小写字母，长度至少8位");
    }
    else if(repassword != password){
        bootbox.alert(password+repassword);
        bootbox.alert("两次密码输入不一致");
    }
    else if (code == verificationCode) {
        $.ajax({

            url: "/apis/building/user/register?phone=" + phone + "&&name=" + userName + "&&password=" + password,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    bootbox.alert({
                        message: "注册成功",
                        callback: function () {
                            window.document.location.href = "index.html"
                        }
                    });
                } else {
                    if(res.registerstatue){
                        bootbox.alert(res.registerstatue);
                    }
                    else{
                        bootbox.alert("注册失败");
                    }
                }
            },
            error: function (res) {
                bootbox.alert("注册失败");
            },
            complete: function (res) {

            }
        });
    } else {
        bootbox.alert("验证码输入错误");
    }

}

function sendMessage() {
    var phoneNum = $('#register_phone').val();

    $.ajax({

        url: "/apis/building/message/sendmessage?phoneNum=" + phoneNum,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            console.log(res);
            console.log(res.success);
            if (res.success == true) {
                console.log(res.verificationCode);
                verificationCode = res.verificationCode;
                // bootbox.alert({
                //     message: "验证码发过去啦",
                //     // callback: function () {
                //     //     window.document.location.href = "login.html"
                //     // }
                // });
            } else {
                if(res.errMsg){
                    bootbox.alert(res.errMsg);
                }
                else{
                    bootbox.alert("验证码发送失败，请从新发送");
                }
            }
        },
        error: function (res) {
            bootbox.alert("页面出错，请刷新重试");
        },
        complete: function (res) {

        }
    });
}