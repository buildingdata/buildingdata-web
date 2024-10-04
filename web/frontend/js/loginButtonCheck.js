$(document).ready(function () {
    loginButtonCheck();
});
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
function loginButtonCheck() {
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
            console.log(message);
            if (message.success == true) {
                loginStatue = "login";
                if (document.getElementById('login')!=null) {
                    document.getElementById('login').style.display = "none";
                }
                // bootbox.alert(message.loginPhone);
                //getTimeNow();
                //successHtml();
                //    window.document.location.href="a.html";

            } else {
                // bootbox.alert("未登录，请先登陆");
                //getTimeNow();
                //errHtml();
            }

        },
        error: function () {
            //alert("系统出错，请稍后访问");
            //getTimeNow();
            //errHtml();
            // console.log("这是失败的！");
        }
    });
}