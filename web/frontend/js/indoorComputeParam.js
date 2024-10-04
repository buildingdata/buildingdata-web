getstation();
sendInitRequest();
//获取省份信息
//getprovince();

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

            //$("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
            //$("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
            //$("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
            //$("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
            //$("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);

            //$("#province option:selected").text(message.stationinfo.province);
            getprovince(message.stationinfo.province);
            //console.log(2);
            citycontent(message.stationinfo.province,message.stationinfo.cityName);
            //$("#city option:selected").text(message.stationinfo.cityName);
            //$('#number').append('<option>' + message.stationinfo.stationId + '</option>');
            $('#number').val(message.stationinfo.stationId);

        },
        error: function() {

        }
    });
} else {

    getStationId('合肥')
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

//获取站点编号
function getStationId(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#number').empty();

            $('#number').val(message.stationList)
                //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            getstationinfo();
            //获取当前站点所选参数的数据

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
                                        $('#city').append('<option>' + city.cityList[i] + '</option>');
                                    }
                                    $("#city option:selected").text(data.stationinfo.cityName)
                                    $("#province option:selected").text(data.stationinfo.province)
                                    $('#number').val(data.stationinfo.stationId)
                                        //所选城市的站点信息                           
                                    numbercontent($("#city option:checked").text());
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
                        }
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    }


}

// //获取省份信息
// function getprovince() {

//     $.ajax({
//         url: "/apis/building/selectcity/getprovince",
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(message) {


//             $('#province').empty();
//             for (var i = 0; i < message.provinceList.length; i++) {
//                 $('#province').append('<option>' + message.provinceList[i] + '</option>');
//             }
//             //获取所选省份的城市信息
//             citycontent($("#province option:checked").text());
//         },
//         error: function() {

//         }
//     });
// }

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
            if (message.stationList.length > 0) {
                for (var i = 0; i < message.stationList.length; i++) {
                    $('#number').append('<option>' + message.stationList[i] + '</option>');
                }
            }
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            getstationinfo();
            //获取当前站点所选参数的数据

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
    var city = $("#city option:checked").text();
    getStationId(city)
    getstationinfo();

}
//站点切换
function numberSelected() {

}
//表头获取站点的经度、维度、海拔和气候区
function getstationinfo() {
    var number = document.getElementById('number').value
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            console.log(message.stationinfo.province);
            $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
            $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
            $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
            $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
            $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);
        },
        error: function() {

        }
    });
}

sendInitRequest();

function getstation() {
    $.ajax({
        url: "/apis/building/selectcity/getstations",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number').empty();
            for (var i = 0; i < message.stationList.length; i++) {
                $('#number').append('<option>' + message.stationList[i] + '</option>');
            }
        },
        error: function() {

        }
    });
}

function sendInitRequest() {
    $.ajax({
        url: "/apis/building/indoorparm/getIndoorComputeParamById?stationId=57036",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);

            //将后台台站信息导入前台表中
            for (var i = 0; i < message.indoorCompute.length; i++) {

                if (i % 3 == 0) {
                    $("#indoorComputeTable").find("tr").eq(1 + i).find("td").eq(2).text(message.indoorCompute[i].hotLowTemp + "~" + message.indoorCompute[i].hotHighTemp);
                    $("#indoorComputeTable").find("tr").eq(1 + i).find("td").eq(3).text(message.indoorCompute[i].coldLowTemp + "~" + message.indoorCompute[i].coldHighTemp);
                } else {
                    $("#indoorComputeTable").find("tr").eq(1 + i).find("td").eq(2 - 1).text(message.indoorCompute[i].hotLowTemp + "~" + message.indoorCompute[i].hotHighTemp);
                    $("#indoorComputeTable").find("tr").eq(1 + i).find("td").eq(3 - 1).text(message.indoorCompute[i].coldLowTemp + "~" + message.indoorCompute[i].coldHighTemp);
                }

            }



        },
        error: function() {

        }
    });
}

function getstation() {
    $.ajax({
        url: "/apis/building/selectcity/getstations",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number').empty();
            for (var i = 0; i < message.stationList.length; i++) {
                $('#number').append('<option>' + message.stationList[i] + '</option>');
            }
        },
        error: function() {

        }
    });
}