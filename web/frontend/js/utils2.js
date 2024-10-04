document.write("<script src='../js/string.js'></script>");
var theRequest = new Object();
/**
 * 
 * 给url添加sessionid
 */
function addSession(url, session, splitStr){
	return url;
}

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	if (url.indexOf("?") != -1) {
	  var str = url.substr(1);
	  strs = str.split("&");
	  for(var i = 0; i < strs.length; i ++) {
	     theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
	  }
	}
}

// 获取正则表达式参数
function getvl(url, name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};

//device样例：serverParames:values-returnUrl:domain?clientParams
function loginRedirect(){
	var paramStr=window.pwdString.decrypt(theRequest.device);
	var paramsArr = paramStr.split("-")
	var paramMap = [];
	for (var i = 0; i < paramsArr.length; i++) {
		var temp = paramsArr[i].split(":");
		paramMap[temp[0]]="";
		for (var i =1 ; i < temp.length; i++) {
			paramMap[temp[0]]+=(temp[i]+":")
		}
		paramMap[temp[0]]=paramMap[temp[0]].substring(0, paramMap[temp[0]].length-1)
	}
	var device = getvl(paramMap["returnUrl"], "device");
	if(device=="2"){
		wx.miniProgram.postMessage({ data: {sessionId: jsessionId} })
		wx.miniProgram.navigateBack({
          delta: 2
        })
	}else{
		// queryStr = queryStr+"jsessionid="+theRequest[	"jsessionid"];
		// console.log(paramMap["returnUrl"]+(paramMap["returnUrl"].indexOf("?") != -1? "&":"?"));
		// console.log(paramMap["returnUrl"]+(paramMap["returnUrl"].indexOf("?") != -1? "&":"?")+"jsessionid=");
		location.href=paramMap["returnUrl"];
		// location.href=paramMap["returnUrl"];
		// location.href=consoleIndex;
	}
}

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */  
function convertBase64UrlToBlob(urlData){  
      
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
      
    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);  
    var ia = new Uint8Array(ab);  
    for (var i = 0; i < bytes.length; i++) {  
        ia[i] = bytes.charCodeAt(i);  
    }  
  
    return new Blob( [ab] , {type : 'image/png'});  
} 

/**
 * 
 * 获取当前时间
 */
function p(s) {
    return s < 10 ? '0' + s: s;
}
function getCurDate(timestamp){
	var myDate = new Date();
	if(timestamp){
		myDate.setTime(timestamp);
	}
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate(); 
	// var h=myDate.getHours();       //获取当前小时数(0-23)
	// var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	// var s=myDate.getSeconds();  

	return year+'-'+p(month)+"-"+p(date);
}

/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
function dateFormat(format, timestamp){  
    var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date()); 
    var pad = function(n, c){ 
        if((n = n + "").length < c){ 
            return new Array(++c - n.length).join("0") + n; 
        } else { 
            return n; 
        } 
    }; 
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"}; 
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    var f = { 
        // Day 
        d: function(){return pad(f.j(), 2)}, 
        D: function(){return f.l().substr(0,3)}, 
        j: function(){return jsdate.getDate()}, 
        l: function(){return txt_weekdays[f.w()]}, 
        N: function(){return f.w() + 1}, 
        S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'}, 
        w: function(){return jsdate.getDay()}, 
        z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0}, 
        
        // Week 
        W: function(){ 
            var a = f.z(), b = 364 + f.L() - a; 
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1; 
            if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){ 
                return 1; 
            } else{ 
                if(a <= 2 && nd >= 4 && a >= (6 - nd)){ 
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31"); 
                    return date("W", Math.round(nd2.getTime()/1000)); 
                } else{ 
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0); 
                } 
            } 
        }, 
        
        // Month 
        F: function(){return txt_months[f.n()]}, 
        m: function(){return pad(f.n(), 2)}, 
        M: function(){return f.F().substr(0,3)}, 
        n: function(){return jsdate.getMonth() + 1}, 
        t: function(){ 
            var n; 
            if( (n = jsdate.getMonth() + 1) == 2 ){ 
                return 28 + f.L(); 
            } else{ 
                if( n & 1 && n < 8 || !(n & 1) && n > 7 ){ 
                    return 31; 
                } else{ 
                    return 30; 
                } 
            } 
        }, 
        
        // Year 
        L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0}, 
        //o not supported yet 
        Y: function(){return jsdate.getFullYear()}, 
        y: function(){return (jsdate.getFullYear() + "").slice(2)}, 
        
        // Time 
        a: function(){return jsdate.getHours() > 11 ? "pm" : "am"}, 
        A: function(){return f.a().toUpperCase()}, 
        B: function(){ 
            // peter paul koch: 
            var off = (jsdate.getTimezoneOffset() + 60)*60; 
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off; 
            var beat = Math.floor(theSeconds/86.4); 
            if (beat > 1000) beat -= 1000; 
            if (beat < 0) beat += 1000; 
            if ((String(beat)).length == 1) beat = "00"+beat; 
            if ((String(beat)).length == 2) beat = "0"+beat; 
            return beat; 
        }, 
        g: function(){return jsdate.getHours() % 12 || 12}, 
        G: function(){return jsdate.getHours()}, 
        h: function(){return pad(f.g(), 2)}, 
        H: function(){return pad(jsdate.getHours(), 2)}, 
        i: function(){return pad(jsdate.getMinutes(), 2)}, 
        s: function(){return pad(jsdate.getSeconds(), 2)}, 
        //u not supported yet 
        
        // Timezone 
        //e not supported yet 
        //I not supported yet 
        O: function(){ 
            var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4); 
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t; 
            return t; 
        }, 
        P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))}, 
        //T not supported yet 
        //Z not supported yet 
        
        // Full Date/Time 
        c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()}, 
        //r not supported yet 
        U: function(){return Math.round(jsdate.getTime()/1000)} 
    }; 
        
    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){ 
        if( t!=s ){ 
            // escaped 
            ret = s; 
        } else if( f[s] ){ 
            // a date function exists 
            ret = f[s](); 
        } else{ 
            // nothing special 
            ret = s; 
        } 
        return ret; 
    }); 
}

//取数组差集
$.arrayIntersect = function(a, b)
{
	return $.merge(
		$.grep(a, function(i){
			return $.inArray(i, b) == -1;
		}),
		$.grep(b, function(i)
		{
			return $.inArray(i, a) == -1;
		})
	);
}

$.ajaxSetup({
    cache: false,
    // xhrFields: {
    //     withCredentials: true
    // },
    crossDomain: true
});

