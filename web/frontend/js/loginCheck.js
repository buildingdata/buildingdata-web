$(document).ready(function () {
    loginCheck();
    checkPermission();
    checkInputPermission();
});
var loginStatue = "logout";

//获取当前日期的函数
function getTimeNow() {
    var day2 = new Date(),
        timeNowDom = $('#timeNowShow');
    day2.setTime(day2.getTime());
    timeNow = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    if (timeNowDom.length != 0) {
        timeNowDom.text(timeNow);
        console.log(timeNowDom)
    }
}

// 新增一个控制台时间输出的函数
function printDateNow(){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    month=month<10?"0"+month:month;
    var day=date.getDate();
    day=day<10?"0"+day:day;
    var week="日一二三四五六".charAt(date.getDay());
    var hour=date.getHours();
    hour=hour<10?"0"+hour:hour;
    var minute=date.getMinutes();
    minute=minute<10?"0"+minute:minute;
    var second=date.getSeconds();
    second=second<10?"0"+second:second;
    
    var current=year+"-"+month+"-"+day+" 星期"+week+" 时间 "+hour+":"+minute+":"+second;
    console.log(current);
}

// //登录失败时对页面的处理的函数
// function errHtml() {
//     //对名称显示进行修改
//     userNameShowDom = $('#userNameShow');
//     // console.log(userNameShowDom.length);
//     if (userNameShowDom.length != 0) {
//         // console.log(userNameShowDom.length);
//         userNameShowDom.html("<a href='index.html' style='color: white;'><b>未登录，请先登录</b></a>");
//     }

//     //对个人信息进行隐藏
//     uesrBodyShowDom = $('#uesrBodyShow');
//     // console.log(userNameShowDom.length);
//     if (uesrBodyShowDom.length != 0) {
//         // console.log(userNameShowDom.length);
//         uesrBodyShowDom.hide();
//     }
//     uesrFooterShowDom = $('#uesrFooterShow');
//     // console.log(userNameShowDom.length);
//     if (uesrFooterShowDom.length != 0) {
//         // console.log(userNameShowDom.length);
//         uesrFooterShowDom.hide();
//     }

// }

// //登陆成功时对页面的处理的函数
// function successHtml() {
//     var userNameShow = $.cookie("phone"),
//         userNameShowDom = $('#userNameShow');
//     // console.log(userNameShowDom.length);
//     if (userNameShowDom.length != 0) {
//         userNameShowDom.text("用户" + userNameShow);
//     }

//     //对个人信息进行展示
//     uesrBodyShowDom = $('#uesrBodyShow');
//     // console.log(userNameShowDom.length);
//     if (uesrBodyShowDom.length != 0) {
//         // console.log(userNameShowDom.length);
//         uesrBodyShowDom.show();
//     }
//     uesrFooterShowDom = $('#uesrFooterShow');
//     // console.log(userNameShowDom.length);
//     if (uesrFooterShowDom.length != 0) {
//         // console.log(userNameShowDom.length);
//         uesrFooterShowDom.show();
//     }
// }
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
//登陆检测函数
function loginCheck() {
    var cookie_id= getCookie("Authorization");
    $.ajax({
        url: "/apis/building/user/loginCheck?cookieId="+cookie_id,
        type: "get",
        // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        // data:{
        //     phone:phone,
        //     password:password
        // },
        success: function (message) {

            // meaaage 信息为什么会 undefined
            console.log("--- 开始message信息 ---");
            console.log(message);
            printDateNow();
            console.log("--- 结束message信息 ---");

            if (message.success == true) {
                loginStatue = "login";
                
                // bootbox.alert(message.loginPhone);
                //getTimeNow();
                //successHtml();
                //    window.document.location.href="a.html";

            } else {
                alert("登录失效，请重新登录");
                // bootbox.alert("未登录，请先登陆");
                //getTimeNow();
                //errHtml();
                window.document.location.href = "login.html";
            }

        },
        error: function () {
            alert("登陆失败");
            //getTimeNow();
            //errHtml();
            // console.log("这是失败的！");
        }
    });
}
//权限管理检测函数
function checkPermission() {
    var cookie_id= getCookie("Authorization");
    cookie_id = cookie_id + "_test";
    $.ajax({
        url: "/apis/building/user/checkPermission?cookieId="+cookie_id,
        type: "get",
        // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        // data:{
        //     phone:phone,
        //     password:password
        // },
        success: function (message) {
            console.log(cookie_id);
            console.log(message);
            if (message.success == true) {
                document.getElementById('admin_li').style.display = "";
                // bootbox.alert(message.loginPhone);
                //getTimeNow();
                //successHtml();
                //    window.document.location.href="a.html";
            } else {
                //alert("没有使用权限");
               
                // bootbox.alert("未登录，请先登陆");
                //getTimeNow();
                //errHtml();
            }

        },
        error: function () {
            //alert("系统出错");
            //getTimeNow();
            //errHtml();
            // console.log("这是失败的！");
        }
    });
}

//数据录入检测函数
function checkInputPermission() {
    var cookie_id= getCookie("Authorization");
    $.ajax({
        url: "/apis/building/user/checkInputPermission?cookieId="+cookie_id,
        type: "get",
        // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        // data:{
        //     phone:phone,
        //     password:password
        // },
        success: function (message) {
            console.log(message);
            if (message.success == true) {
                document.getElementById('admin_input').style.display = "";
                // bootbox.alert(message.loginPhone);
                //getTimeNow();
                //successHtml();
                //    window.document.location.href="a.html";
            } else {
                //alert("没有使用权限");
               
                // bootbox.alert("未登录，请先登陆");
                //getTimeNow();
                //errHtml();
            }

        },
        error: function () {
            //alert("系统出错");
            //getTimeNow();
            //errHtml();
            // console.log("这是失败的！");
        }
    });
}
//注销函数
function logout() {
    if (loginStatue == "login") {
        $.ajax({
            url: "/apis/building/session/logout",
            type: "get",
            // contentType: "application/json",  //post方法,参数在data里发送的话，不能带这句话，这个发送数据的格式设置，这个格式是txt格式，后端就识别不出来json格式的数据了，后端就接收不到数据。
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            // data:{
            //     phone:phone,
            //     password:password
            // },
            success: function (message) {
                console.log(message);
                if (message.success == true) {
                    loginStatue = "logout";
                    console.log("这是对的！" + loginStatue);
                    alert(message.successInfo,function(){
                        $.cookie("password", "");
                        window.location.reload();});//刷新当前页面.
                    // window.document.location.href = "index.html";

                } else {
                    console.log("这是错的！" + message.msgInfo);
                    alert(message.msgInfo);
                }

            },
            error: function () {
                alert("注销失败");
                // console.log("这是失败的！");
            }
        });
    }

}