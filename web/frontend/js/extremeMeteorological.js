var type =  $("#selectparam option:selected").text();
//var stationId = $("#number").val();
var stationId = theRequest['stationId'];

// 初始化页面，显示空调负荷极端年一月一号的数据
function initialdata(type) {
    // stationId = $('#number').val();
    //console.log("刺激刺激真刺激")
    console.log(stationId)
    let tableareaAir = $("#tableareaAir");
    let day = $("#selectdayAir");
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var dayselected = $("#selectdayAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);

    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
   // console.log(datevale);
   console.log(1);
    $.ajax({
        url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + stationId+"&date="+dateval,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            console.log(datalist.extremList.length)
            if(datalist.extremList.length>0){
                for(let i=0;i<24;i++){
                    tableareaAir.append("<tr><td>"+month+"月"+"</td><td>"+dayselected+"日"+"</td><td>" + i + "点" + "</td><td>" + datalist.extremList[i].temperature + "</td><td>" + datalist.extremList[i].pressure + "</td><td>" + datalist.extremList[i].relHumidity + "</td><td>" + datalist.extremList[i].winDirection + "</td><td>" + datalist.extremList[i].winSpeed + "</td><td>" + datalist.extremList[i].dewTemperature + "</td><td>" + datalist.extremList[i].wetTemperature + "</td><td>" + datalist.extremList[i].th + "</td><td>" + datalist.extremList[i].df + "</td><td>" + datalist.extremList[i].nr + "</td></tr>");
                }
            }else {
                alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。");
            }

        },
        error: function() {
            alert("请求失败");
        }
    });
}
initialdata();

function alertData(){
    //alert(11111);
    $('#datainfo').attr('data-target', '#station-info');
}
function tableToExcel() {
    var month = $("#selectmonthAir option:selected").text();
    var dayselected = $("#selectdayAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);
    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
    if ($("#selectparam option:selected").text() == "空调负荷极端年") {
        //要导出的json数据
        stationId = $("#number").val();
        console.log(2);
        $.ajax({
            //url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + 53463+"&date="+dateval,
            url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + stationId+"&date="+dateval,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                if(message.extremList.length>0){
                    console.log(message);
                    //列标题，逗号隔开，每一个逗号就是隔开一个单元格
                    let str = `台站号,日期,时刻,经度,维度,海拔,温度,大气压,相对湿度,风向,风速,干球温度,湿球温度,水平面太阳总辐射（W/㎡）,水平面散射（W/㎡）,法向直射（W/㎡）\n`;
                    //增加\t为了不让表格显示科学计数法或者其他格式
                    for (let i = 0; i < 8760; i++) {
                        for (let item in message.extremList[i]) {
                            str += `${message.extremList[i][item] + '\t'},`;
                        }
                        str += '\n';
                    }
                    //encodeURIComponent解决中文乱码
                    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                    //通过创建a标签实现
                    let link = document.createElement("a");
                    link.href = uri;
                    //对下载的文件命名
                    link.download = "空调负荷极端气象年表格数据.csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }else {
                    alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。")
                }

            },
            error: function () {

            }
        });
    } else if ($("#selectparam option:selected").text() == "室内过热极端年") {
        //要导出的json数据
        $.ajax({
            url: "/apis/building/meteorological/getExtremInnerById?stationid=" + stationId+"&date="+dateval,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                if(message.extremList.length>0) {
                    console.log(message);
                    //列标题，逗号隔开，每一个逗号就是隔开一个单元格
                    let str = `台站号,日期,时刻,经度,维度,海拔,温度,大气压,相对湿度,风向,风速,干球温度,湿球温度,水平面太阳总辐射（W/㎡）,水平面散射（W/㎡）,法向直射（W/㎡）\n`;
                    //增加\t为了不让表格显示科学计数法或者其他格式
                    for (let i = 0; i < 8760; i++) {
                        for (let item in message.extremList[i]) {
                            str += `${message.extremList[i][item] + '\t'},`;
                        }
                        str += '\n';
                    }
                    //encodeURIComponent解决中文乱码
                    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                    //通过创建a标签实现
                    let link = document.createElement("a");
                    link.href = uri;
                    //对下载的文件命名
                    link.download = "室内过热极端年表格数据.csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }else {
                    alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。")
                }

            },
            error: function () {
            }
        });
    }
}



// 选择参数（空调负荷极端年、室内过热极端年）
function chooseParams() {
    stationId = $('#number').val();
    console.log(3);

    type = $("#selectparam option:selected").text()
    let url =  ""
    if(type=="空调负荷极端年") {url ="/apis/building/meteorological/getExtrmeAirById?stationid=" + stationId}
    else {url = "/apis/building/meteorological/getExtremInnerById?stationid="+ stationId}
    let day = $("#selectdayAir");
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var dayselected = $("#selectdayAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);
  
    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
    getTableInfo(url,dateval,month,dayselected);
}
//包括根据月份确定每个月的天数
function ChooseDateAir() {
    let day = $("#selectdayAir");
    let monthtext = $("#selectmonthAir option:selected").text()
    let typeText = $("#selectparam option:selected").text();
    let dayselected = "1日"
    $('#selectdayAir').empty(); 
   if (monthtext == "1月" || monthtext == "3月" || monthtext == "5月" || monthtext == "7月" || monthtext == "8月" || monthtext == "10月" || monthtext == "12月") {      
    for (let i = 1; i <= 31; i++) {       
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
        $("#selectdayAir option:selected").text("1日");
    }
    else if(monthtext == "4月" || monthtext == "6月" || monthtext == "9月" || monthtext == "11月") {    
       
        for (let i = 1; i <= 30; i++) {      
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
        $("#selectdayAir option:selected").text("1日");
    }
    else if(monthtext=="2月"){  
      
        for (let i = 1; i <= 28; i++) {       
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
        $("#selectdayAir option:selected").text("1日");
    }
        var month = $("#selectmonthAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);
 
    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
    let url =  ""
    stationId = $('#number').val();
    console.log(4);
    if(typeText=="空调负荷极端年") {url ="/apis/building/meteorological/getExtrmeAirById?stationid=" + stationId}
    else {url = "/apis/building/meteorological/getExtremInnerById?stationid="+ stationId}
   
    getTableInfo(url,dateval,month,dayselected);
}

function chooseDayAir(){
    stationId = $('#number').val();
    let typeText = $("#selectparam option:selected").text();
    let url =  ""
    if(typeText=="空调负荷极端年") {url ="/apis/building/meteorological/getExtrmeAirById?stationid=" + stationId}
    else {url = "/apis/building/meteorological/getExtremInnerById?stationid="+ stationId}
    var month = $("#selectmonthAir option:selected").text();
    var dayselected = $("#selectdayAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);

    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
        getTableInfo(url,dateval,month,dayselected);
    }
function getTableInfo(url,dateval,month,dayselected){
    let tableareaAir = $("#tableareaAir"); 
  $.ajax({
      url: url+"&date="+dateval,
      type: "get",
      contentType: "application/json",
      dataType: "json",
      success: function(datalist) {
          if (datalist.extremList.length>0){
              console.log(datalist)
              let i=2;
              for(let j=0;j<24;j++){
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(0).text(month+"月");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(1).text(dayselected+"日");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(2).text(datalist.extremList[j].time+ "点");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(3).text(datalist.extremList[j].pressure);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(4).text(datalist.extremList[j].relativeSolid);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(5).text(datalist.extremList[j].windDirection);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(6).text(datalist.extremList[j].windSpeed);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(7).text(datalist.extremList[j].dryTemper);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(8).text(datalist.extremList[j].pointTemper);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(9).text(datalist.extremList[j].sunSumRadiation);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(10).text(datalist.extremList[j].scatterRadiation);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(11).text(datalist.extremList[j].directRadiation);
                  i++;
              }
          }else {
              $("#tableareaAir").hide()

          }




      },
      error: function() {
          alert("请求失败");
      }
  });
}




var province;
$.ajax({
     url: "/apis/building/selectcity/getstationinfo?stationid=" + theRequest['stationId'],
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                province = message.stationinfo.province;
            },
            error: function() {
            }
});
//获取省份信息
$.ajax({
    url: "/apis/building/selectcity/getprovince",
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(message) {
        console.log(message);
        $('#province').empty();
        for (var i = 0; i < message.provinceList.length; i++) {
            if(message.provinceList[i]==province){
                  $('#province').append('<option selected="selected">' + message.provinceList[i] + '</option>');
            }else{
                  $('#province').append('<option>' + message.provinceList[i] + '</option>');
                  }
        }
        //获取所选省份的城市信息
        $.ajax({
            url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                console.log(message);
                $('#city').empty();
                if (message.cityList.length > 0) {

                    for (var i = 0; i < message.cityList.length; i++) {
                        $('#city').append('<option>' + message.cityList[i] + '</option>');
                    }

                    var stationId = window.location.href.split("=")[1]
                    if (!stationId){
                        stationId = 58321
                    }
                    //默认站点的经度、维度、海拔和气候区
                    if (theRequest['stationId']) {
                        $.ajax({
                            url: "/apis/building/selectcity/getstationinfo?stationid=" + stationId,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(message) {
                                var latitude1 = message.stationinfo.latitude
                                latitude1 = latitude1.toFixed(2)
                                var longitude1 = message.stationinfo.longitude
                                longitude1 = longitude1.toFixed(2)
                                $('#longitude').val(longitude1);
                                $('#latitude').val(latitude1);
                                $('#altitude').val(message.stationinfo.altitude);
                                $('#climates').val(message.stationinfo.climates);
                                $("#province option:selected").text(message.stationinfo.province);
                                $("#city option:selected").text(message.stationinfo.cityName);
                                $('#number').val(message.stationinfo.stationId);



                                getData(stationId)

                            },
                            error: function() {

                            }
                        });
                    }
                    //所选城市的站点信息
                    else {
                        $.ajax({
                            url: "/apis/building/selectcity/getstations?city=" + $("#city option:checked").text(),
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(message) {
                                console.log(message);
                                $('#number').empty();
                                if (message.stationList.length > 0) {

                                    $('#number').val(message.stationList[0]);

                                }

                                //站点的经度、维度、海拔和气候区
                                $.ajax({
                                    url: "/apis/building/selectcity/getstationinfo?stationid=" + stationId,
                                    type: "get",
                                    contentType: "application/json",
                                    dataType: "json",
                                    success: function(message) {
                                        var latitude1 = message.stationinfo.latitude
                                        latitude1 = latitude1.toFixed(2)
                                        var longitude1 = message.stationinfo.longitude
                                        longitude1 = longitude1.toFixed(2)
                                        $('#longitude').val(longitude1);
                                        $('#latitude').val(latitude1);
                                        $('#altitude').val(message.stationinfo.altitude);
                                        $('#climates').val(message.stationinfo.climates)




                                        getData(stationId)
                                    },
                                    error: function() {

                                    }
                                });
                            },
                            error: function() {

                            }
                        });
                    }


                }

            },
            error: function() {

            }
        });
    },
    error: function() {

    }
});

//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#city').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    $('#city').append('<option>' + message.cityList[i] + '</option>');
                }
                //获取当前城市的站点信息
                $.ajax({
                    url: "/apis/building/selectcity/getstations?city=" + $("#city option:checked").text(),
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(message) {
                        console.log(message);
                        $('#number').empty();
                        if (message.stationList.length > 0) {

                            $('#number').val(message.stationList[0]);

                        }
                        //站点的经度、维度、海拔和气候区
                        $.ajax({
                            url: "/apis/building/selectcity/getstationinfo?stationid=" + document.getElementById('number').value,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(message) {
                                var latitude1 = message.stationinfo.latitude
                                latitude1 = latitude1.toFixed(2)
                                var longitude1 = message.stationinfo.longitude
                                longitude1 = longitude1.toFixed(2)
                                $('#longitude').val(longitude1);
                                $('#latitude').val(latitude1);
                                $('#altitude').val(message.stationinfo.altitude);
                                $('#climates').val(message.stationinfo.climates)




                                getData(document.getElementById('number').value)
                            },
                            error: function() {

                            }
                        });
                    },
                    error: function() {

                    }
                });
            }

        },
        error: function() {

        }
    });
}
//城市切换
function citySelected() {
    //获取当前城市的站点信息
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + $("#city option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number').empty();
            if (message.stationList.length > 0) {

                $('#number').val(message.stationList[0]);

            }
            //站点的经度、维度、海拔和气候区
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + document.getElementById('number').value,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(message) {
                    var latitude1 = message.stationinfo.latitude
                    latitude1 = latitude1.toFixed(2)
                    var longitude1 = message.stationinfo.longitude
                    longitude1 = longitude1.toFixed(2)
                    $('#longitude').val(longitude1);
                    $('#latitude').val(latitude1);
                    $('#altitude').val(message.stationinfo.altitude);
                    $('#climates').val(message.stationinfo.climates)








                    getData(document.getElementById('number').value)
                },
                error: function() {

                }
            });
        },
        error: function() {

        }
    });
}

// 通过输入的城市名/台站号模糊搜索
var searchItem = '';
$('#search').on('input propertychange', function() {
    var _v = $(this).val();
    console.log(_v);
    var input_reg1 = /^[\u4E00-\u9FA5]+$/;
    var input_reg2 = /^\d{3,5}$/;
    $('#search').empty();
    if (_v.match(input_reg1)) {
        searchItem = _v;
        getSearchInputResult(searchItem);
    } else if (_v.match(input_reg2)) {
        searchItem = _v;
        getSearchInputNumberResult(searchItem);
    }
});

//通过输入查询城市名获取数据
function getSearchInputResult(keyword) {
    console.log(keyword);
    $.ajax({
        url: "/apis/building/selectcity/getstation?city=" + keyword,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            if (message.stationList.length == 0)
                alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。")

            else {
                var m = '';
                for (var i = 0; i < message.stationList.length; i++) {
                    m += '<option  ' + ' value="' + message.stationList[i].cityName + '">';
                }
                console.log(m)
                $('#searchResult').empty();
                $('#searchResult').append(m);
            }
            //console.log("崩溃")
            console.log(document.getElementById('number').value)
            //getData(document.getElementById('number').value)
        },
        error: function() {
            //console.log("崩溃来了")
        }
    });


}

//通过输入的台站号查询获取数据
function getSearchInputNumberResult(keyword){
    // console.log('keyword' + keyword);
    $.ajax({
        url: "/apis/building/selectcity/getstationviaid?stationid=" + keyword,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log('getstationviaid接口');
            console.log(message.stationListId);
            if (message.stationListId.length == 0)
                alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。");

            else {
                var m = '';
                for (var i = 0; i < message.stationListId.length; i++) {
                    m += '<option  ' + ' value="' + message.stationListId[i].stationId + '">';
                }
                $('#searchResult').empty();
                $('#searchResult').append(m);
            }
            console.log('这里');
            console.log(message.stationListId);





            getData(document.getElementById('number').value)

        },
        error: function() {

        }
    });
}


function getFuzyResult() {
    var input_reg1 = /^[\u4E00-\u9FA5\（\）]+$/;
    var input_reg2 = /^\d{3,5}$/;
    var searchContent = document.getElementById('search').value;
    if (searchContent.match(input_reg1)) {
        $.ajax({
            url: "/apis/building/selectcity/getstations?city=" + searchContent,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                // console.log(message);
                $.ajax({
                    url: "/apis/building/selectcity/getstationinfo?stationid=" + message.stationList,
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(data) {
                        $.ajax({
                            url: "/apis/building/selectcity/getcitys?province=" + data.stationinfo.province,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(city) {
                                $('#city').empty();
                                if (city.cityList.length > 0) {
                                    for (var i = 0; i < city.cityList.length; i++) {
                                        $('#city').append('<option>' + city.cityList[i] + '</option>');
                                    }
                                    $("#city option:selected").text(data.stationinfo.cityName)
                                    $("#province option:selected").text(data.stationinfo.province)
                                    $('#number').val(data.stationinfo.stationId)
                                    //所选城市的站点信息
                                    numbercontent($("#city option:checked").text());





                                    getData(document.getElementById('number').value)
                                }
                            },
                            error: function() {}
                        });
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    } else if (searchContent.match(input_reg2)) {
        $.ajax({
            url: "/apis/building/selectcity/getstationinfo?stationid=" + searchContent,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                $.ajax({
                    url: "/apis/building/selectcity/getcitys?province=" + message.stationinfo.province,
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(city) {
                        console.log('这：' + message.stationinfo.province);
                        $('#city').empty();
                        if (city.cityList.length > 0) {
                            for (var i = 0; i < city.cityList.length; i++) {
                                $('#city').append('<option>' + city.cityList[i] + '</option>');
                            }
                            $("#city option:selected").text(message.stationinfo.cityName)
                            $("#province option:selected").text(message.stationinfo.province)
                            $('#number').val(message.stationinfo.stationId)
                            //所选城市的站点信息
                            numbercontent($("#city option:checked").text());




                            getData(document.getElementById('number').value)
                        }
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    }


}

function numbercontent(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#number').empty();
            $('#number').val(message.stationList)
            if (message.stationList.length > 0) {
                for (var i = 0; i < message.stationList.length; i++) {
                    $('#number').append('<option>' + message.stationList[i] + '</option>');
                }
            }
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            //站点的经度、维度、海拔和气候区
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + message.stationList,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(message) {
                    var latitude1 = message.stationinfo.latitude
                    latitude1 = latitude1.toFixed(2)
                    var longitude1 = message.stationinfo.longitude
                    longitude1 = longitude1.toFixed(2)
                    $('#longitude').val(longitude1);
                    $('#latitude').val(latitude1);
                    $('#altitude').val(message.stationinfo.altitude);
                    $('#climates').val(message.stationinfo.climates);
                },
                error: function() {

                }
            });
            //获取当前站点所选参数的数据

        },
        error: function() {

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



function getData(id){
    $('#selectdayAir').empty();
    let day = $("#selectdayAir");
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var dayselected = $("#selectdayAir option:selected").text();
    month = String(month).slice(0,month.length-1);
    dayselected = String(dayselected).slice(0,dayselected.length-1);

    let dateval = "";

    if (parseInt(month) < 10 && parseInt(dayselected) < 10) {
        dateval = 1999 + "-0" + month + "-0" + dayselected;
    } else if (parseInt(month) < 10) {
        dateval = 1999 + "-0" + month + "-" + dayselected;
    } else if (parseInt(dayselected) < 10) {
        dateval = 1999 + "-" + month + "-0" + dayselected;
    } else {
        dateval = 1999 + "-" + month + "-" + dayselected;
    }
    console.log(6);
    $.ajax({
        url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + id +"&date="+dateval,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            if (datalist.extremList.length>0){
                $("#tableareaAir").show()
                //console.log("挺好")
                console.log(datalist.extremList)
                let i=2;
                for(let j=0;j<24;j++){
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(0).text(month+"月");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(1).text(dayselected+"日");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(2).text(datalist.extremList[j].time+ "点");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(3).text(datalist.extremList[j].pressure);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(4).text(datalist.extremList[j].dryTemp);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(5).text(datalist.extremList[j].pointTemper);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(6).text(datalist.extremList[j].relativeHumidity);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(7).text(datalist.extremList[j].sunSumRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(8).text(datalist.extremList[j].directRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(9).text(datalist.extremList[j].wetTemperature);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(10).text(datalist.extremList[j].scatterRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(11).text(datalist.extremList[j].cloudiness);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(12).text(datalist.extremList[j].winSpeed);

                    i++;
                }

            }else {
                $("#tableareaAir").hide()

            }

        },
        error: function() {
            alert("请求失败");
        }
    });

}


