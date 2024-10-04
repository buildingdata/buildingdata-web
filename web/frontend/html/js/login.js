// $(document).ready(function () {
//     loginCheck();
// });

function login() {
    // alert("看这里！！！！！")
    var phone = $('#login_username').val(),
        password = $('#password').val();
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
        headers:{
            "Access-Control-Allow-Origin":"/apis/building/user/login"
        },
        success: function (message) {
            console.log(message);
            var cookie_id =  message.Authorization;

            //cookie名称为Authorization,过期时间为一天
            function setCookie(cname,cvalue,exdays){
              var d = new Date();
              d.setTime(d.getTime()+(exdays*24*60*60*1000));
              var expires = "expires="+d.toGMTString();
              document.cookie = cname + "=" + cvalue + "; " + expires;
            }
            
            setCookie("Authorization",cookie_id,1);
            if (message.success == true) {
               
                    window.document.location.href = "index.html"
                //    window.document.location.href="a.html";
            } else {
                //console.log("请求出错！");
                alert(message.loginstatue);

            }

        },
        error: function () {
            // alert("看这里！！！！！2")
            alert("登陆失败");
            // console.log("这是失败的！");
        }
    });
}

// function loginCheck() {
//     $.ajax({
//         url: "http://localhost:8080/building/session/loginCheck",
//         type: "get",
//         // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
//         dataType: "json",
//         xhrFields: {
//             withCredentials: true
//         },
//         success: function (message) {
//             console.log(message);
//             if (message.success == true) {
//                 loginStatue = "login";
//                 $(location).attr('href', 'mapInfo.html');

//             } else {
//                 // bootbox.alert("未登录，请先登陆");
//             }

//         },
//         error: function () {
//             // console.log("这是失败的！");
//         }
//     });
// }