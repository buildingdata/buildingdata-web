$(document).ready(function () {
    loginCheck();
});
var FormValidation = function () {

    // basic validation
    var handleLoginValidation = function () {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var form = $('#login-form');
        var error = $('.alert-danger', form);
        var success = $('.alert-success', form);

        form.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate alls fields including form hidden input
            messages: {},
            rules: {
                login_username: {
                    required: true,
                    checkPhoneNum: true
                },
                password: {
                    required: true
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                success.hide();
                error.show();
                alert("cuole");
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

            submitHandler: function (form) {
                success.show();
                error.hide();
                // post_ajax_login_data_user_passwd();
             
                login();
            }
        });
    }

    $.validator.addMethod("checkPhoneNum", function (value, element, params) {
        var checkPwd = /^1[3,5,7,8]\d{9}$/g;
        return this.optional(element) || (checkPwd.test(value));
    }, "*请输入合法的手机号！");
    return {
        //main function to initiate the module
        init: function () {
            handleLoginValidation();

        }

    };

}();

function initPage() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    var returnUrlDef = consoleIndex;
    var deviceDef = window.pwdString.encrypt("returnUrl:" + returnUrlDef);
    if (!theRequest["device"]) {
        theRequest["device"] = deviceDef;
    }
    if (theRequest["device"] == deviceDef) {
        $(".logo").css("visibility", "visible");
    }

    /* else {
         $(".login-options").show();
         $(".create-account").show();
     }*/
    $("#btn-trd").click(function () {
        location.href = getTrdLoginPath("xdu");
    })
}

jQuery(document).ready(function () {
    getCookie();
    // initPage();
    FormValidation.init();
});

function login_go_forget() {
    // window.document.location.href = "forget.html";
    loginCheck();
}

function post_ajax_login_data_user_passwd() {}

function login() {
    // alert("看这里！！！！！")
    console.log($("#login_username").val());
    var phone = $('#login_username').val(),
        password = $('#login_passwd').val();
    setCookie(); //调用设置Cookie的方法   
    $.ajax({
        url: "/apis/building/user/login",
        type: "post",
        // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        data: {
            phone: phone,
            password: password
        },
        success: function (message) {
            // alert("看这里！！！！！1")
            console.log(message);
            if (message.success == true) {
                console.log("这是对的！");
                bootbox.alert(message.loginstatue,function(){window.document.location.href = "mapInfo.html"});
                //    window.document.location.href="a.html";

            } else {
                console.log("这是错的！");
                bootbox.alert(message.loginstatue);

            }

        },
        error: function () {
            // alert("看这里！！！！！2")
            bootbox.alert("登陆失败");
            // console.log("这是失败的！");
        }
    });
}

// //登录按钮与键盘回车绑定
// function IsEnterKeyPress(){
//     var lKeyCode = (navigator.appname=="Netscape")?event.which:window.event.keyCode;
//     if(lKeyCode == 13){
//         remeber();
//     }   	
// }

function setCookie() { //设置cookie
    var phone = $('#login_username').val(),
        password = $('#login_passwd').val();
    var remStatue = $("input[type='checkbox']").is(":checked"); //获取是否选中
    if (remStatue == true) { //如果选中-->记住密码登录
        $.cookie("phone", phone.trim(), 7); //有效时间7天，也可以设置为永久，把时间去掉就好
        $.cookie("password", password.trim(), 7);
    } else { //如果没选中-->不记住密码登录
        $.cookie("password", "");
        $.cookie("phone", "");
        alert("没有记住密码")
    }
}

function getCookie() { //获取cookie    
    // alert("cookie是："+$.cookie);
    var phone = $.cookie("phone"); //获取cookie中的用户名    
    var pwd = $.cookie("password"); //获取cookie中的登陆密码    
    if (pwd) { //密码存在的话把“记住用户名和密码”复选框勾选住    
        $("[name='remember']").attr("checked", "true");
    }
    if (phone != "") { //用户名存在的话把用户名填充到用户名文本框    
        $("#login_username").val(phone);
    } else {
        $("#login_username").val("");
    }
    if (pwd != "") { //密码存在的话把密码填充到密码文本框    
        $("#login_passwd").val(pwd);
    } else {
        $("#login_passwd").val("");
    }
}

function loginCheck(){
    $.ajax({
        url: "/apis/building/session/loginCheck",
        type: "get",
        // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function (message) {
            console.log(message);
            if (message.success == true) {
                loginStatue = "login";
                $(location).attr('href','mapInfo.html');

            } else {
                // bootbox.alert("未登录，请先登陆");
            }

        },
        error: function () {
            // console.log("这是失败的！");
        }
    });
}