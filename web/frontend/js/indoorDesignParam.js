//初始化
//根据传递过来的台站号获得省份、城市信息、经度、维度、海拔、气候区属信息
//默认站点的经度、维度、海拔和气候区
var stationId = window.location.href.split("=")[1]
if (stationId) {
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + theRequest['stationId'],
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            getprovince(message.stationinfo.province);
            citycontent(message.stationinfo.province,message.stationinfo.cityName);
            //$("#city option:selected").text(message.stationinfo.cityName);
            $('#number').val(message.stationinfo.stationId)
            sendInitRequest();
        },
        error: function() {
        }
    });
} else {
    getInitProvinceAndCity();
}

//获取省份信息
function getprovince(province) {
    $.ajax({
        url: "/apis/building/selectcity/getprovince",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#province').empty();
            for (var i = 0; i < message.provinceList.length; i++) {
                if(message.provinceList[i]==province){
                    $('#province').append('<option selected="selected">' + message.provinceList[i] + '</option>');
                }else{
                    $('#province').append('<option>' + message.provinceList[i] + '</option>');
                }
            }
        },
        error: function() {
        }
    });
}
//根据所选省份确定城市下拉菜单的内容
function citycontent(province,city) {
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + province,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#city').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    if(message.cityList[i]==city){
                         $('#city').append('<option selected="selected">' + message.cityList[i] + '</option>');
                     }else{
                         $('#city').append('<option>' + message.cityList[i] + '</option>');
                     }
                }
                //所选城市的站点信息                           
                numbercontent($("#city option:checked").text());
            }
        },
        error: function() {}
    });
}
//获取省份信息
function getInitProvinceAndCity(){
    $.ajax({
     url: "/apis/building/selectcity/getprovince",
     type: "get",
     contentType: "application/json",
     dataType: "json",
     success: function(message) {
         console.log(message);
         $('#province').empty();
         for (var i = 0; i < message.provinceList.length; i++) {
             $('#province').append('<option>' + message.provinceList[i] + '</option>');
         }
         //获取所选省份的城市信息2
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
                     //所选城市的站点信息
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
                                 sendInitRequest(); 
                             }
                         });
                 }
 
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
                alert("没有该站点信息")

            else {
                var m = '';
                for (var i = 0; i < message.stationList.length; i++) {
                    m += '<option  ' + ' value="' + message.stationList[i].cityName + '">';
                }
                console.log(m)
                $('#searchResult').empty();
                $('#searchResult').append(m);
            }
        },
        error: function() {}
    });


}

//通过输入的台站号查询获取数据
function getSearchInputNumberResult(keyword) {
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
                alert("没有该站点信息");

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

        },
        error: function() {}
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
                                        if(city.cityList[i]!=data.stationinfo.cityName)
                                        $('#city').append('<option>' + city.cityList[i] + '</option>');
                                    }
                                    $("#city option:selected").text(data.stationinfo.cityName)
                                    $("#province option:selected").text(data.stationinfo.province)
                                    $('#number').val(data.stationinfo.stationId)
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
                                if(city.cityList[i]!=message.stationinfo.cityName)
                                $('#city').append('<option>' + city.cityList[i] + '</option>');
                            }
                            $("#city option:selected").text(message.stationinfo.cityName)
                            $("#province option:selected").text(message.stationinfo.province)
                            $('#number').val(message.stationinfo.stationId)
                            //所选城市的站点信息                           
                            numbercontent($("#city option:checked").text());
                        }
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    }


}
//根据城市信息确定站点
function numbercontent(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#number').empty();
            $('#number').val(message.stationList)
        },
        error: function() {

        }
    });
}


//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    citycontent($("#province option:checked").text());
}
//城市切换
function citySelected() {
    //获取当前城市的站点信息
    //所选城市的站点信息                           
    numbercontent($("#city option:checked").text());
}

function sendInitRequest() {
    console.log("进来了")
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getIndoorDesignParam",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datainfo) {
         console.log(datainfo);
         var text = ""; 
         for(var i=0;i<datainfo.indoorDesign.length;i=i+4)
         {
            $("#designParamTable").find("tr").eq(i+1).find("td").eq(3).text(datainfo.indoorDesign[i].archLevel);
            $("#designParamTable").find("tr").eq(i+1).find("td").eq(4).text(datainfo.indoorDesign[i].tempRange);
            $("#designParamTable").find("tr").eq(i+1).find("td").eq(5).text(datainfo.indoorDesign[i].humiRange);
            $("#designParamTable").find("tr").eq(i+1).find("td").eq(6).text(datainfo.indoorDesign[i].windSpeed);

            $("#designParamTable").find("tr").eq(i+2).find("td").eq(0).text(datainfo.indoorDesign[i+1].archLevel);
            $("#designParamTable").find("tr").eq(i+2).find("td").eq(1).text(datainfo.indoorDesign[i+1].tempRange);
            $("#designParamTable").find("tr").eq(i+2).find("td").eq(2).text(datainfo.indoorDesign[i+1].humiRange);
            $("#designParamTable").find("tr").eq(i+2).find("td").eq(3).text(datainfo.indoorDesign[i+1].windSpeed);

            $("#designParamTable").find("tr").eq(i+3).find("td").eq(1).text(datainfo.indoorDesign[i+2].archLevel);
            $("#designParamTable").find("tr").eq(i+3).find("td").eq(2).text(datainfo.indoorDesign[i+2].tempRange);
            $("#designParamTable").find("tr").eq(i+3).find("td").eq(3).text(datainfo.indoorDesign[i+2].humiRange);
            $("#designParamTable").find("tr").eq(i+3).find("td").eq(4).text(datainfo.indoorDesign[i+2].windSpeed);

            $("#designParamTable").find("tr").eq(i+4).find("td").eq(0).text(datainfo.indoorDesign[i+3].archLevel);
            $("#designParamTable").find("tr").eq(i+4).find("td").eq(1).text(datainfo.indoorDesign[i+3].tempRange);
            $("#designParamTable").find("tr").eq(i+4).find("td").eq(2).text(datainfo.indoorDesign[i+3].humiRange);
            $("#designParamTable").find("tr").eq(i+4).find("td").eq(3).text(datainfo.indoorDesign[i+3].windSpeed);
         }
         
        },
        error: function() {

        }
    });
}