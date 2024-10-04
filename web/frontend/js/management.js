//ajax加载notice
function getUserByPhone() {
    $("#noticeTable  tr:not(:first)").empty("");
    var phoneNum = $('#search').val();
        url = "/apis/building/user/getUserByPhone?phoneNum="+phoneNum;
        $.ajax({
            url : url,
            type : "get",
            dateType : "text",
            success : function(message) {
                if (message.success ==true) {
                    loadNotice(message.res); //加载notice   
                }else{
                    alert("手机号错误");
                }
                              
            },
            error: function (message) {
                alert("页面出错，请刷新重试");
            }
        });
    }
 
    //加载notice
    function loadNotice(res) {
        var tBody = $("#noticeTable").find("tbody");
        var phoneNum = res.phoneNum;
            //新建一行
            var newTr = $("<tr></tr>");
            //新建节点
            var news1 = $("<td></td>");
            var news2 = $("<td></td>");
            var news3 = $("<td></td>");
            var news4 = $("<td></td>");
            var news5 = $("<td></td>");
            var news6 = $("<button class='btn btn-default' type='submit' onclick='updateUserRole("+phoneNum+")'>修改身份</button>");
            //新建超链接
            var newsA = $("<a></a>");
 
            //添加内容和时间
            var userName = res.userName;
            
            var city = res.city;
            var industry = res.industry;
            var role = res.role;
            if (role == '0') {
                role = "普通用户";
            }else if (role == '1') {
                role = "管理员";
            }else if (role == '2') {
                role = "超级管理员";
            }
            /* alert(noticeTitle);
            alert(noticeDate); */
            news1.text(userName);
            news2.text(phoneNum);
            news3.text(city);
            news4.text(industry);
            news5.text(role);
            //添加数据td-tr-tbody
            newTr.append(news1);
            newTr.append(news2);
            newTr.append(news3);
            newTr.append(news4);
            newTr.append(news5);
            newTr.append(news6);
            tBody.append(newTr);
        
}
function updateUserRole(phoneNum){
    url = "/apis/building/user/updateUserRole?phoneNum="+phoneNum;
    $.ajax({
            url : url,
            type : "get",
            dateType : "text",
            success : function(message) {
                if (message.success ==true) {
                    alert("修改成功");
                }else{
                    alert("修改错误,请稍后尝试");
                }
                              
            },
            error: function (message) {
                alert("页面出错，请刷新重试");
            }
        });
}

function logout(){
    $.ajax({
        url:"/apis/building/user/logout",
        type:"get",
        contentType:"application/json",
        dataType:"json",
        success:function(message){
            if (message.success == true) {
               alert("退出成功");
               window.document.location.href = "login.html"
                
                //    window.document.location.href="a.html";

            } else {
                console.log("请求出错！");
                alert(message.loginstatue);

            }
            
        }
    })
}