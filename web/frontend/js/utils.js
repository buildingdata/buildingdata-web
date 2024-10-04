document.write("<script src='../js/string.js'></script>");

var theRequest = new Object();

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
}
GetRequest();
function addSession(url,param){
	return url+'?stationId='+param;
}