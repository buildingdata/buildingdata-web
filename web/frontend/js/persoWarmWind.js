//获取省份信息
//getprovince();
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
showParamType();



//初始化
//根据传递过来的台站号获得省份、城市信息、经度、维度、海拔、气候区属信息
//默认站点的经度、维度、海拔和气候区
var stationId = window.location.href.split("=")[1]
console.log(stationId);
if (stationId) {
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + theRequest['stationId'],
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            var latitude1 = message.stationinfo.latitude
            latitude1 = latitude1.toFixed(2)
            var longitude1 = message.stationinfo.longitude
            longitude1 = longitude1.toFixed(2)
            $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
            $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
            $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
            $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(longitude1);
            $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(latitude1);
            getprovince(message.stationinfo.province);
            citycontent(message.stationinfo.province,message.stationinfo.cityName);
            $('#number').val(message.stationinfo.stationId);
            showParamType();
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
            showParamType();
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
            }else{
                
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
            showParamType();
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
    showParamType();
}
//站点切换
function numberSelected() {

}
//表头获取站点的经度、维度、海拔和气候区
function getstationinfo() {
    var number = document.getElementById("number").value

    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            stationinfo = message;
        },
        error: function() {

        }
    });
}
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
function showParamType() {
    var val = $("#paramtype option:checked").text();
    console.log(val);
    if (val == '多不保证率及多参数组合的室外计算参数') {
        $('#Industrial-building-param').hide();
        $('#moreCombination').show();
        $('#param2type').hide();
        $('#winterSummerTypical').hide();
        $('#normParam').hide();
        $('#SameTimeParamcontainer').hide();
        $('#SummerNewWindAddList').hide();
        $('#typename').text('多不保证率及多参数组合的室外计算参数');
        $('#datainfo').attr('data-target', '#moreCombination-info');
        getMoreCombination(); //从后台获取多不保证率及多参数组合的室外计算参数表的参数并展示在表格中
    } else if (val == '冬夏季典型设计气象日参数') {
        $('#moreCombination').hide();
        $('#Industrial-building-param').hide();
        $('#normParam').hide();
        $('#SummerNewWindAddList').hide();
        $('#winterSummerTypical').show();
        $('#SameTimeParamcontainer').hide();
        $('#param2type').show();
        showParamType2();
    } else if (val == '同时发生室外计算参数') {
        $('#normParam').hide();
        $('#moreCombination').hide();
        $('#Industrial-building-param').hide();
        $('#param2type').hide();
        $('#winterSummerTypical').hide();
        $('#SummerNewWindAddList').hide();
        $('#SameTimeParamcontainer').show();
        $('#typename').text('同时发生室外计算参数（数据正在加载中，请稍后。）');
        $('#datainfo').attr('data-target', '#SameTimeParam-info');
        getSimulParam();
    }
}

function showParamType2() {
    var val2 = $("#param2type option:checked").text();
    if (val2 == '冬季供暖室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-冬季供暖室外计算参数');
        $('#datainfo').attr('data-target', '#typical-winterWarm-info');
        $('#typical-winterWarm').show();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').hide();
        getWinterWarm();
    } else if (val2 == '冬季空调室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-冬季空调室外计算参数');
        $('#datainfo').attr('data-target', '#typical-wsAirConditioner-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').show();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').hide();
        getWinterAir();
    } else if (val2 == '夏季空调室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-夏季空调室外计算参数');
        $('#datainfo').attr('data-target', '#typical-summerAirConditioner-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').show();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').hide();
        getSummerAir();
    } else if (val2 == '夏季除湿室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-夏季除湿室外计算参数');
        $('#datainfo').attr('data-target', '#typical-summerDeHumidity-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').show();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').hide();
        getsummernNoHumidity();
    } else if (val2 == '冬季加湿室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-冬季加湿室外计算参数');
        $('#datainfo').attr('data-target', '#typical-winterAddHumidity-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').show();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').hide();
        getwinterAddHumidity();
    } else if (val2 == '夏季新风计算室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-夏季新风计算室外计算参数');
        $('#datainfo').attr('data-target', '#typical-summerNewWind-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').show();
        $('#typical-winterNewWind').hide();
        getSummerNewWind();
    } else if (val2 == '冬季新风计算室外计算参数') {
        $('#typename').text('冬夏季典型设计气象日参数-冬季新风计算室外计算参数');
        $('#datainfo').attr('data-target', '#typical-winterNewWind-info');
        $('#typical-winterWarm').hide();
        $('#typical-wsAirConditioner').hide();
        $('#typical-summerAirConditioner').hide();
        $('#typical-summerDeHumidity').hide();
        $('#typical-winterAddHumidity').hide();
        $('#typical-summerNewWind').hide();
        $('#typical-winterNewWind').show();
        getWinterNewWind();
    }
}
//参数下拉列表改变时
function selChange() {
    showParamType();
}

function selChange2() {
    showParamType2();
}
//根据当前选择参数请求对应模块的数据
function getParamData() {
    var value = $("#paramtype option:checked").text();
    if (value == '多不保证率及多参数组合的室外计算参数') {
        $('#datainfo').attr('data-target', '#moreCombination-info');
        getMoreCombination()
    } else if (value == '冬夏季典型设计气象日参数') {
        var val2 = $("#param2type option:checked").text();
        if (val2 == '冬季供暖室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-winterWarm-info');
            getWinterWarm();
        } else if (val2 == '冬季空调室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-wsAirConditioner-info');
            getWinterAir();

        } else if (val2 == '夏季空调室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-summerAirConditioner-info');
            getSummerAir();
        } else if (val2 == '夏季除湿室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-summerDeHumidity-info');
            getsummernNoHumidity();
        } else if (val2 == '冬季加湿室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-winterAddHumidity-info');
            getwinterAddHumidity();
        } else if (val2 == '夏季新风计算室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-summerNewWind-info');
            getSummerNewWind();
        } else if (val2 == '冬季新风计算室外计算参数') {
            $('#datainfo').attr('data-target', '#typical-winterNewWind-info');
            getWinterNewWind();
        }
    }
}
//多不保证率及多参数组合的室外计算参数
function getMoreCombination() {
    console.log($("#number option:checked").text());
    var number = document.getElementById('number').value
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datainfo) {
            console.log(datainfo);
            $.ajax({
                url: "/apis/building/outdoorparm/getocpMulgrpcById?id=" +  document.getElementById('number').value,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(message) {
                    console.log(message);
                    if (message.ocpMulgrpcInfo==null){
                        $("#moreCombination").hide();
                        alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                    }else {
                        $("#moreCombination").show();
                        $("#moreCombination").find("tr").eq(0).find("td").eq(1).text(datainfo.stationinfo.cityName);
                        $("#moreCombination").find("tr").eq(1).find("td").eq(1).text(datainfo.stationinfo.province);
                        $("#moreCombination").find("tr").eq(2).find("td").eq(1).text(datainfo.stationinfo.climates);
                        $("#moreCombination").find("tr").eq(4).find("td").eq(4).text(message.ocpMulgrpcInfo.temperWinAirCt6Hours);
                        $("#moreCombination").find("tr").eq(5).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinAirCt24Hours);
                        $("#moreCombination").find("tr").eq(6).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinAirCt48Hours);
                        $("#moreCombination").find("tr").eq(7).find("td").eq(3).text(message.ocpMulgrpcInfo.temperWinHeatingCt1Days);
                        $("#moreCombination").find("tr").eq(8).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinHeatingCt5Days);
                        $("#moreCombination").find("tr").eq(9).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinHeatingCt10Days);
                        $("#moreCombination").find("tr").eq(10).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCdat1Days);
                        $("#moreCombination").find("tr").eq(11).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCdat5Days);
                        $("#moreCombination").find("tr").eq(12).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCdat10Days);
                        $("#moreCombination").find("tr").eq(13).find("td").eq(4).text(message.ocpMulgrpcInfo.temperSumAirCt10HoursDry);
                        $("#moreCombination").find("tr").eq(14).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt10HoursWet);
                        $("#moreCombination").find("tr").eq(15).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCt50HoursDry);
                        $("#moreCombination").find("tr").eq(16).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt50HoursWet);
                        $("#moreCombination").find("tr").eq(17).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCt100HoursDry);
                        $("#moreCombination").find("tr").eq(18).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt100HoursWet);
                        $("#moreCombination").find("tr").eq(19).find("td").eq(5).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursMoi);
                        $("#moreCombination").find("tr").eq(20).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursDry);
                        $("#moreCombination").find("tr").eq(21).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursRela);
                        $("#moreCombination").find("tr").eq(22).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursMoi);
                        $("#moreCombination").find("tr").eq(23).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursDry);
                        $("#moreCombination").find("tr").eq(24).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursRela);
                        $("#moreCombination").find("tr").eq(25).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursMoi);
                        $("#moreCombination").find("tr").eq(26).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursDry);
                        $("#moreCombination").find("tr").eq(27).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursRela);
                        $("#moreCombination").find("tr").eq(28).find("td").eq(4).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursMoi);
                        $("#moreCombination").find("tr").eq(29).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursDry);
                        $("#moreCombination").find("tr").eq(30).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursRela);
                        $("#moreCombination").find("tr").eq(31).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursMoi);
                        $("#moreCombination").find("tr").eq(32).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursDry);
                        $("#moreCombination").find("tr").eq(33).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursRela);
                        $("#moreCombination").find("tr").eq(34).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursMoi);
                        $("#moreCombination").find("tr").eq(35).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursDry);
                        $("#moreCombination").find("tr").eq(36).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursRela);
                        $("#moreCombination").find("tr").eq(37).find("td").eq(5).text(message.ocpMulgrpcInfo.enthalpySumFreshCe10HoursEnt);
                        $("#moreCombination").find("tr").eq(38).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe10HoursDry);
                        $("#moreCombination").find("tr").eq(39).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpySumFreshCe50HoursEnt);
                        $("#moreCombination").find("tr").eq(40).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe50HoursDry);
                        $("#moreCombination").find("tr").eq(41).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpySumFreshCe100HoursEnt);
                        $("#moreCombination").find("tr").eq(42).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe100HoursDry);
                        $("#moreCombination").find("tr").eq(43).find("td").eq(4).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe10HoursEnt);
                        $("#moreCombination").find("tr").eq(44).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe10HoursDry);
                        $("#moreCombination").find("tr").eq(45).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe50HoursEnt);
                        $("#moreCombination").find("tr").eq(46).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe50HoursDry);
                        $("#moreCombination").find("tr").eq(47).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe100HoursEnt);
                        $("#moreCombination").find("tr").eq(48).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe100HoursDry);
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
//冬季供暖室外计算参数
function getWinterWarm() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/winterSummerTypical/gettypWinHeatById?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.avgOnedayTemperList.length==0) {
                $("#typical-winterWarm tr").html('');
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
            }else{


            var text1 = '<tr><td rowspan="28" ><div style="writing-mode: tb-rl;">冬季供暖室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td>累年平均每年不保证1天</td><td>累年平均每年不保证5天</td><td>累年平均每年不保证10天</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">干球温度逐时变化系数</td></tr>',
                text2 = '<tr><td rowspan="2">日较差</td><td colspan="3">干球温度（℃）</td></tr>',
                text3 = "<tr><td>" + message.typWinHeatParamInfo.param1 + "</td><td>" + message.typWinHeatParamInfo.param2 + "</td><td>" + message.typWinHeatParamInfo.param3 + "</td>",
                text4 = '<tr><td>计算参数</td><td colspan="3">干球温度（℃）</td></tr>',
                text5 = '<tr><td>0</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.avgOnedayTemperList[0].t1 + '</td><td>' + message.avgFivedayTemperList[0].t1 + '</td><td>' + message.avgTendayTemperList[0].t1 + '</td><td>' + message.drybulbTemperList[0].t1 + '</td></tr>',
                text6 = '<tr><td>1</td><td>' + message.avgOnedayTemperList[0].t2 + '</td><td>' + message.avgFivedayTemperList[0].t2 + '</td><td>' + message.avgTendayTemperList[0].t2 + '</td><td>' + message.drybulbTemperList[0].t2 + '</td></tr>',
                text7 = '<tr><td>2</td><td>' + message.avgOnedayTemperList[0].t3 + '</td><td>' + message.avgFivedayTemperList[0].t3 + '</td><td>' + message.avgTendayTemperList[0].t3 + '</td><td>' + message.drybulbTemperList[0].t3 + '</td></tr>',
                text8 = '<tr><td>3</td><td>' + message.avgOnedayTemperList[0].t4 + '</td><td>' + message.avgFivedayTemperList[0].t4 + '</td><td>' + message.avgTendayTemperList[0].t4 + '</td><td>' + message.drybulbTemperList[0].t4 + '</td></tr>',
                text9 = '<tr><td>4</td><td>' + message.avgOnedayTemperList[0].t5 + '</td><td>' + message.avgFivedayTemperList[0].t5 + '</td><td>' + message.avgTendayTemperList[0].t5 + '</td><td>' + message.drybulbTemperList[0].t5 + '</td></tr>',
                text10 = '<tr><td>5</td><td>' + message.avgOnedayTemperList[0].t6 + '</td><td>' + message.avgFivedayTemperList[0].t6 + '</td><td>' + message.avgTendayTemperList[0].t6 + '</td><td>' + message.drybulbTemperList[0].t6 + '</td></tr>',
                text11 = '<tr><td>6</td><td>' + message.avgOnedayTemperList[0].t7 + '</td><td>' + message.avgFivedayTemperList[0].t7 + '</td><td>' + message.avgTendayTemperList[0].t7 + '</td><td>' + message.drybulbTemperList[0].t7 + '</td></tr>',
                text12 = '<tr><td>7</td><td>' + message.avgOnedayTemperList[0].t8 + '</td><td>' + message.avgFivedayTemperList[0].t8 + '</td><td>' + message.avgTendayTemperList[0].t8 + '</td><td>' + message.drybulbTemperList[0].t8 + '</td></tr>',
                text13 = '<tr><td>8</td><td>' + message.avgOnedayTemperList[0].t9 + '</td><td>' + message.avgFivedayTemperList[0].t9 + '</td><td>' + message.avgTendayTemperList[0].t9 + '</td><td>' + message.drybulbTemperList[0].t9 + '</td></tr>',
                text14 = '<tr><td>9</td><td>' + message.avgOnedayTemperList[0].t10 + '</td><td>' + message.avgFivedayTemperList[0].t10 + '</td><td>' + message.avgTendayTemperList[0].t10 + '</td><td>' + message.drybulbTemperList[0].t10 + '</td></tr>',
                text15 = '<tr><td>10</td><td>' + message.avgOnedayTemperList[0].t11 + '</td><td>' + message.avgFivedayTemperList[0].t11 + '</td><td>' + message.avgTendayTemperList[0].t11 + '</td><td>' + message.drybulbTemperList[0].t11 + '</td></tr>',
                text16 = '<tr><td>11</td><td>' + message.avgOnedayTemperList[0].t12 + '</td><td>' + message.avgFivedayTemperList[0].t12 + '</td><td>' + message.avgTendayTemperList[0].t12 + '</td><td>' + message.drybulbTemperList[0].t12 + '</td></tr>',
                text17 = '<tr><td>12</td><td>' + message.avgOnedayTemperList[0].t13 + '</td><td>' + message.avgFivedayTemperList[0].t13 + '</td><td>' + message.avgTendayTemperList[0].t13 + '</td><td>' + message.drybulbTemperList[0].t13 + '</td></tr>',
                text18 = '<tr><td>13</td><td>' + message.avgOnedayTemperList[0].t14 + '</td><td>' + message.avgFivedayTemperList[0].t14 + '</td><td>' + message.avgTendayTemperList[0].t14 + '</td><td>' + message.drybulbTemperList[0].t14 + '</td></tr>',
                text19 = '<tr><td>14</td><td>' + message.avgOnedayTemperList[0].t15 + '</td><td>' + message.avgFivedayTemperList[0].t15 + '</td><td>' + message.avgTendayTemperList[0].t15 + '</td><td>' + message.drybulbTemperList[0].t15 + '</td></tr>',
                text20 = '<tr><td>15</td><td>' + message.avgOnedayTemperList[0].t16 + '</td><td>' + message.avgFivedayTemperList[0].t16 + '</td><td>' + message.avgTendayTemperList[0].t16 + '</td><td>' + message.drybulbTemperList[0].t16 + '</td></tr>',
                text21 = '<tr><td>16</td><td>' + message.avgOnedayTemperList[0].t17 + '</td><td>' + message.avgFivedayTemperList[0].t17 + '</td><td>' + message.avgTendayTemperList[0].t17 + '</td><td>' + message.drybulbTemperList[0].t17 + '</td></tr>',
                text22 = '<tr><td>17</td><td>' + message.avgOnedayTemperList[0].t18 + '</td><td>' + message.avgFivedayTemperList[0].t18 + '</td><td>' + message.avgTendayTemperList[0].t18 + '</td><td>' + message.drybulbTemperList[0].t18 + '</td></tr>',
                text23 = '<tr><td>18</td><td>' + message.avgOnedayTemperList[0].t19 + '</td><td>' + message.avgFivedayTemperList[0].t19 + '</td><td>' + message.avgTendayTemperList[0].t19 + '</td><td>' + message.drybulbTemperList[0].t19 + '</td></tr>',
                text24 = '<tr><td>19</td><td>' + message.avgOnedayTemperList[0].t20 + '</td><td>' + message.avgFivedayTemperList[0].t20 + '</td><td>' + message.avgTendayTemperList[0].t20 + '</td><td>' + message.drybulbTemperList[0].t20 + '</td></tr>',
                text25 = '<tr><td>20</td><td>' + message.avgOnedayTemperList[0].t21 + '</td><td>' + message.avgFivedayTemperList[0].t21 + '</td><td>' + message.avgTendayTemperList[0].t21 + '</td><td>' + message.drybulbTemperList[0].t21 + '</td></tr>',
                text26 = '<tr><td>21</td><td>' + message.avgOnedayTemperList[0].t22 + '</td><td>' + message.avgFivedayTemperList[0].t22 + '</td><td>' + message.avgTendayTemperList[0].t22 + '</td><td>' + message.drybulbTemperList[0].t22 + '</td></tr>',
                text27 = '<tr><td>22</td><td>' + message.avgOnedayTemperList[0].t23 + '</td><td>' + message.avgFivedayTemperList[0].t23 + '</td><td>' + message.avgTendayTemperList[0].t23 + '</td><td>' + message.drybulbTemperList[0].t23 + '</td></tr>',
                text28 = '<tr><td>23</td><td>' + message.avgOnedayTemperList[0].t24 + '</td><td>' + message.avgFivedayTemperList[0].t24 + '</td><td>' + message.avgTendayTemperList[0].t24 + '</td><td>' + message.drybulbTemperList[0].t24 + '</td></tr>'

            $("#typical-winterWarm").append(text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10 + text11 + text12 + text13 +
                text14 + text15 + text16 + text17 + text18 + text19 + text20 + text21 + text22 + text23 + text24 + text25 + text26 +
                text27 + text28);
            }
        },
        error: function() {

        }
    });
}
//冬季空调室外计算参数
function getWinterAir() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/winterSummerTypical/getTypWinAirById?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if ($("#typical-wsAirConditioner tr").eq(1)) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-wsAirConditioner tr").html('');
            }
            var text1 = '<tr><td rowspan="28" ><div style="writing-mode: tb-rl;">冬季空调室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td>累年平均每年不保证6小时</td><td>累年平均每年不保证24小时</td><td>累年平均每年不保证48小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">干球温度逐时变化系数</td></tr>',
                text2 = '<tr><td rowspan="2">日较差</td><td colspan="3">干球温度（℃）</td></tr>',
                text3 = "<tr><td>" + message.typWinAirParamInfo.param1 + "</td><td>" + message.typWinAirParamInfo.param2 + "</td><td>" + message.typWinAirParamInfo.param3 + "</td>",
                text4 = '<tr><td>计算参数</td><td colspan="3">干球温度（℃）</td></tr>',
                text5 = '<tr><td>0</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.avgsixhourTemperList[0].t1 + '</td><td>' + message.avgonedayTemperList[0].t1 + '</td><td>' + message.avgTwodayTemperList[0].t1 + '</td><td>' + message.drybulbTemperList[0].t1 + '</td></tr>',
                text6 = '<tr><td>1</td><td>' + message.avgsixhourTemperList[0].t2 + '</td><td>' + message.avgonedayTemperList[0].t2 + '</td><td>' + message.avgTwodayTemperList[0].t2 + '</td><td>' + message.drybulbTemperList[0].t2 + '</td></tr>',
                text7 = '<tr><td>2</td><td>' + message.avgsixhourTemperList[0].t3 + '</td><td>' + message.avgonedayTemperList[0].t3 + '</td><td>' + message.avgTwodayTemperList[0].t3 + '</td><td>' + message.drybulbTemperList[0].t3 + '</td></tr>',
                text8 = '<tr><td>3</td><td>' + message.avgsixhourTemperList[0].t4 + '</td><td>' + message.avgonedayTemperList[0].t4 + '</td><td>' + message.avgTwodayTemperList[0].t4 + '</td><td>' + message.drybulbTemperList[0].t4 + '</td></tr>',
                text9 = '<tr><td>4</td><td>' + message.avgsixhourTemperList[0].t5 + '</td><td>' + message.avgonedayTemperList[0].t5 + '</td><td>' + message.avgTwodayTemperList[0].t5 + '</td><td>' + message.drybulbTemperList[0].t5 + '</td></tr>',
                text10 = '<tr><td>5</td><td>' + message.avgsixhourTemperList[0].t6 + '</td><td>' + message.avgonedayTemperList[0].t6 + '</td><td>' + message.avgTwodayTemperList[0].t6 + '</td><td>' + message.drybulbTemperList[0].t6 + '</td></tr>',
                text11 = '<tr><td>6</td><td>' + message.avgsixhourTemperList[0].t7 + '</td><td>' + message.avgonedayTemperList[0].t7 + '</td><td>' + message.avgTwodayTemperList[0].t7 + '</td><td>' + message.drybulbTemperList[0].t7 + '</td></tr>',
                text12 = '<tr><td>7</td><td>' + message.avgsixhourTemperList[0].t8 + '</td><td>' + message.avgonedayTemperList[0].t8 + '</td><td>' + message.avgTwodayTemperList[0].t8 + '</td><td>' + message.drybulbTemperList[0].t8 + '</td></tr>',
                text13 = '<tr><td>8</td><td>' + message.avgsixhourTemperList[0].t9 + '</td><td>' + message.avgonedayTemperList[0].t9 + '</td><td>' + message.avgTwodayTemperList[0].t9 + '</td><td>' + message.drybulbTemperList[0].t9 + '</td></tr>',
                text14 = '<tr><td>9</td><td>' + message.avgsixhourTemperList[0].t10 + '</td><td>' + message.avgonedayTemperList[0].t10 + '</td><td>' + message.avgTwodayTemperList[0].t10 + '</td><td>' + message.drybulbTemperList[0].t10 + '</td></tr>',
                text15 = '<tr><td>10</td><td>' + message.avgsixhourTemperList[0].t11 + '</td><td>' + message.avgonedayTemperList[0].t11 + '</td><td>' + message.avgTwodayTemperList[0].t11 + '</td><td>' + message.drybulbTemperList[0].t11 + '</td></tr>',
                text16 = '<tr><td>11</td><td>' + message.avgsixhourTemperList[0].t12 + '</td><td>' + message.avgonedayTemperList[0].t12 + '</td><td>' + message.avgTwodayTemperList[0].t12 + '</td><td>' + message.drybulbTemperList[0].t12 + '</td></tr>',
                text17 = '<tr><td>12</td><td>' + message.avgsixhourTemperList[0].t13 + '</td><td>' + message.avgonedayTemperList[0].t13 + '</td><td>' + message.avgTwodayTemperList[0].t13 + '</td><td>' + message.drybulbTemperList[0].t13 + '</td></tr>',
                text18 = '<tr><td>13</td><td>' + message.avgsixhourTemperList[0].t14 + '</td><td>' + message.avgonedayTemperList[0].t14 + '</td><td>' + message.avgTwodayTemperList[0].t14 + '</td><td>' + message.drybulbTemperList[0].t14 + '</td></tr>',
                text19 = '<tr><td>14</td><td>' + message.avgsixhourTemperList[0].t15 + '</td><td>' + message.avgonedayTemperList[0].t15 + '</td><td>' + message.avgTwodayTemperList[0].t15 + '</td><td>' + message.drybulbTemperList[0].t15 + '</td></tr>',
                text20 = '<tr><td>15</td><td>' + message.avgsixhourTemperList[0].t16 + '</td><td>' + message.avgonedayTemperList[0].t16 + '</td><td>' + message.avgTwodayTemperList[0].t16 + '</td><td>' + message.drybulbTemperList[0].t16 + '</td></tr>',
                text21 = '<tr><td>16</td><td>' + message.avgsixhourTemperList[0].t17 + '</td><td>' + message.avgonedayTemperList[0].t17 + '</td><td>' + message.avgTwodayTemperList[0].t17 + '</td><td>' + message.drybulbTemperList[0].t17 + '</td></tr>',
                text22 = '<tr><td>17</td><td>' + message.avgsixhourTemperList[0].t18 + '</td><td>' + message.avgonedayTemperList[0].t18 + '</td><td>' + message.avgTwodayTemperList[0].t18 + '</td><td>' + message.drybulbTemperList[0].t18 + '</td></tr>',
                text23 = '<tr><td>18</td><td>' + message.avgsixhourTemperList[0].t19 + '</td><td>' + message.avgonedayTemperList[0].t19 + '</td><td>' + message.avgTwodayTemperList[0].t19 + '</td><td>' + message.drybulbTemperList[0].t19 + '</td></tr>',
                text24 = '<tr><td>19</td><td>' + message.avgsixhourTemperList[0].t20 + '</td><td>' + message.avgonedayTemperList[0].t20 + '</td><td>' + message.avgTwodayTemperList[0].t20 + '</td><td>' + message.drybulbTemperList[0].t20 + '</td></tr>',
                text25 = '<tr><td>20</td><td>' + message.avgsixhourTemperList[0].t21 + '</td><td>' + message.avgonedayTemperList[0].t21 + '</td><td>' + message.avgTwodayTemperList[0].t21 + '</td><td>' + message.drybulbTemperList[0].t21 + '</td></tr>',
                text26 = '<tr><td>21</td><td>' + message.avgsixhourTemperList[0].t22 + '</td><td>' + message.avgonedayTemperList[0].t22 + '</td><td>' + message.avgTwodayTemperList[0].t22 + '</td><td>' + message.drybulbTemperList[0].t22 + '</td></tr>',
                text27 = '<tr><td>22</td><td>' + message.avgsixhourTemperList[0].t23 + '</td><td>' + message.avgonedayTemperList[0].t23 + '</td><td>' + message.avgTwodayTemperList[0].t23 + '</td><td>' + message.drybulbTemperList[0].t23 + '</td></tr>',
                text28 = '<tr><td>23</td><td>' + message.avgsixhourTemperList[0].t24 + '</td><td>' + message.avgonedayTemperList[0].t24 + '</td><td>' + message.avgTwodayTemperList[0].t24 + '</td><td>' + message.drybulbTemperList[0].t24 + '</td></tr>'

            $("#typical-wsAirConditioner").append(text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10 + text11 + text12 + text13 +
                text14 + text15 + text16 + text17 + text18 + text19 + text20 + text21 + text22 + text23 + text24 + text25 + text26 +
                text27 + text28);
        },
        error: function() {

        }
    });
}
//夏季空调室外计算参数
function getSummerAir() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/winterSummerTypical/gettsa?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param.length==0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-summerAirConditioner tr").html('');
            }else{


            var text1 = '<tr><td rowspan="28" ><div style="writing-mode: tb-rl;">夏季空调室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28">参数类型</td><td >不保证时长</td><td colspan="2">累年平均每年不保证10小时</td><td colspan="2">累年平均每年不保证50小时</td><td colspan="2">累年平均每年不保证100小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">太阳辐射日工况参数</div></td><td >不保证时长</td><td colspan="3">累年平均每年不保证10小时</td><td colspan="3">累年平均每年不保证50小时</td><td colspan="3">累年平均每年不保证100小时</td><td rowspan="28">系数类型</td><td rowspan="4">干球温度逐时变化系数</td><td rowspan="4">湿球温度逐时变化系数</td><td rowspan="4">太阳辐射逐时变化系数</td></tr>',
                text2 = '<tr><td rowspan="2">日均值</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td rowspan="2">日峰值</td><td colspan="3">太阳辐射（W/m2)</td><td colspan="3">太阳辐射（W/m2)</td><td colspan="3">太阳辐射（W/m2)</td></tr>',
                text3 = "<tr><td>" + message.param[0].param1 + "</td><td>" + message.param[0].param2 + "</td><td>" + message.param[0].param3 + "</td><td>" + message.param[0].param4 + "</td><td>" + message.param[0].param5 + "</td><td>" + message.param[0].param6 + "</td><td colspan='3'>" + message.param[0].param7 + "</td><td colspan='3'>" + message.param[0].param8 + "</td><td colspan='3'>" + message.param[0].param9 + "</td></tr>",
                text4 = '<tr><td>计算参数</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td>干球温度（℃）</td><td>湿球温度（℃）</td><td>计算参数</td><td>直射辐射（W/m2)</td><td>散射辐射（W/m2)</td><td>总辐射（W/m2)</td><td>直射辐射（W/m2)</td><td>散射辐射（W/m2)</td><td>总辐射（W/m2)</td><td>直射辐射（W/m2)</td><td>散射辐射（W/m2)</td><td>总辐射（W/m2)</td></tr>',
                text5 = ' <tr><td>0</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.time[3].t1 + '</td><td>' + message.time[4].t1 + '</td><td>' + message.time[5].t1 + '</td><td>' + message.time[6].t1 + '</td><td>' + message.time[7].t1 + '</td><td>' + message.time[8].t1 + '</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.time[9].t1 + '</td><td>' + message.time[10].t1 + '</td><td>' + message.time[11].t1 + '</td><td>' + message.time[12].t1 + '</td><td>' + message.time[13].t1 + '</td><td>' + message.time[14].t1 + '</td><td>' + message.time[15].t1 + '</td><td>' + message.time[16].t1 + '</td><td>' + message.time[17].t1 + '</td><td>' + message.time[0].t1 + '</td><td>' + message.time[1].t1 + '</td><td>' + message.time[2].t1 + '</td></tr>',
                text6 = "<tr> <td>1</td><td>" + message.time[3].t2 + "</td><td>" + message.time[4].t2 + "</td><td>" + message.time[5].t2 + "</td><td>" + message.time[6].t2 + "</td><td>" + message.time[7].t2 + "</td><td>" + message.time[8].t2 + "</td><td>" + message.time[9].t2 + "</td><td>" + message.time[10].t2 + "</td><td>" + message.time[11].t2 + "</td><td>" + message.time[12].t2 + "</td><td>" + message.time[13].t2 + "</td><td>" + message.time[14].t2 + "</td><td>" + message.time[15].t2 + "</td><td>" + message.time[16].t2 + "</td><td>" + message.time[17].t2 + "</td><td>" + message.time[0].t2 + "</td><td>" + message.time[1].t2 + "</td><td>" + message.time[2].t2 + "</td> </tr>",
                text7 = "<tr> <td>2</td><td>" + message.time[3].t3 + "</td><td>" + message.time[4].t3 + "</td><td>" + message.time[5].t3 + "</td><td>" + message.time[6].t3 + "</td><td>" + message.time[7].t3 + "</td><td>" + message.time[8].t3 + "</td><td>" + message.time[9].t3 + "</td><td>" + message.time[10].t3 + "</td><td>" + message.time[11].t3 + "</td><td>" + message.time[12].t3 + "</td><td>" + message.time[13].t3 + "</td><td>" + message.time[14].t3 + "</td><td>" + message.time[15].t3 + "</td><td>" + message.time[16].t3 + "</td><td>" + message.time[17].t3 + "</td><td>" + message.time[0].t3 + "</td><td>" + message.time[1].t3 + "</td><td>" + message.time[2].t3 + "</td> </tr>",
                text8 = "<tr> <td>3</td><td>" + message.time[3].t4 + "</td><td>" + message.time[4].t4 + "</td><td>" + message.time[5].t4 + "</td><td>" + message.time[6].t4 + "</td><td>" + message.time[7].t4 + "</td><td>" + message.time[8].t4 + "</td><td>" + message.time[9].t4 + "</td><td>" + message.time[10].t4 + "</td><td>" + message.time[11].t4 + "</td><td>" + message.time[12].t4 + "</td><td>" + message.time[13].t4 + "</td><td>" + message.time[14].t4 + "</td><td>" + message.time[15].t4 + "</td><td>" + message.time[16].t4 + "</td><td>" + message.time[17].t4 + "</td><td>" + message.time[0].t4 + "</td><td>" + message.time[1].t4 + "</td><td>" + message.time[2].t4 + "</td> </tr>",
                text9 = "<tr> <td>4</td><td>" + message.time[3].t5 + "</td><td>" + message.time[4].t5 + "</td><td>" + message.time[5].t5 + "</td><td>" + message.time[6].t5 + "</td><td>" + message.time[7].t5 + "</td><td>" + message.time[8].t5 + "</td><td>" + message.time[9].t5 + "</td><td>" + message.time[10].t5 + "</td><td>" + message.time[11].t5 + "</td><td>" + message.time[12].t5 + "</td><td>" + message.time[13].t5 + "</td><td>" + message.time[14].t5 + "</td><td>" + message.time[15].t5 + "</td><td>" + message.time[16].t5 + "</td><td>" + message.time[17].t5 + "</td><td>" + message.time[0].t5 + "</td><td>" + message.time[1].t5 + "</td><td>" + message.time[2].t5 + "</td> </tr>",
                text10 = "<tr> <td>5</td><td>" + message.time[3].t6 + "</td><td>" + message.time[4].t6 + "</td><td>" + message.time[5].t6 + "</td><td>" + message.time[6].t6 + "</td><td>" + message.time[7].t6 + "</td><td>" + message.time[8].t6 + "</td><td>" + message.time[9].t6 + "</td><td>" + message.time[10].t6 + "</td><td>" + message.time[11].t6 + "</td><td>" + message.time[12].t6 + "</td><td>" + message.time[13].t6 + "</td><td>" + message.time[14].t6 + "</td><td>" + message.time[15].t6 + "</td><td>" + message.time[16].t6 + "</td><td>" + message.time[17].t6 + "</td><td>" + message.time[0].t6 + "</td><td>" + message.time[1].t6 + "</td><td>" + message.time[2].t6 + "</td> </tr>",
                text11 = "<tr> <td>6</td><td>" + message.time[3].t7 + "</td><td>" + message.time[4].t7 + "</td><td>" + message.time[5].t7 + "</td><td>" + message.time[6].t7 + "</td><td>" + message.time[7].t7 + "</td><td>" + message.time[8].t7 + "</td><td>" + message.time[9].t7 + "</td><td>" + message.time[10].t7 + "</td><td>" + message.time[11].t7 + "</td><td>" + message.time[12].t7 + "</td><td>" + message.time[13].t7 + "</td><td>" + message.time[14].t7 + "</td><td>" + message.time[15].t7 + "</td><td>" + message.time[16].t7 + "</td><td>" + message.time[17].t7 + "</td><td>" + message.time[0].t7 + "</td><td>" + message.time[1].t7 + "</td><td>" + message.time[2].t7 + "</td> </tr>",
                text12 = "<tr> <td>7</td><td>" + message.time[3].t8 + "</td><td>" + message.time[4].t8 + "</td><td>" + message.time[5].t8 + "</td><td>" + message.time[6].t8 + "</td><td>" + message.time[7].t8 + "</td><td>" + message.time[8].t8 + "</td><td>" + message.time[9].t8 + "</td><td>" + message.time[10].t8 + "</td><td>" + message.time[11].t8 + "</td><td>" + message.time[12].t8 + "</td><td>" + message.time[13].t8 + "</td><td>" + message.time[14].t8 + "</td><td>" + message.time[15].t8 + "</td><td>" + message.time[16].t8 + "</td><td>" + message.time[17].t8 + "</td><td>" + message.time[0].t8 + "</td><td>" + message.time[1].t8 + "</td><td>" + message.time[2].t8 + "</td> </tr>",
                text13 = "<tr> <td>8</td><td>" + message.time[3].t9 + "</td><td>" + message.time[4].t9 + "</td><td>" + message.time[5].t9 + "</td><td>" + message.time[6].t9 + "</td><td>" + message.time[7].t9 + "</td><td>" + message.time[8].t9 + "</td><td>" + message.time[9].t9 + "</td><td>" + message.time[10].t9 + "</td><td>" + message.time[11].t9 + "</td><td>" + message.time[12].t9 + "</td><td>" + message.time[13].t9 + "</td><td>" + message.time[14].t9 + "</td><td>" + message.time[15].t9 + "</td><td>" + message.time[16].t9 + "</td><td>" + message.time[17].t9 + "</td><td>" + message.time[0].t9 + "</td><td>" + message.time[1].t9 + "</td><td>" + message.time[2].t9 + "</td> </tr>",
                text14 = "<tr><td>9</td><td>" + message.time[3].t10 + "</td><td>" + message.time[4].t10 + "</td><td>" + message.time[5].t10 + "</td><td>" + message.time[6].t10 + "</td><td>" + message.time[7].t10 + "</td><td>" + message.time[8].t10 + "</td><td>" + message.time[9].t10 + "</td><td>" + message.time[10].t10 + "</td><td>" + message.time[11].t10 + "</td><td>" + message.time[12].t10 + "</td><td>" + message.time[13].t10 + "</td><td>" + message.time[14].t10 + "</td><td>" + message.time[15].t10 + "</td><td>" + message.time[16].t10 + "</td><td>" + message.time[17].t10 + "</td><td>" + message.time[0].t10 + "</td><td>" + message.time[1].t10 + "</td><td>" + message.time[2].t10 + "</td> </tr>",
                text15 = "<tr> <td>10</td><td>" + message.time[3].t11 + "</td><td>" + message.time[4].t11 + "</td><td>" + message.time[5].t11 + "</td><td>" + message.time[6].t11 + "</td><td>" + message.time[7].t11 + "</td><td>" + message.time[8].t11 + "</td><td>" + message.time[9].t11 + "</td><td>" + message.time[10].t11 + "</td><td>" + message.time[11].t11 + "</td><td>" + message.time[12].t11 + "</td><td>" + message.time[13].t11 + "</td><td>" + message.time[14].t11 + "</td><td>" + message.time[15].t11 + "</td><td>" + message.time[16].t11 + "</td><td>" + message.time[17].t11 + "</td><td>" + message.time[0].t11 + "</td><td>" + message.time[1].t11 + "</td><td>" + message.time[2].t11 + "</td> </tr>",
                text16 = "<tr><td>11</td><td>" + message.time[3].t12 + "</td><td>" + message.time[4].t12 + "</td><td>" + message.time[5].t12 + "</td><td>" + message.time[6].t12 + "</td><td>" + message.time[7].t12 + "</td><td>" + message.time[8].t12 + "</td><td>" + message.time[9].t12 + "</td><td>" + message.time[10].t12 + "</td><td>" + message.time[11].t12 + "</td><td>" + message.time[12].t12 + "</td><td>" + message.time[13].t12 + "</td><td>" + message.time[14].t12 + "</td><td>" + message.time[15].t12 + "</td><td>" + message.time[16].t12 + "</td><td>" + message.time[17].t12 + "</td><td>" + message.time[0].t12 + "</td><td>" + message.time[1].t12 + "</td><td>" + message.time[2].t12 + "</td> </tr>",
                text17 = "<tr> <td>12</td><td>" + message.time[3].t13 + "</td><td>" + message.time[4].t13 + "</td><td>" + message.time[5].t13 + "</td><td>" + message.time[6].t13 + "</td><td>" + message.time[7].t13 + "</td><td>" + message.time[8].t13 + "</td><td>" + message.time[9].t13 + "</td><td>" + message.time[10].t13 + "</td><td>" + message.time[11].t13 + "</td><td>" + message.time[12].t13 + "</td><td>" + message.time[13].t13 + "</td><td>" + message.time[14].t13 + "</td><td>" + message.time[15].t13 + "</td><td>" + message.time[16].t13 + "</td><td>" + message.time[17].t13 + "</td><td>" + message.time[0].t13 + "</td><td>" + message.time[1].t13 + "</td><td>" + message.time[2].t13 + "</td> </tr>",
                text18 = "<tr> <td>13</td><td>" + message.time[3].t14 + "</td><td>" + message.time[4].t14 + "</td><td>" + message.time[5].t14 + "</td><td>" + message.time[6].t14 + "</td><td>" + message.time[7].t14 + "</td><td>" + message.time[8].t14 + "</td><td>" + message.time[9].t14 + "</td><td>" + message.time[10].t14 + "</td><td>" + message.time[11].t14 + "</td><td>" + message.time[12].t14 + "</td><td>" + message.time[13].t14 + "</td><td>" + message.time[14].t14 + "</td><td>" + message.time[15].t14 + "</td><td>" + message.time[16].t14 + "</td><td>" + message.time[17].t14 + "</td><td>" + message.time[0].t14 + "</td><td>" + message.time[1].t14 + "</td><td>" + message.time[2].t14 + "</td> </tr>",
                text19 = "<tr> <td>14</td><td>" + message.time[3].t15 + "</td><td>" + message.time[4].t15 + "</td><td>" + message.time[5].t15 + "</td><td>" + message.time[6].t15 + "</td><td>" + message.time[7].t15 + "</td><td>" + message.time[8].t15 + "</td><td>" + message.time[9].t15 + "</td><td>" + message.time[10].t15 + "</td><td>" + message.time[11].t15 + "</td><td>" + message.time[12].t15 + "</td><td>" + message.time[13].t15 + "</td><td>" + message.time[14].t15 + "</td><td>" + message.time[15].t15 + "</td><td>" + message.time[16].t15 + "</td><td>" + message.time[17].t15 + "</td><td>" + message.time[0].t15 + "</td><td>" + message.time[1].t15 + "</td><td>" + message.time[2].t15 + "</td> </tr>",
                text20 = "<tr> <td>15</td><td>" + message.time[3].t16 + "</td><td>" + message.time[4].t16 + "</td><td>" + message.time[5].t16 + "</td><td>" + message.time[6].t16 + "</td><td>" + message.time[7].t16 + "</td><td>" + message.time[8].t16 + "</td><td>" + message.time[9].t16 + "</td><td>" + message.time[10].t16 + "</td><td>" + message.time[11].t16 + "</td><td>" + message.time[12].t16 + "</td><td>" + message.time[13].t16 + "</td><td>" + message.time[14].t16 + "</td><td>" + message.time[15].t16 + "</td><td>" + message.time[16].t16 + "</td><td>" + message.time[17].t16 + "</td><td>" + message.time[0].t16 + "</td><td>" + message.time[1].t16 + "</td><td>" + message.time[2].t16 + "</td> </tr>",
                text21 = "<tr> <td>16</td><td>" + message.time[3].t17 + "</td><td>" + message.time[4].t17 + "</td><td>" + message.time[5].t17 + "</td><td>" + message.time[6].t17 + "</td><td>" + message.time[7].t17 + "</td><td>" + message.time[8].t17 + "</td><td>" + message.time[9].t17 + "</td><td>" + message.time[10].t17 + "</td><td>" + message.time[11].t17 + "</td><td>" + message.time[12].t17 + "</td><td>" + message.time[13].t17 + "</td><td>" + message.time[14].t17 + "</td><td>" + message.time[15].t17 + "</td><td>" + message.time[16].t17 + "</td><td>" + message.time[17].t17 + "</td><td>" + message.time[0].t17 + "</td><td>" + message.time[1].t17 + "</td><td>" + message.time[2].t17 + "</td> </tr>",
                text22 = "<tr> <td>17</td><td>" + message.time[3].t18 + "</td><td>" + message.time[4].t18 + "</td><td>" + message.time[5].t18 + "</td><td>" + message.time[6].t18 + "</td><td>" + message.time[7].t18 + "</td><td>" + message.time[8].t18 + "</td><td>" + message.time[9].t18 + "</td><td>" + message.time[10].t18 + "</td><td>" + message.time[11].t18 + "</td><td>" + message.time[12].t18 + "</td><td>" + message.time[13].t18 + "</td><td>" + message.time[14].t18 + "</td><td>" + message.time[15].t18 + "</td><td>" + message.time[16].t18 + "</td><td>" + message.time[17].t18 + "</td><td>" + message.time[0].t18 + "</td><td>" + message.time[1].t18 + "</td><td>" + message.time[2].t18 + "</td> </tr>",
                text23 = "<tr> <td>18</td><td>" + message.time[3].t19 + "</td><td>" + message.time[4].t19 + "</td><td>" + message.time[5].t19 + "</td><td>" + message.time[6].t19 + "</td><td>" + message.time[7].t19 + "</td><td>" + message.time[8].t19 + "</td><td>" + message.time[9].t19 + "</td><td>" + message.time[10].t19 + "</td><td>" + message.time[11].t19 + "</td><td>" + message.time[12].t19 + "</td><td>" + message.time[13].t19 + "</td><td>" + message.time[14].t19 + "</td><td>" + message.time[15].t19 + "</td><td>" + message.time[16].t19 + "</td><td>" + message.time[17].t19 + "</td><td>" + message.time[0].t19 + "</td><td>" + message.time[1].t19 + "</td><td>" + message.time[2].t19 + "</td> </tr>",
                text24 = "<tr> <td>19</td><td>" + message.time[3].t20 + "</td><td>" + message.time[4].t20 + "</td><td>" + message.time[5].t20 + "</td><td>" + message.time[6].t20 + "</td><td>" + message.time[7].t20 + "</td><td>" + message.time[8].t20 + "</td><td>" + message.time[9].t20 + "</td><td>" + message.time[10].t20 + "</td><td>" + message.time[11].t20 + "</td><td>" + message.time[12].t20 + "</td><td>" + message.time[13].t20 + "</td><td>" + message.time[14].t20 + "</td><td>" + message.time[15].t20 + "</td><td>" + message.time[16].t20 + "</td><td>" + message.time[17].t20 + "</td><td>" + message.time[0].t20 + "</td><td>" + message.time[1].t20 + "</td><td>" + message.time[2].t20 + "</td> </tr>",
                text25 = "<tr> <td>20</td><td>" + message.time[3].t21 + "</td><td>" + message.time[4].t21 + "</td><td>" + message.time[5].t21 + "</td><td>" + message.time[6].t21 + "</td><td>" + message.time[7].t21 + "</td><td>" + message.time[8].t21 + "</td><td>" + message.time[9].t21 + "</td><td>" + message.time[10].t21 + "</td><td>" + message.time[11].t21 + "</td><td>" + message.time[12].t21 + "</td><td>" + message.time[13].t21 + "</td><td>" + message.time[14].t21 + "</td><td>" + message.time[15].t21 + "</td><td>" + message.time[16].t21 + "</td><td>" + message.time[17].t21 + "</td><td>" + message.time[0].t21 + "</td><td>" + message.time[1].t21 + "</td><td>" + message.time[2].t21 + "</td> </tr>",
                text26 = "<tr> <td>21</td><td>" + message.time[3].t22 + "</td><td>" + message.time[4].t22 + "</td><td>" + message.time[5].t22 + "</td><td>" + message.time[6].t22 + "</td><td>" + message.time[7].t22 + "</td><td>" + message.time[8].t22 + "</td><td>" + message.time[9].t22 + "</td><td>" + message.time[10].t22 + "</td><td>" + message.time[11].t22 + "</td><td>" + message.time[12].t22 + "</td><td>" + message.time[13].t22 + "</td><td>" + message.time[14].t22 + "</td><td>" + message.time[15].t22 + "</td><td>" + message.time[16].t22 + "</td><td>" + message.time[17].t22 + "</td><td>" + message.time[0].t22 + "</td><td>" + message.time[1].t22 + "</td><td>" + message.time[2].t22 + "</td> </tr>",
                text27 = "<tr> <td>22</td><td>" + message.time[3].t23 + "</td><td>" + message.time[4].t23 + "</td><td>" + message.time[5].t23 + "</td><td>" + message.time[6].t23 + "</td><td>" + message.time[7].t23 + "</td><td>" + message.time[8].t23 + "</td><td>" + message.time[9].t23 + "</td><td>" + message.time[10].t23 + "</td><td>" + message.time[11].t23 + "</td><td>" + message.time[12].t23 + "</td><td>" + message.time[13].t23 + "</td><td>" + message.time[14].t23 + "</td><td>" + message.time[15].t23 + "</td><td>" + message.time[16].t23 + "</td><td>" + message.time[17].t23 + "</td><td>" + message.time[0].t23 + "</td><td>" + message.time[1].t23 + "</td><td>" + message.time[2].t23 + "</td> </tr>",
                text28 = "<tr> <td>23</td><td>" + message.time[3].t24 + "</td><td>" + message.time[4].t24 + "</td><td>" + message.time[5].t24 + "</td><td>" + message.time[6].t24 + "</td><td>" + message.time[7].t24 + "</td><td>" + message.time[8].t24 + "</td><td>" + message.time[9].t24 + "</td><td>" + message.time[10].t24 + "</td><td>" + message.time[11].t24 + "</td><td>" + message.time[12].t24 + "</td><td>" + message.time[13].t24 + "</td><td>" + message.time[14].t24 + "</td><td>" + message.time[15].t24 + "</td><td>" + message.time[16].t24 + "</td><td>" + message.time[17].t24 + "</td><td>" + message.time[0].t24 + "</td><td>" + message.time[1].t24 + "</td><td>" + message.time[2].t24 + "</td> </tr>"

            $("#typical-summerAirConditioner").append(text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10 + text11 + text12 + text13 +
                text14 + text15 + text16 + text17 + text18 + text19 + text20 + text21 + text22 + text23 + text24 + text25 + text26 +
                text27 + text28);
            }
        },
        error: function() {

        }
    });
}
//夏季除湿室外计算参数
function getsummernNoHumidity() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/winterSummerTypical/gettsd?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param.length==0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-summerDeHumidity tr").html('');
            }else{


            var text1 = "<tr> <td>" + message.param[0].param1 + "</td><td>" + message.param[0].param2 + "</td><td>" + message.param[0].param3 + "</td><td>" + message.param[0].param4 + "</td><td>" + message.param[0].param5 + "</td><td>" + message.param[0].param6 + "</td><td>" + message.param[0].param7 + "</td><td>" + message.param[0].param8 + "</td><td>" + message.param[0].param9 + "</td> </tr>",
                text2 = "<tr> <td>计算参数</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td> </tr>",
                text3 = "<tr> <td>0</td><td rowspan='24'><div style='writing-mode: tb-rl;'>多不保证率日工况参数</div></td><td>" + message.time[2].t1 + "</td><td>" + message.time[9].t1 + "</td><td>" + message.time[10].t1 + "</td><td>" + message.time[5].t1 + "</td><td>" + message.time[3].t1 + "</td><td>" + message.time[4].t1 + "</td><td>" + message.time[8].t1 + "</td><td>" + message.time[6].t1 + "</td><td>" + message.time[7].t1 + "</td><td>" + message.time[0].t1 + "</td><td>" + message.time[1].t1 + "</td> </tr>",
                text4 = "<tr> <td>1</td><td>" + message.time[2].t2 + "</td><td>" + message.time[9].t2 + "</td><td>" + message.time[10].t2 + "</td><td>" + message.time[5].t2 + "</td><td>" + message.time[3].t2 + "</td><td>" + message.time[4].t2 + "</td><td>" + message.time[8].t2 + "</td><td>" + message.time[6].t2 + "</td><td>" + message.time[7].t2 + "</td><td>" + message.time[0].t2 + "</td><td>" + message.time[1].t2 + "</td> </tr>",
                text5 = "<tr> <td>2</td><td>" + message.time[2].t3 + "</td><td>" + message.time[9].t3 + "</td><td>" + message.time[10].t3 + "</td><td>" + message.time[5].t3 + "</td><td>" + message.time[3].t3 + "</td><td>" + message.time[4].t3 + "</td><td>" + message.time[8].t3 + "</td><td>" + message.time[6].t3 + "</td><td>" + message.time[7].t3 + "</td><td>" + message.time[0].t3 + "</td><td>" + message.time[1].t3 + "</td> </tr>",
                text6 = "<tr> <td>3</td><td>" + message.time[2].t4 + "</td><td>" + message.time[9].t4 + "</td><td>" + message.time[10].t4 + "</td><td>" + message.time[5].t4 + "</td><td>" + message.time[3].t4 + "</td><td>" + message.time[4].t4 + "</td><td>" + message.time[8].t4 + "</td><td>" + message.time[6].t4 + "</td><td>" + message.time[7].t4 + "</td><td>" + message.time[0].t4 + "</td><td>" + message.time[1].t4 + "</td> </tr>",
                text7 = "<tr> <td>4</td><td>" + message.time[2].t5 + "</td><td>" + message.time[9].t5 + "</td><td>" + message.time[10].t5 + "</td><td>" + message.time[5].t5 + "</td><td>" + message.time[3].t5 + "</td><td>" + message.time[4].t5 + "</td><td>" + message.time[8].t5 + "</td><td>" + message.time[6].t5 + "</td><td>" + message.time[7].t5 + "</td><td>" + message.time[0].t5 + "</td><td>" + message.time[1].t5 + "</td> </tr>",
                text8 = "<tr> <td>5</td><td>" + message.time[2].t6 + "</td><td>" + message.time[9].t6 + "</td><td>" + message.time[10].t6 + "</td><td>" + message.time[5].t6 + "</td><td>" + message.time[3].t6 + "</td><td>" + message.time[4].t6 + "</td><td>" + message.time[8].t6 + "</td><td>" + message.time[6].t6 + "</td><td>" + message.time[7].t6 + "</td><td>" + message.time[0].t6 + "</td><td>" + message.time[1].t6 + "</td> </tr>",
                text9 = "<tr> <td>6</td><td>" + message.time[2].t7 + "</td><td>" + message.time[9].t7 + "</td><td>" + message.time[10].t7 + "</td><td>" + message.time[5].t7 + "</td><td>" + message.time[3].t7 + "</td><td>" + message.time[4].t7 + "</td><td>" + message.time[8].t7 + "</td><td>" + message.time[6].t7 + "</td><td>" + message.time[7].t7 + "</td><td>" + message.time[0].t7 + "</td><td>" + message.time[1].t7 + "</td> </tr>",
                text10 = "<tr> <td>7</td><td>" + message.time[2].t8 + "</td><td>" + message.time[9].t8 + "</td><td>" + message.time[10].t8 + "</td><td>" + message.time[5].t8 + "</td><td>" + message.time[3].t8 + "</td><td>" + message.time[4].t8 + "</td><td>" + message.time[8].t8 + "</td><td>" + message.time[6].t8 + "</td><td>" + message.time[7].t8 + "</td><td>" + message.time[0].t8 + "</td><td>" + message.time[1].t8 + "</td> </tr>",
                text11 = "<tr> <td>8</td><td>" + message.time[2].t9 + "</td><td>" + message.time[9].t9 + "</td><td>" + message.time[10].t9 + "</td><td>" + message.time[5].t9 + "</td><td>" + message.time[3].t9 + "</td><td>" + message.time[4].t9 + "</td><td>" + message.time[8].t9 + "</td><td>" + message.time[6].t9 + "</td><td>" + message.time[7].t9 + "</td><td>" + message.time[0].t9 + "</td><td>" + message.time[1].t9 + "</td> </tr>",
                text12 = "<tr> <td>9</td><td>" + message.time[2].t10 + "</td><td>" + message.time[9].t10 + "</td><td>" + message.time[10].t10 + "</td><td>" + message.time[5].t10 + "</td><td>" + message.time[3].t10 + "</td><td>" + message.time[4].t10 + "</td><td>" + message.time[8].t10 + "</td><td>" + message.time[6].t10 + "</td><td>" + message.time[7].t10 + "</td><td>" + message.time[0].t10 + "</td><td>" + message.time[1].t10 + "</td> </tr>",
                text13 = "<tr> <td>10</td><td>" + message.time[2].t11 + "</td><td>" + message.time[9].t11 + "</td><td>" + message.time[10].t11 + "</td><td>" + message.time[5].t11 + "</td><td>" + message.time[3].t11 + "</td><td>" + message.time[4].t11 + "</td><td>" + message.time[8].t11 + "</td><td>" + message.time[6].t11 + "</td><td>" + message.time[7].t11 + "</td><td>" + message.time[0].t11 + "</td><td>" + message.time[1].t11 + "</td> </tr>",
                text14 = "<tr> <td>11</td><td>" + message.time[2].t12 + "</td><td>" + message.time[9].t12 + "</td><td>" + message.time[10].t12 + "</td><td>" + message.time[5].t12 + "</td><td>" + message.time[3].t12 + "</td><td>" + message.time[4].t12 + "</td><td>" + message.time[8].t12 + "</td><td>" + message.time[6].t12 + "</td><td>" + message.time[7].t12 + "</td><td>" + message.time[0].t12 + "</td><td>" + message.time[1].t12 + "</td> </tr>",
                text15 = "<tr> <td>12</td><td>" + message.time[2].t13 + "</td><td>" + message.time[9].t13 + "</td><td>" + message.time[10].t13 + "</td><td>" + message.time[5].t13 + "</td><td>" + message.time[3].t13 + "</td><td>" + message.time[4].t13 + "</td><td>" + message.time[8].t13 + "</td><td>" + message.time[6].t13 + "</td><td>" + message.time[7].t13 + "</td><td>" + message.time[0].t13 + "</td><td>" + message.time[1].t13 + "</td> </tr>",
                text16 = "<tr> <td>13</td><td>" + message.time[2].t14 + "</td><td>" + message.time[9].t14 + "</td><td>" + message.time[10].t14 + "</td><td>" + message.time[5].t14 + "</td><td>" + message.time[3].t14 + "</td><td>" + message.time[4].t14 + "</td><td>" + message.time[8].t14 + "</td><td>" + message.time[6].t14 + "</td><td>" + message.time[7].t14 + "</td><td>" + message.time[0].t14 + "</td><td>" + message.time[1].t14 + "</td> </tr>",
                text17 = "<tr> <td>14</td><td>" + message.time[2].t15 + "</td><td>" + message.time[9].t15 + "</td><td>" + message.time[10].t15 + "</td><td>" + message.time[5].t15 + "</td><td>" + message.time[3].t15 + "</td><td>" + message.time[4].t15 + "</td><td>" + message.time[8].t15 + "</td><td>" + message.time[6].t15 + "</td><td>" + message.time[7].t15 + "</td><td>" + message.time[0].t15 + "</td><td>" + message.time[1].t15 + "</td> </tr>",
                text18 = "<tr> <td>15</td><td>" + message.time[2].t16 + "</td><td>" + message.time[9].t16 + "</td><td>" + message.time[10].t16 + "</td><td>" + message.time[5].t16 + "</td><td>" + message.time[3].t16 + "</td><td>" + message.time[4].t16 + "</td><td>" + message.time[8].t16 + "</td><td>" + message.time[6].t16 + "</td><td>" + message.time[7].t16 + "</td><td>" + message.time[0].t16 + "</td><td>" + message.time[1].t16 + "</td> </tr>",
                text19 = "<tr> <td>16</td><td>" + message.time[2].t17 + "</td><td>" + message.time[9].t17 + "</td><td>" + message.time[10].t17 + "</td><td>" + message.time[5].t17 + "</td><td>" + message.time[3].t17 + "</td><td>" + message.time[4].t17 + "</td><td>" + message.time[8].t17 + "</td><td>" + message.time[6].t17 + "</td><td>" + message.time[7].t17 + "</td><td>" + message.time[0].t17 + "</td><td>" + message.time[1].t17 + "</td> </tr>",
                text20 = "<tr> <td>17</td><td>" + message.time[2].t18 + "</td><td>" + message.time[9].t18 + "</td><td>" + message.time[10].t18 + "</td><td>" + message.time[5].t18 + "</td><td>" + message.time[3].t18 + "</td><td>" + message.time[4].t18 + "</td><td>" + message.time[8].t18 + "</td><td>" + message.time[6].t18 + "</td><td>" + message.time[7].t18 + "</td><td>" + message.time[0].t18 + "</td><td>" + message.time[1].t18 + "</td> </tr>",
                text21 = "<tr> <td>18</td><td>" + message.time[2].t19 + "</td><td>" + message.time[9].t19 + "</td><td>" + message.time[10].t19 + "</td><td>" + message.time[5].t19 + "</td><td>" + message.time[3].t19 + "</td><td>" + message.time[4].t19 + "</td><td>" + message.time[8].t19 + "</td><td>" + message.time[6].t19 + "</td><td>" + message.time[7].t19 + "</td><td>" + message.time[0].t19 + "</td><td>" + message.time[1].t19 + "</td> </tr>",
                text22 = "<tr> <td>19</td><td>" + message.time[2].t20 + "</td><td>" + message.time[9].t20 + "</td><td>" + message.time[10].t20 + "</td><td>" + message.time[5].t20 + "</td><td>" + message.time[3].t20 + "</td><td>" + message.time[4].t20 + "</td><td>" + message.time[8].t20 + "</td><td>" + message.time[6].t20 + "</td><td>" + message.time[7].t20 + "</td><td>" + message.time[0].t20 + "</td><td>" + message.time[1].t20 + "</td> </tr>",
                text23 = "<tr> <td>20</td><td>" + message.time[2].t21 + "</td><td>" + message.time[9].t21 + "</td><td>" + message.time[10].t21 + "</td><td>" + message.time[5].t21 + "</td><td>" + message.time[3].t21 + "</td><td>" + message.time[4].t21 + "</td><td>" + message.time[8].t21 + "</td><td>" + message.time[6].t21 + "</td><td>" + message.time[7].t21 + "</td><td>" + message.time[0].t21 + "</td><td>" + message.time[1].t21 + "</td> </tr>",
                text24 = "<tr> <td>21</td><td>" + message.time[2].t22 + "</td><td>" + message.time[9].t22 + "</td><td>" + message.time[10].t22 + "</td><td>" + message.time[5].t22 + "</td><td>" + message.time[3].t22 + "</td><td>" + message.time[4].t22 + "</td><td>" + message.time[8].t22 + "</td><td>" + message.time[6].t22 + "</td><td>" + message.time[7].t22 + "</td><td>" + message.time[0].t22 + "</td><td>" + message.time[1].t22 + "</td> </tr>",
                text25 = "<tr> <td>22</td><td>" + message.time[2].t23 + "</td><td>" + message.time[9].t23 + "</td><td>" + message.time[10].t23 + "</td><td>" + message.time[5].t23 + "</td><td>" + message.time[3].t23 + "</td><td>" + message.time[4].t23 + "</td><td>" + message.time[8].t23 + "</td><td>" + message.time[6].t23 + "</td><td>" + message.time[7].t23 + "</td><td>" + message.time[0].t23 + "</td><td>" + message.time[1].t23 + "</td> </tr>",
                text26 = "<tr> <td>23</td><td>" + message.time[2].t24 + "</td><td>" + message.time[9].t24 + "</td><td>" + message.time[10].t24 + "</td><td>" + message.time[5].t24 + "</td><td>" + message.time[3].t24 + "</td><td>" + message.time[4].t24 + "</td><td>" + message.time[8].t24 + "</td><td>" + message.time[6].t24 + "</td><td>" + message.time[7].t24 + "</td><td>" + message.time[0].t24 + "</td><td>" + message.time[1].t24 + "</td> </tr>"
            $("#typical-summerDeHumidity").append('<tr><td rowspan="28"><div style="writing-mode: tb-rl;">夏季除湿室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td colspan="3">累年平均每年不保证10小时</td><td colspan="3">累年平均每年不保证50小时</td><td colspan="3">累年平均每年不保证100小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">含湿量逐时变化系数</td><td rowspan="4">干球温度逐时变化系数</td></tr><tr><td rowspan="2">日均值</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td></tr>' +
                text1 + text2 + "/tr" + text3 + "/tr" + text4 + "/tr" + text5 + "/tr" + text6 + "/tr" + text7 + "/tr" + text8 + "/tr" + text9 + "/tr" + text10 + "/tr" + text11 + "/tr" + text12 + "/tr" + text13 + "/tr" +
                text14 + "/tr" + text15 + "/tr" + text16 + "/tr" + text17 + text18 + text19 + "/tr" + text20 + "/tr" + text21 + "/tr" + text22 + "/tr" + text23 + "/tr" + text24 + "/tr" + text25 + "/tr" + text26 + "/tr");
            }
        },
        error: function() {

        }
    });
}
//冬季加湿室外计算参数
function getwinterAddHumidity() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/winterSummerTypical/getopcWahum?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.type.length==0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-winterAddHumidity tr").html('');
            }else{


            var text1 = '<tr><td rowspan="28"><div style="writing-mode: tb-rl;">冬季加湿室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td colspan="3">累年平均每年不保证10小时</td><td colspan="3">累年平均每年不保证50小时</td><td colspan="3">累年平均每年不保证100小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">含湿量逐时变化系数</td><td rowspan="4">干球温度逐时变化系数</td></tr>',
                text2 = "<tr> <td rowspan='2'>日均值</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td> </tr>",
                text3 = "<tr><td>" + message.type[0].param1 + "</td><td>" + message.type[0].param2 + "</td><td>" + message.type[0].param3 + "</td><td>" + message.type[0].param4 + "</td><td>" + message.type[0].param5 + "</td><td>" + message.type[0].param6 + "</td><td>" + message.type[0].param7 + "</td><td>" + message.type[0].param8 + "</td><td>" + message.type[0].param9 + "</td></tr>",
                text4 = "<tr> <td>计算参数</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td><td>含湿量（g/kg干空气)</td><td>干球温度（℃）</td><td>相对湿度（%）</td> </tr>",
                text5 = "<tr> <td>0</td><td rowspan='24'><div style='writing-mode: tb-rl;'>多不保证率日工况参数</div></td><td>" + message.time[2].time1 + "</td><td>" + message.time[9].time1 + "</td><td>" + message.time[10].time1 + "</td><td>" + message.time[5].time1 + "</td><td>" + message.time[3].time1 + "</td><td>" + message.time[4].time1 + "</td><td>" + message.time[8].time1 + "</td><td>" + message.time[6].time1 + "</td><td>" + message.time[7].time1 + "</td><td>" + message.time[0].time1 + "</td><td>" + message.time[1].time1 + "</td> </tr>",
                text6 = "<tr> <td>1</td><td>" + message.time[2].time2 + "</td><td>" + message.time[9].time2 + "</td><td>" + message.time[10].time2 + "</td><td>" + message.time[5].time2 + "</td><td>" + message.time[3].time2 + "</td><td>" + message.time[4].time2 + "</td><td>" + message.time[8].time2 + "</td><td>" + message.time[6].time2 + "</td><td>" + message.time[7].time2 + "</td><td>" + message.time[0].time2 + "</td><td>" + message.time[1].time2 + "</td> </tr>",
                text7 = "<tr> <td>2</td><td>" + message.time[2].time3 + "</td><td>" + message.time[9].time3 + "</td><td>" + message.time[10].time3 + "</td><td>" + message.time[5].time3 + "</td><td>" + message.time[3].time3 + "</td><td>" + message.time[4].time3 + "</td><td>" + message.time[8].time3 + "</td><td>" + message.time[6].time3 + "</td><td>" + message.time[7].time3 + "</td><td>" + message.time[0].time3 + "</td><td>" + message.time[1].time3 + "</td> </tr>",
                text8 = "<tr> <td>3</td><td>" + message.time[2].time4 + "</td><td>" + message.time[9].time4 + "</td><td>" + message.time[10].time4 + "</td><td>" + message.time[5].time4 + "</td><td>" + message.time[3].time4 + "</td><td>" + message.time[4].time4 + "</td><td>" + message.time[8].time4 + "</td><td>" + message.time[6].time4 + "</td><td>" + message.time[7].time4 + "</td><td>" + message.time[0].time4 + "</td><td>" + message.time[1].time4 + "</td> </tr>",
                text9 = "<tr> <td>4</td><td>" + message.time[2].time5 + "</td><td>" + message.time[9].time5 + "</td><td>" + message.time[10].time5 + "</td><td>" + message.time[5].time5 + "</td><td>" + message.time[3].time5 + "</td><td>" + message.time[4].time5 + "</td><td>" + message.time[8].time5 + "</td><td>" + message.time[6].time5 + "</td><td>" + message.time[7].time5 + "</td><td>" + message.time[0].time5 + "</td><td>" + message.time[1].time5 + "</td> </tr>",
                text10 = "<tr> <td>5</td><td>" + message.time[2].time6 + "</td><td>" + message.time[9].time6 + "</td><td>" + message.time[10].time6 + "</td><td>" + message.time[5].time6 + "</td><td>" + message.time[3].time6 + "</td><td>" + message.time[4].time6 + "</td><td>" + message.time[8].time6 + "</td><td>" + message.time[6].time6 + "</td><td>" + message.time[7].time6 + "</td><td>" + message.time[0].time6 + "</td><td>" + message.time[1].time6 + "</td> </tr>",
                text11 = "<tr> <td>6</td><td>" + message.time[2].time7 + "</td><td>" + message.time[9].time7 + "</td><td>" + message.time[10].time7 + "</td><td>" + message.time[5].time7 + "</td><td>" + message.time[3].time7 + "</td><td>" + message.time[4].time7 + "</td><td>" + message.time[8].time7 + "</td><td>" + message.time[6].time7 + "</td><td>" + message.time[7].time7 + "</td><td>" + message.time[0].time7 + "</td><td>" + message.time[1].time7 + "</td> </tr>",
                text12 = "<tr> <td>7</td><td>" + message.time[2].time8 + "</td><td>" + message.time[9].time8 + "</td><td>" + message.time[10].time8 + "</td><td>" + message.time[5].time8 + "</td><td>" + message.time[3].time8 + "</td><td>" + message.time[4].time8 + "</td><td>" + message.time[8].time8 + "</td><td>" + message.time[6].time8 + "</td><td>" + message.time[7].time8 + "</td><td>" + message.time[0].time8 + "</td><td>" + message.time[1].time8 + "</td> </tr>",
                text13 = "<tr> <td>8</td><td>" + message.time[2].time9 + "</td><td>" + message.time[9].time9 + "</td><td>" + message.time[10].time9 + "</td><td>" + message.time[5].time9 + "</td><td>" + message.time[3].time9 + "</td><td>" + message.time[4].time9 + "</td><td>" + message.time[8].time9 + "</td><td>" + message.time[6].time9 + "</td><td>" + message.time[7].time9 + "</td><td>" + message.time[0].time9 + "</td><td>" + message.time[1].time9 + "</td> </tr>",
                text14 = "<tr><td>9</td><td>" + message.time[2].time10 + "</td><td>" + message.time[9].time10 + "</td><td>" + message.time[10].time10 + "</td><td>" + message.time[5].time10 + "</td><td>" + message.time[3].time10 + "</td><td>" + message.time[4].time10 + "</td><td>" + message.time[8].time10 + "</td><td>" + message.time[6].time10 + "</td><td>" + message.time[7].time10 + "</td><td>" + message.time[0].time10 + "</td><td>" + message.time[1].time10 + "</td> </tr>",
                text15 = "<tr> <td>10</td><td>" + message.time[2].time11 + "</td><td>" + message.time[9].time11 + "</td><td>" + message.time[10].time11 + "</td><td>" + message.time[5].time11 + "</td><td>" + message.time[3].time11 + "</td><td>" + message.time[4].time11 + "</td><td>" + message.time[8].time11 + "</td><td>" + message.time[6].time11 + "</td><td>" + message.time[7].time11 + "</td><td>" + message.time[0].time11 + "</td><td>" + message.time[1].time11 + "</td> </tr>",
                text16 = "<tr><td>11</td><td>" + message.time[2].time12 + "</td><td>" + message.time[9].time12 + "</td><td>" + message.time[10].time12 + "</td><td>" + message.time[5].time12 + "</td><td>" + message.time[3].time12 + "</td><td>" + message.time[4].time12 + "</td><td>" + message.time[8].time12 + "</td><td>" + message.time[6].time12 + "</td><td>" + message.time[7].time12 + "</td><td>" + message.time[0].time12 + "</td><td>" + message.time[1].time12 + "</td> </tr>",
                text17 = "<tr> <td>12</td><td>" + message.time[2].time13 + "</td><td>" + message.time[9].time13 + "</td><td>" + message.time[10].time13 + "</td><td>" + message.time[5].time13 + "</td><td>" + message.time[3].time13 + "</td><td>" + message.time[4].time13 + "</td><td>" + message.time[8].time13 + "</td><td>" + message.time[6].time13 + "</td><td>" + message.time[7].time13 + "</td><td>" + message.time[0].time13 + "</td><td>" + message.time[1].time13 + "</td> </tr>",
                text18 = "<tr> <td>13</td><td>" + message.time[2].time14 + "</td><td>" + message.time[9].time14 + "</td><td>" + message.time[10].time14 + "</td><td>" + message.time[5].time14 + "</td><td>" + message.time[3].time14 + "</td><td>" + message.time[4].time14 + "</td><td>" + message.time[8].time14 + "</td><td>" + message.time[6].time14 + "</td><td>" + message.time[7].time14 + "</td><td>" + message.time[0].time14 + "</td><td>" + message.time[1].time14 + "</td> </tr>",
                text19 = "<tr> <td>14</td><td>" + message.time[2].time15 + "</td><td>" + message.time[9].time15 + "</td><td>" + message.time[10].time15 + "</td><td>" + message.time[5].time15 + "</td><td>" + message.time[3].time15 + "</td><td>" + message.time[4].time15 + "</td><td>" + message.time[8].time15 + "</td><td>" + message.time[6].time15 + "</td><td>" + message.time[7].time15 + "</td><td>" + message.time[0].time15 + "</td><td>" + message.time[1].time15 + "</td> </tr>",
                text20 = "<tr> <td>15</td><td>" + message.time[2].time16 + "</td><td>" + message.time[9].time16 + "</td><td>" + message.time[10].time16 + "</td><td>" + message.time[5].time16 + "</td><td>" + message.time[3].time16 + "</td><td>" + message.time[4].time16 + "</td><td>" + message.time[8].time16 + "</td><td>" + message.time[6].time16 + "</td><td>" + message.time[7].time16 + "</td><td>" + message.time[0].time16 + "</td><td>" + message.time[1].time16 + "</td> </tr>",
                text21 = "<tr> <td>16</td><td>" + message.time[2].time17 + "</td><td>" + message.time[9].time17 + "</td><td>" + message.time[10].time17 + "</td><td>" + message.time[5].time17 + "</td><td>" + message.time[3].time17 + "</td><td>" + message.time[4].time17 + "</td><td>" + message.time[8].time17 + "</td><td>" + message.time[6].time17 + "</td><td>" + message.time[7].time17 + "</td><td>" + message.time[0].time17 + "</td><td>" + message.time[1].time17 + "</td> </tr>",
                text22 = "<tr> <td>17</td><td>" + message.time[2].time18 + "</td><td>" + message.time[9].time18 + "</td><td>" + message.time[10].time18 + "</td><td>" + message.time[5].time18 + "</td><td>" + message.time[3].time18 + "</td><td>" + message.time[4].time18 + "</td><td>" + message.time[8].time18 + "</td><td>" + message.time[6].time18 + "</td><td>" + message.time[7].time18 + "</td><td>" + message.time[0].time18 + "</td><td>" + message.time[1].time18 + "</td> </tr>",
                text23 = "<tr> <td>18</td><td>" + message.time[2].time19 + "</td><td>" + message.time[9].time19 + "</td><td>" + message.time[10].time19 + "</td><td>" + message.time[5].time19 + "</td><td>" + message.time[3].time19 + "</td><td>" + message.time[4].time19 + "</td><td>" + message.time[8].time19 + "</td><td>" + message.time[6].time19 + "</td><td>" + message.time[7].time19 + "</td><td>" + message.time[0].time19 + "</td><td>" + message.time[1].time19 + "</td> </tr>",
                text24 = "<tr> <td>19</td><td>" + message.time[2].time20 + "</td><td>" + message.time[9].time20 + "</td><td>" + message.time[10].time20 + "</td><td>" + message.time[5].time20 + "</td><td>" + message.time[3].time20 + "</td><td>" + message.time[4].time20 + "</td><td>" + message.time[8].time20 + "</td><td>" + message.time[6].time20 + "</td><td>" + message.time[7].time20 + "</td><td>" + message.time[0].time20 + "</td><td>" + message.time[1].time20 + "</td> </tr>",
                text25 = "<tr> <td>20</td><td>" + message.time[2].time21 + "</td><td>" + message.time[9].time21 + "</td><td>" + message.time[10].time21 + "</td><td>" + message.time[5].time21 + "</td><td>" + message.time[3].time21 + "</td><td>" + message.time[4].time21 + "</td><td>" + message.time[8].time21 + "</td><td>" + message.time[6].time21 + "</td><td>" + message.time[7].time21 + "</td><td>" + message.time[0].time21 + "</td><td>" + message.time[1].time21 + "</td> </tr>",
                text26 = "<tr> <td>21</td><td>" + message.time[2].time22 + "</td><td>" + message.time[9].time22 + "</td><td>" + message.time[10].time22 + "</td><td>" + message.time[5].time22 + "</td><td>" + message.time[3].time22 + "</td><td>" + message.time[4].time22 + "</td><td>" + message.time[8].time22 + "</td><td>" + message.time[6].time22 + "</td><td>" + message.time[7].time22 + "</td><td>" + message.time[0].time22 + "</td><td>" + message.time[1].time22 + "</td> </tr>",
                text27 = "<tr> <td>22</td><td>" + message.time[2].time23 + "</td><td>" + message.time[9].time23 + "</td><td>" + message.time[10].time23 + "</td><td>" + message.time[5].time23 + "</td><td>" + message.time[3].time23 + "</td><td>" + message.time[4].time23 + "</td><td>" + message.time[8].time23 + "</td><td>" + message.time[6].time23 + "</td><td>" + message.time[7].time23 + "</td><td>" + message.time[0].time23 + "</td><td>" + message.time[1].time23 + "</td> </tr>",
                text28 = "<tr> <td>23</td><td>" + message.time[2].time24 + "</td><td>" + message.time[9].time24 + "</td><td>" + message.time[10].time24 + "</td><td>" + message.time[5].time24 + "</td><td>" + message.time[3].time24 + "</td><td>" + message.time[4].time24 + "</td><td>" + message.time[8].time24 + "</td><td>" + message.time[6].time24 + "</td><td>" + message.time[7].time24 + "</td><td>" + message.time[0].time24 + "</td><td>" + message.time[1].time24 + "</td> </tr>"

            $("#typical-winterAddHumidity").append(text1 + text2 + text3 + text4 + "/tr" + text5 + "/tr" + text6 + "/tr" + text7 + "/tr" + text8 + "/tr" + text9 + "/tr" + text10 + "/tr" + text11 + "/tr" + text12 + "/tr" + text13 + "/tr" +
                text14 + "/tr" + text15 + "/tr" + text16 + "/tr" + text17 + text18 + text19 + "/tr" + text20 + "/tr" + text21 + "/tr" + text22 + "/tr" + text23 + "/tr" + text24 + "/tr" + text25 + "/tr" + text26 + "/tr" +
                text27 + "/tr" + text28 + "/tr");
            }
        },
        error: function() {

        }
    });
}
//夏季新风计算室外计算参数
function getSummerNewWind() {
    $.ajax({
        url: "/apis/building/winterSummerTypical/getsummernewwind?id=" +  document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.summernewwindparamList.length==0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-summerNewWind tr").html('');
            }else{


            var text1 = '<tr><td rowspan="28"><div style="writing-mode: tb-rl;">夏季新风计算室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td colspan="2">累年平均每年不保证10小时</td><td colspan="2">累年平均每年不保证50小时</td><td colspan="2">累年平均每年不保证100小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">焓值逐时变化系数</td><td rowspan="4">干球温度逐时变化系数</td></tr>',
                text2 = '<tr><td rowspan="2">日均值</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td></tr>',
                text3 = '<tr><td>' + message.summernewwindparamList[0].param1 + '</td><td>' + message.summernewwindparamList[0].param2 + '</td><td>' + message.summernewwindparamList[0].param3 + '</td><td>' + message.summernewwindparamList[0].param4 + '</td><td>' + message.summernewwindparamList[0].param5 + '</td><td>' + message.summernewwindparamList[0].param6 + '</td></tr>',
                text4 = '<tr><td>计算参数</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td></tr>',
                text5 = '<tr><td>0</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.yearAvgTenEnthaList[0].time1 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time1 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time1 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time1 + '</td><td>' + message.yearAvgHundredEnthaList[0].time1 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time1 + '</td><td>' + message.enthalpyList[0].time1 + '</td><td>' + message.drybulbTemperList[0].time1 + '</td></tr>',
                text6 = '<tr><td>1</td><td>' + message.yearAvgTenEnthaList[0].time2 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time2 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time2 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time2 + '</td><td>' + message.yearAvgHundredEnthaList[0].time2 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time2 + '</td><td>' + message.enthalpyList[0].time2 + '</td><td>' + message.drybulbTemperList[0].time2 + '</td></tr>',
                text7 = '<tr><td>2</td><td>' + message.yearAvgTenEnthaList[0].time3 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time3 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time3 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time3 + '</td><td>' + message.yearAvgHundredEnthaList[0].time3 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time3 + '</td><td>' + message.enthalpyList[0].time3 + '</td><td>' + message.drybulbTemperList[0].time3 + '</td></tr>',
                text8 = '<tr><td>3</td><td>' + message.yearAvgTenEnthaList[0].time4 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time4 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time4 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time4 + '</td><td>' + message.yearAvgHundredEnthaList[0].time4 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time4 + '</td><td>' + message.enthalpyList[0].time4 + '</td><td>' + message.drybulbTemperList[0].time4 + '</td></tr>',
                text9 = '<tr><td>4</td><td>' + message.yearAvgTenEnthaList[0].time5 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time5 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time5 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time5 + '</td><td>' + message.yearAvgHundredEnthaList[0].time5 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time5 + '</td><td>' + message.enthalpyList[0].time5 + '</td><td>' + message.drybulbTemperList[0].time5 + '</td></tr>',
                text10 = '<tr><td>5</td><td>' + message.yearAvgTenEnthaList[0].time6 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time6 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time6 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time6 + '</td><td>' + message.yearAvgHundredEnthaList[0].time6 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time6 + '</td><td>' + message.enthalpyList[0].time6 + '</td><td>' + message.drybulbTemperList[0].time6 + '</td></tr>',
                text11 = '<tr><td>6</td><td>' + message.yearAvgTenEnthaList[0].time7 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time7 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time7 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time7 + '</td><td>' + message.yearAvgHundredEnthaList[0].time7 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time7 + '</td><td>' + message.enthalpyList[0].time7 + '</td><td>' + message.drybulbTemperList[0].time7 + '</td></tr>',
                text12 = '<tr><td>7</td><td>' + message.yearAvgTenEnthaList[0].time8 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time8 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time8 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time8 + '</td><td>' + message.yearAvgHundredEnthaList[0].time8 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time8 + '</td><td>' + message.enthalpyList[0].time8 + '</td><td>' + message.drybulbTemperList[0].time8 + '</td></tr>',
                text13 = '<tr><td>8</td><td>' + message.yearAvgTenEnthaList[0].time9 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time9 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time9 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time9 + '</td><td>' + message.yearAvgHundredEnthaList[0].time9 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time9 + '</td><td>' + message.enthalpyList[0].time9 + '</td><td>' + message.drybulbTemperList[0].time9 + '</td></tr>',
                text14 = '<tr><td>9</td><td>' + message.yearAvgTenEnthaList[0].time10 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time10 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time10 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time10 + '</td><td>' + message.yearAvgHundredEnthaList[0].time10 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time10 + '</td><td>' + message.enthalpyList[0].time10 + '</td><td>' + message.drybulbTemperList[0].time10 + '</td></tr>',
                text15 = '<tr><td>10</td><td>' + message.yearAvgTenEnthaList[0].time11 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time11 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time11 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time11 + '</td><td>' + message.yearAvgHundredEnthaList[0].time11 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time11 + '</td><td>' + message.enthalpyList[0].time11 + '</td><td>' + message.drybulbTemperList[0].time11 + '</td></tr>',
                text16 = '<tr><td>11</td><td>' + message.yearAvgTenEnthaList[0].time12 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time12 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time12 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time12 + '</td><td>' + message.yearAvgHundredEnthaList[0].time12 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time12 + '</td><td>' + message.enthalpyList[0].time12 + '</td><td>' + message.drybulbTemperList[0].time12 + '</td></tr>',
                text17 = '<tr><td>12</td><td>' + message.yearAvgTenEnthaList[0].time13 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time13 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time13 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time13 + '</td><td>' + message.yearAvgHundredEnthaList[0].time13 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time13 + '</td><td>' + message.enthalpyList[0].time13 + '</td><td>' + message.drybulbTemperList[0].time13 + '</td></tr>',
                text18 = '<tr><td>13</td><td>' + message.yearAvgTenEnthaList[0].time14 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time14 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time14 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time14 + '</td><td>' + message.yearAvgHundredEnthaList[0].time14 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time14 + '</td><td>' + message.enthalpyList[0].time14 + '</td><td>' + message.drybulbTemperList[0].time14 + '</td></tr>',
                text19 = '<tr><td>14</td><td>' + message.yearAvgTenEnthaList[0].time15 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time15 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time15 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time15 + '</td><td>' + message.yearAvgHundredEnthaList[0].time15 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time15 + '</td><td>' + message.enthalpyList[0].time15 + '</td><td>' + message.drybulbTemperList[0].time15 + '</td></tr>',
                text20 = '<tr><td>15</td><td>' + message.yearAvgTenEnthaList[0].time16 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time16 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time16 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time16 + '</td><td>' + message.yearAvgHundredEnthaList[0].time16 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time16 + '</td><td>' + message.enthalpyList[0].time16 + '</td><td>' + message.drybulbTemperList[0].time16 + '</td></tr>',
                text21 = '<tr><td>16</td><td>' + message.yearAvgTenEnthaList[0].time17 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time17 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time17 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time17 + '</td><td>' + message.yearAvgHundredEnthaList[0].time17 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time17 + '</td><td>' + message.enthalpyList[0].time17 + '</td><td>' + message.drybulbTemperList[0].time17 + '</td></tr>',
                text22 = '<tr><td>17</td><td>' + message.yearAvgTenEnthaList[0].time18 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time18 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time18 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time18 + '</td><td>' + message.yearAvgHundredEnthaList[0].time18 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time18 + '</td><td>' + message.enthalpyList[0].time18 + '</td><td>' + message.drybulbTemperList[0].time18 + '</td></tr>',
                text23 = '<tr><td>18</td><td>' + message.yearAvgTenEnthaList[0].time19 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time19 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time19 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time19 + '</td><td>' + message.yearAvgHundredEnthaList[0].time19 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time19 + '</td><td>' + message.enthalpyList[0].time19 + '</td><td>' + message.drybulbTemperList[0].time19 + '</td></tr>',
                text24 = '<tr><td>19</td><td>' + message.yearAvgTenEnthaList[0].time20 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time20 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time20 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time20 + '</td><td>' + message.yearAvgHundredEnthaList[0].time20 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time20 + '</td><td>' + message.enthalpyList[0].time20 + '</td><td>' + message.drybulbTemperList[0].time20 + '</td></tr>',
                text25 = '<tr><td>20</td><td>' + message.yearAvgTenEnthaList[0].time21 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time21 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time21 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time21 + '</td><td>' + message.yearAvgHundredEnthaList[0].time21 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time21 + '</td><td>' + message.enthalpyList[0].time21 + '</td><td>' + message.drybulbTemperList[0].time21 + '</td></tr>',
                text26 = '<tr><td>21</td><td>' + message.yearAvgTenEnthaList[0].time22 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time22 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time22 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time22 + '</td><td>' + message.yearAvgHundredEnthaList[0].time22 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time22 + '</td><td>' + message.enthalpyList[0].time22 + '</td><td>' + message.drybulbTemperList[0].time22 + '</td></tr>',
                text27 = '<tr><td>22</td><td>' + message.yearAvgTenEnthaList[0].time23 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time23 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time23 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time23 + '</td><td>' + message.yearAvgHundredEnthaList[0].time23 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time23 + '</td><td>' + message.enthalpyList[0].time23 + '</td><td>' + message.drybulbTemperList[0].time23 + '</td></tr>',
                text28 = '<tr><td>23</td><td>' + message.yearAvgTenEnthaList[0].time24 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time24 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time24 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time24 + '</td><td>' + message.yearAvgHundredEnthaList[0].time24 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time24 + '</td><td>' + message.enthalpyList[0].time24 + '</td><td>' + message.drybulbTemperList[0].time24 + '</td></tr>';

            $("#typical-summerNewWind").append(text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10 + text11 + text12 + text13 +
                text14 + text15 + text16 + text17 + text18 + text19 + text20 + text21 + text22 + text23 + text24 + text25 + text26 +
                text27 + text28);
        }
        },
        error: function() {

        }
    });
}
//冬季新风计算室外计算参数
function getWinterNewWind() {
    $.ajax({
        url: "/apis/building/winterSummerTypical/getwinternewwind?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.winternewwindparamList.length==0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                $("#typical-winterNewWind tr").html('');
            }else{


            var text1 = '<tr><td rowspan="28"><div style="writing-mode: tb-rl;">冬季新风计算室外计算参数</div></td><td rowspan="4">时刻（h）</td><td rowspan="28"><div style="writing-mode: tb-rl;">参数类型</div></td><td>不保证时长</td><td colspan="2">累年平均每年不保证10小时</td><td colspan="2">累年平均每年不保证50小时</td><td colspan="2">累年平均每年不保证100小时</td><td rowspan="28"><div style="writing-mode: tb-rl;">系数类型</div></td><td rowspan="4">焓值逐时变化系数</td><td rowspan="4">干球温度逐时变化系数</td></tr>',
                text2 = '<tr><td rowspan="2">日均值</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td></tr>',
                text3 = '<tr><td>' + message.winternewwindparamList[0].param1 + '</td><td>' + message.winternewwindparamList[0].param2 + '</td><td>' + message.winternewwindparamList[0].param3 + '</td><td>' + message.winternewwindparamList[0].param4 + '</td><td>' + message.winternewwindparamList[0].param5 + '</td><td>' + message.winternewwindparamList[0].param6 + '</td></tr>',
                text4 = '<tr><td>计算参数</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td><td>焓值（kJ/kg）</td><td>干球温度（℃）</td></tr>',
                text5 = '<tr><td>0</td><td rowspan="24"><div style="writing-mode: tb-rl;">多不保证率日工况参数</div></td><td>' + message.yearAvgTenEnthaList[0].time1 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time1 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time1 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time1 + '</td><td>' + message.yearAvgHundredEnthaList[0].time1 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time1 + '</td><td>' + message.enthalpyList[0].time1 + '</td><td>' + message.drybulbTemperList[0].time1 + '</td></tr>',
                text6 = '<tr><td>1</td><td>' + message.yearAvgTenEnthaList[0].time2 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time2 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time2 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time2 + '</td><td>' + message.yearAvgHundredEnthaList[0].time2 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time2 + '</td><td>' + message.enthalpyList[0].time2 + '</td><td>' + message.drybulbTemperList[0].time2 + '</td></tr>',
                text7 = '<tr><td>2</td><td>' + message.yearAvgTenEnthaList[0].time3 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time3 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time3 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time3 + '</td><td>' + message.yearAvgHundredEnthaList[0].time3 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time3 + '</td><td>' + message.enthalpyList[0].time3 + '</td><td>' + message.drybulbTemperList[0].time3 + '</td></tr>',
                text8 = '<tr><td>3</td><td>' + message.yearAvgTenEnthaList[0].time4 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time4 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time4 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time4 + '</td><td>' + message.yearAvgHundredEnthaList[0].time4 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time4 + '</td><td>' + message.enthalpyList[0].time4 + '</td><td>' + message.drybulbTemperList[0].time4 + '</td></tr>',
                text9 = '<tr><td>4</td><td>' + message.yearAvgTenEnthaList[0].time5 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time5 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time5 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time5 + '</td><td>' + message.yearAvgHundredEnthaList[0].time5 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time5 + '</td><td>' + message.enthalpyList[0].time5 + '</td><td>' + message.drybulbTemperList[0].time5 + '</td></tr>',
                text10 = '<tr><td>5</td><td>' + message.yearAvgTenEnthaList[0].time6 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time6 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time6 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time6 + '</td><td>' + message.yearAvgHundredEnthaList[0].time6 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time6 + '</td><td>' + message.enthalpyList[0].time6 + '</td><td>' + message.drybulbTemperList[0].time6 + '</td></tr>',
                text11 = '<tr><td>6</td><td>' + message.yearAvgTenEnthaList[0].time7 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time7 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time7 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time7 + '</td><td>' + message.yearAvgHundredEnthaList[0].time7 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time7 + '</td><td>' + message.enthalpyList[0].time7 + '</td><td>' + message.drybulbTemperList[0].time7 + '</td></tr>',
                text12 = '<tr><td>7</td><td>' + message.yearAvgTenEnthaList[0].time8 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time8 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time8 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time8 + '</td><td>' + message.yearAvgHundredEnthaList[0].time8 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time8 + '</td><td>' + message.enthalpyList[0].time8 + '</td><td>' + message.drybulbTemperList[0].time8 + '</td></tr>',
                text13 = '<tr><td>8</td><td>' + message.yearAvgTenEnthaList[0].time9 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time9 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time9 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time9 + '</td><td>' + message.yearAvgHundredEnthaList[0].time9 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time9 + '</td><td>' + message.enthalpyList[0].time9 + '</td><td>' + message.drybulbTemperList[0].time9 + '</td></tr>',
                text14 = '<tr><td>9</td><td>' + message.yearAvgTenEnthaList[0].time10 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time10 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time10 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time10 + '</td><td>' + message.yearAvgHundredEnthaList[0].time10 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time10 + '</td><td>' + message.enthalpyList[0].time10 + '</td><td>' + message.drybulbTemperList[0].time10 + '</td></tr>',
                text15 = '<tr><td>10</td><td>' + message.yearAvgTenEnthaList[0].time11 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time11 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time11 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time11 + '</td><td>' + message.yearAvgHundredEnthaList[0].time11 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time11 + '</td><td>' + message.enthalpyList[0].time11 + '</td><td>' + message.drybulbTemperList[0].time11 + '</td></tr>',
                text16 = '<tr><td>11</td><td>' + message.yearAvgTenEnthaList[0].time12 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time12 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time12 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time12 + '</td><td>' + message.yearAvgHundredEnthaList[0].time12 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time12 + '</td><td>' + message.enthalpyList[0].time12 + '</td><td>' + message.drybulbTemperList[0].time12 + '</td></tr>',
                text17 = '<tr><td>12</td><td>' + message.yearAvgTenEnthaList[0].time13 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time13 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time13 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time13 + '</td><td>' + message.yearAvgHundredEnthaList[0].time13 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time13 + '</td><td>' + message.enthalpyList[0].time13 + '</td><td>' + message.drybulbTemperList[0].time13 + '</td></tr>',
                text18 = '<tr><td>13</td><td>' + message.yearAvgTenEnthaList[0].time14 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time14 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time14 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time14 + '</td><td>' + message.yearAvgHundredEnthaList[0].time14 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time14 + '</td><td>' + message.enthalpyList[0].time14 + '</td><td>' + message.drybulbTemperList[0].time14 + '</td></tr>',
                text19 = '<tr><td>14</td><td>' + message.yearAvgTenEnthaList[0].time15 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time15 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time15 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time15 + '</td><td>' + message.yearAvgHundredEnthaList[0].time15 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time15 + '</td><td>' + message.enthalpyList[0].time15 + '</td><td>' + message.drybulbTemperList[0].time15 + '</td></tr>',
                text20 = '<tr><td>15</td><td>' + message.yearAvgTenEnthaList[0].time16 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time16 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time16 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time16 + '</td><td>' + message.yearAvgHundredEnthaList[0].time16 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time16 + '</td><td>' + message.enthalpyList[0].time16 + '</td><td>' + message.drybulbTemperList[0].time16 + '</td></tr>',
                text21 = '<tr><td>16</td><td>' + message.yearAvgTenEnthaList[0].time17 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time17 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time17 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time17 + '</td><td>' + message.yearAvgHundredEnthaList[0].time17 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time17 + '</td><td>' + message.enthalpyList[0].time17 + '</td><td>' + message.drybulbTemperList[0].time17 + '</td></tr>',
                text22 = '<tr><td>17</td><td>' + message.yearAvgTenEnthaList[0].time18 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time18 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time18 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time18 + '</td><td>' + message.yearAvgHundredEnthaList[0].time18 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time18 + '</td><td>' + message.enthalpyList[0].time18 + '</td><td>' + message.drybulbTemperList[0].time18 + '</td></tr>',
                text23 = '<tr><td>18</td><td>' + message.yearAvgTenEnthaList[0].time19 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time19 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time19 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time19 + '</td><td>' + message.yearAvgHundredEnthaList[0].time19 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time19 + '</td><td>' + message.enthalpyList[0].time19 + '</td><td>' + message.drybulbTemperList[0].time19 + '</td></tr>',
                text24 = '<tr><td>19</td><td>' + message.yearAvgTenEnthaList[0].time20 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time20 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time20 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time20 + '</td><td>' + message.yearAvgHundredEnthaList[0].time20 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time20 + '</td><td>' + message.enthalpyList[0].time20 + '</td><td>' + message.drybulbTemperList[0].time20 + '</td></tr>',
                text25 = '<tr><td>20</td><td>' + message.yearAvgTenEnthaList[0].time21 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time21 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time21 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time21 + '</td><td>' + message.yearAvgHundredEnthaList[0].time21 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time21 + '</td><td>' + message.enthalpyList[0].time21 + '</td><td>' + message.drybulbTemperList[0].time21 + '</td></tr>',
                text26 = '<tr><td>21</td><td>' + message.yearAvgTenEnthaList[0].time22 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time22 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time22 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time22 + '</td><td>' + message.yearAvgHundredEnthaList[0].time22 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time22 + '</td><td>' + message.enthalpyList[0].time22 + '</td><td>' + message.drybulbTemperList[0].time22 + '</td></tr>',
                text27 = '<tr><td>22</td><td>' + message.yearAvgTenEnthaList[0].time23 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time23 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time23 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time23 + '</td><td>' + message.yearAvgHundredEnthaList[0].time23 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time23 + '</td><td>' + message.enthalpyList[0].time23 + '</td><td>' + message.drybulbTemperList[0].time23 + '</td></tr>',
                text28 = '<tr><td>23</td><td>' + message.yearAvgTenEnthaList[0].time24 + '</td><td>' + message.yearAvgTendrybuldTempList[0].time24 + '</td><td>' + message.yearAvgFiftyEnthaList[0].time24 + '</td><td>' + message.yearAvgFiftydrybulbTempList[0].time24 + '</td><td>' + message.yearAvgHundredEnthaList[0].time24 + '</td><td>' + message.yearAvgHundreddrybulbTempList[0].time24 + '</td><td>' + message.enthalpyList[0].time24 + '</td><td>' + message.drybulbTemperList[0].time24 + '</td></tr>';

            $("#typical-winterNewWind").append(text1 + text2 + text3 + text4 + text5 + text6 + text7 + text8 + text9 + text10 + text11 + text12 + text13 +
                text14 + text15 + text16 + text17 + text18 + text19 + text20 + text21 + text22 + text23 + text24 + text25 + text26 +
                text27 + text28);
        }
        },
        error: function() {

        }
    });
}

//民用建筑供暖通风与空气调节设计规范附表参数
function getNormParm() {
    var number = document.getElementById('number').value
    $.ajax({
        url: "/apis/building/outdoorparm/getparam?id=" + 1,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(datainfo) {
                    var latitude1 = datainfo.stationinfo.latitude
                    latitude1 = latitude1.toFixed(2)
                    var longitude1 = datainfo.stationinfo.longitude
                    longitude1 = longitude1.toFixed(2)

                    $("#normParam").find("tr").eq(0).find("td").eq(1).text(datainfo.stationinfo.cityName);
                    $("#normParam").find("tr").eq(1).find("td").eq(1).text(datainfo.stationinfo.province);
                    $("#normParam").find("tr").eq(2).find("td").eq(1).text(datainfo.stationinfo.climates);
                    $("#normParam").find("tr").eq(3).find("td").eq(2).text(latitude1);
                    $("#normParam").find("tr").eq(4).find("td").eq(1).text(longitude1);
                    $("#normParam").find("tr").eq(5).find("td").eq(1).text(datainfo.stationinfo.altitude);
                    $("#normParam").find("tr").eq(6).find("td").eq(1).text(message.param[0].years);
                    $("#normParam").find("tr").eq(7).find("td").eq(1).text(message.param[0].yearAveTem);
                    $("#normParam").find("tr").eq(8).find("td").eq(2).text(message.param[0].temperHeatOut);
                    $("#normParam").find("tr").eq(9).find("td").eq(1).text(message.param[0].temperWinVenOut);
                    $("#normParam").find("tr").eq(10).find("td").eq(1).text(message.param[0].temperWinAirOut);
                    $("#normParam").find("tr").eq(11).find("td").eq(1).text(message.param[0].humidityWinAirRelative);
                    $("#normParam").find("tr").eq(12).find("td").eq(1).text(message.param[0].temperSumAirDry);
                    $("#normParam").find("tr").eq(13).find("td").eq(1).text(message.param[0].temperSumAirHum);
                    $("#normParam").find("tr").eq(14).find("td").eq(1).text(message.param[0].temperSumVenOut);
                    $("#normParam").find("tr").eq(15).find("td").eq(1).text(message.param[0].humiditySumVenRelative);
                    $("#normParam").find("tr").eq(16).find("td").eq(1).text(message.param[0].temperSumAirDayAve);
                    $("#normParam").find("tr").eq(17).find("td").eq(2).text(message.param[0].windSpeedSumAve);
                    $("#normParam").find("tr").eq(18).find("td").eq(1).text(message.param[0].windDirectSumMost);
                    $("#normParam").find("tr").eq(19).find("td").eq(1).text(message.param[0].windDirectSumMostFre);
                    $("#normParam").find("tr").eq(20).find("td").eq(1).text(message.param[0].windSpeedSumMostAve);
                    $("#normParam").find("tr").eq(21).find("td").eq(1).text(message.param[0].windSpeedWinAve);
                    $("#normParam").find("tr").eq(22).find("td").eq(1).text(message.param[0].windDirectWinMost);
                    $("#normParam").find("tr").eq(23).find("td").eq(1).text(message.param[0].windDirectWinMostFre);
                    $("#normParam").find("tr").eq(24).find("td").eq(1).text(message.param[0].windSpeedWinMostAve);
                    $("#normParam").find("tr").eq(25).find("td").eq(1).text(message.param[0].windDirectYearMost);
                    $("#normParam").find("tr").eq(26).find("td").eq(1).text(message.param[0].windDirectYearMostFre);
                    $("#normParam").find("tr").eq(27).find("td").eq(1).text(message.param[0].sunlightWinPer);
                    $("#normParam").find("tr").eq(28).find("td").eq(1).text(message.param[0].deepFrozenMost);
                    $("#normParam").find("tr").eq(29).find("td").eq(2).text(message.param[0].atmosWinOut);
                    $("#normParam").find("tr").eq(30).find("td").eq(1).text(message.param[0].atmosSumOut);
                    $("#normParam").find("tr").eq(31).find("td").eq(2).text(message.param[0].temperDayAveLess5Day);
                    $("#normParam").find("tr").eq(32).find("td").eq(1).text(message.param[0].temperDayAveLess5be);
                    $("#normParam").find("tr").eq(33).find("td").eq(1).text(message.param[0].temperAveLess5Ave);
                    $("#normParam").find("tr").eq(34).find("td").eq(1).text(message.param[0].temperDayAveLess8Day);
                    $("#normParam").find("tr").eq(35).find("td").eq(1).text(message.param[0].temperDayAveLess8be);
                    $("#normParam").find("tr").eq(36).find("td").eq(1).text(message.param[0].temperAveLess8Ave);
                    $("#normParam").find("tr").eq(37).find("td").eq(1).text(message.param[0].temperMax);
                    $("#normParam").find("tr").eq(38).find("td").eq(1).text(message.param[0].temperMin);
                },
                error: function() {

                }
            });
        },
        error: function() {

        }
    });
}

//工业建筑供暖通风与空气调节规范附表参数
function getIndustrialBuildingParam() {
    var number = document.getElementById('number').value
    $.ajax({
        url: "/apis/building/outdoorparm/getindustryparam?id=" + 1,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(datainfo) {
                    console.log(datainfo);
                    var text = '<tr><td>' + datainfo.stationinfo.cityName + '</td><td>' + datainfo.stationinfo.province + '</td><td>' + datainfo.stationinfo.climates + '</td><td>' + datainfo.stationinfo.latitude + '</td><td>' + datainfo.stationinfo.longitude + '</td><td>' + datainfo.stationinfo.altitude + '</td><td>' + message.param[0].year + '</td><td>' + message.param[0].maxTemperAvg + '</td><td>' + message.param[0].minTemperAvg + '</td><td>' + message.param[0].minDayAvg + '</td><td>' + message.param[0].maxMonthAvg + '</td></tr>';
                    if ($("#Industrial-building-param tr").eq(2).length !== 0) {
                        document.getElementById('Industrial-building-param').deleteRow(2);
                    }
                    $("#Industrial-building-param").append(text);
                    $.ajax({
                        url: "/apis/building/outdoorparm/getaddsummernewwind?id=" + 1,
                        type: "get",
                        contentType: "application/json",
                        dataType: "json",
                        success: function(addmessage) {
                            console.log(addmessage);
                            var text = '<tr><td>' + datainfo.stationinfo.cityName + '</td><td>' + datainfo.stationinfo.province + '</td><td>' + datainfo.stationinfo.climates + '</td><td>' + addmessage.param[0].time1 + '</td><td>' + addmessage.param[0].time2 + '</td><td>' + addmessage.param[0].time3 + '</td><td>' + addmessage.param[0].time4 + '</td><td>' + addmessage.param[0].time5 + '</td><td>' + addmessage.param[0].time6 + '</td><td>' + addmessage.param[0].time7 + '</td><td>' + addmessage.param[0].time8 + '</td><td>' + addmessage.param[0].time9 + '</td><td>' + addmessage.param[0].time10 + '</td><td>' + addmessage.param[0].time11 + '</td><td>' + addmessage.param[0].time12 + '</td><td>' + addmessage.param[0].time13 + '</td><td>' + addmessage.param[0].time14 + '</td><td>' + addmessage.param[0].time15 + '</td><td>' + addmessage.param[0].time16 + '</td><td>' + addmessage.param[0].time17 + '</td><td>' + addmessage.param[0].time18 + '</td><td>' + addmessage.param[0].time19 + '</td><td>' + addmessage.param[0].time20 + '</td><td>' + addmessage.param[0].time21 + '</td><td>' + addmessage.param[0].time22 + '</td><td>' + addmessage.param[0].time23 + '</td><td>' + addmessage.param[0].time24 + '</td></tr>'
                            if ($("#SummerNewWindAddList tr").eq(2).length !== 0) {
                                document.getElementById('SummerNewWindAddList').deleteRow(2);
                            }
                            $("#SummerNewWindAddList").append(text);
                        },
                        error: function() {

                        }
                    });
                },
                error: function() {

                }
            });

        },
        error: function() {

        }
    });
}
//附表1：夏季新风计算逐时焓值参数
function getAddSummerNewWind() {

}

//同时发生室外计算参数
function getSimulParam() {
    var number = document.getElementById('number').value
    //alert("查询中，请稍后……");
    $.ajax({
        url: "/apis/building/outdoorparm/getSimultaneousParam?id=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datainfo) {
            initialsametimehappen();
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].direction == null) continue
            //     $("#directParam").append('<option>' + datainfo.param[i].direction + '</option>');

            // }

            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].wallType == null) continue
            //     $("#wallParam").append('<option>' + datainfo.param[i].wallType + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].windowHeat == null) continue
            //     $("#windowParam").append('<option>' + datainfo.param[i].windowType + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].shgco == null) continue
            //     $("#winWallParam").append('<option>' + datainfo.param[i].wallWindow + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].shgco == null) continue
            //     $("#shgcoParam").append('<option>' + datainfo.param[i].shgco + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].ventilation == null) continue
            //     $("#ventliParam").append('<option>' + datainfo.param[i].ventilation + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].indoorTem == null) continue
            //     $("#inTemParam").append('<option>' + datainfo.param[i].indoorTem + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].r == null) continue
            //     $("#roParam").append('<option>' + datainfo.param[i].ro + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].inCover == null) continue
            //     $("#inCoverParam").append('<option>' + datainfo.param[i].inCover.toFixed(1) + '</option>');
            // }

            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].radiation == null) continue
            //     $("#radiaParam").append('<option>' + datainfo.param[i].radiation.toFixed(1) + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].outSurAbsorb == null) continue
            //     $("#outSurParam").append('<option>' + datainfo.param[i].outSurAbsorb.toFixed(1) + '</option>');
            // }
            // for (var i = 0; i < datainfo.param.length; i++) {
            //     if (datainfo.param[i].room == null) continue
            //     $("#roomParam").append('<option>' + datainfo.param[i].room + '</option>');
            // }


            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(0).text(datainfo.param[0].stationId);
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(1).text(datainfo.param[0].year);
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(2).text($("#directParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(3).text($("#wallParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(4).text($("#windowParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(5).text($("#winWallParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(6).text($("#shgcoParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(7).text($("#ventliParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(8).text($("#inTemParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(9).text($("#roParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(10).text($("#inCoverParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(11).text($("#radiaParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(12).text($("#outSurParam option:checked").text());
            // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(13).text($("#roomParam option:checked").text());


            // getidandyear();
            // getdirectParam();
            // getwallParam();
            // getwindowParam();
            // getwinWallParam();
            // getshgcoParam();
            // getventliParam();
            // getinTemParam();
            // getroParam();
            // getCoverParam();
            // getradiaParam();
            // getoutSurParam();
            // getroomParam();
        },
        error: function() {

        }
    });


}

// 初始化同时发生参数
function initialsametimehappen() {
    var number = document.getElementById('number').value;
    $.ajax({
        url: "/apis/building/outdoorparm/getSimultaneousParam?id=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);   
            if (message.param.length!=0) {
                 $("#directParam").find("option:contains('" + message.param[0].direction + "')").attr("selected", true);
                $("#wallParam").find("option:contains('" + message.param[0].wallType + "')").attr("selected", true);
                $("#windowParam").find("option:contains('" + message.param[0].windowType + "')").attr("selected", true);
                $("#winWallParam").find("option:contains('" + message.param[0].wallWindow + "')").attr("selected", true);
                $("#shgcoParam").find("option:contains('" + message.param[0].shgco + "')").attr("selected", true);
                $("#ventliParam").find("option:contains('" + message.param[0].ventilation + "')").attr("selected", true);
                $("#inTemParam").find("option:contains('" + message.param[0].indoorTem + "')").attr("selected", true);
                $("#roParam").find("option:contains('" + message.param[0].r + "')").attr("selected", true);
                $("#inCoverParam").find("option:contains('" + message.param[0].inCover + "')").attr("selected", true);
                $("#radiaParam").find("option:contains('" + message.param[0].radiation + "')").attr("selected", true);
                $("#roomParam").find("option:contains('" + message.param[0].room + "')").attr("selected", true);
                $("#outSurParam").find("option:contains('" + message.param[0].outSurAbsorb + "')").attr("selected", true);
                //console.log(1);
                getParam();
            }else{
                alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。");
                $('#typename').text('同时发生室外计算参数');

            }
           
        },
        error: function() {
            alert("请求失败");
        }
    });
}

function getdirectParam() {
    //console.log(2);
    getParam();
}

function getwallParam() {
    getParam();
}

function getwindowParam() {
    getParam();
}

function getwinWallParam() {
    getParam();
}

function getshgcoParam() {
    getParam();
}

function getventliParam() {
    getParam();
}

function getinTemParam() {
    getParam();
}

function getroParam() {
    getParam();
}

function getCoverParam() {
    getParam();
}

function getradiaParam() {
    getParam();
}

function getoutSurParam() {
    getParam();
}

function getroomParam() {
    getParam();
}

function getParam() {
    var number = document.getElementById('number').value;
    $.ajax({
        url: "/apis/building/outdoorparm/getSimultaneousParam?id=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log("-------------");
            console.log(message);
            let timedata = new Array();
            let directParam = $("#directParam option:selected").text();
            let wallParam = $("#wallParam option:selected").text();
            let windowParam = $("#windowParam option:selected").text();
            let winWallParam = $("#winWallParam option:selected").text();
            let shgcoParam = $("#shgcoParam option:selected").text();
            let ventliParam = $("#ventliParam option:selected").text();
            let inTemParam = $("#inTemParam option:selected").text();
            let roParam = $("#roParam option:selected").text();
            let inCoverParam = $("#inCoverParam option:selected").text();
            let radiaParam = $("#radiaParam option:selected").text();
            let outSurParam = $("#outSurParam option:selected").text();
            let roomParam = $("#roomParam option:selected").text();
            console.log(directParam == message.param[0].direction);
            console.log(wallParam == message.param[0].wallType);
            console.log(windowParam == message.param[0].windowType);
            console.log(winWallParam == message.param[0].wallWindow);
            console.log(shgcoParam == message.param[0].shgco);
            console.log(ventliParam == message.param[0].ventilation);
            console.log(inTemParam == message.param[0].indoorTem);
            console.log(roParam == message.param[0].r);
            console.log(inCoverParam == message.param[0].inCover);
            console.log(radiaParam == message.param[0].radiation);
            console.log(outSurParam);
            console.log(message.param[0].outSurAbsorb);
            console.log(outSurParam == message.param[0].outSurAbsorb);
            console.log(roomParam == message.param[0].room);
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(2).text($("#directParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(3).text($("#wallParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(4).text($("#windowParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(5).text($("#winWallParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(6).text($("#shgcoParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(7).text($("#ventliParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(8).text($("#inTemParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(9).text($("#roParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(10).text($("#inCoverParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(11).text($("#radiaParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(12).text($("#outSurParam option:checked").text());
            $("#SameTimeHappen").find("tr").eq(2).find("td").eq(13).text($("#roomParam option:checked").text());
            for (let i = 0; i < message.param.length; i++) {
                if (message.param[i].direction == directParam && message.param[i].wallType == wallParam && message.param[i].windowType == windowParam && message.param[i].wallWindow == winWallParam && message.param[i].shgco == shgcoParam && message.param[i].ventilation == ventliParam && message.param[i].indoorTem == inTemParam && message.param[i].r == roParam && message.param[i].inCover == inCoverParam && message.param[i].radiation == radiaParam && message.param[i].outSurAbsorb == outSurParam && message.param[i].room == roomParam) {
                    console.log(message.param[i]);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(2).text(message.param[i].direction);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(3).text(message.param[i].wallType);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(4).text(message.param[i].windowType);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(5).text(message.param[i].shgco);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(6).text(message.param[i].r);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(7).text(message.param[i].wallWindow);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(8).text(message.param[i].ventilation);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(9).text(message.param[i].inCover);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(10).text(message.param[i].radiation);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(11).text(message.param[i].outSurAbsorb);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(12).text(message.param[i].indoorTem);
                    $("#SameTimeHappen").find("tr").eq(2).find("td").eq(13).text(message.param[i].room);
                    timedata.push(message.param[i]);
                }
            }
            var temp1 = $("#timedataAreaLoad").find("tr").length;
            var temp2 = $("#timedataDryTem").find("tr").length;
            var temp3 = $("#timedataWetTem").find("tr").length;
            var temp4 = $("#timedataTotalRadiation").find("tr").length;
            //console.log();
            //console.log(timedata);
            var timedataAreaLoad = timedata[0].areaLoad.split(",");
            var timedataDryTem = timedata[0].dryTem.split(",");
            var timedataWetTem = timedata[0].wetTem.split(",");
            var timedataTotalRadiation = timedata[0].totalRadiation.split(",");
            let text1 = "<tr>";
            let text2 = "<tr>";
            let text3 = "<tr>";
            let text4 = "<tr>";
            for (let j = 0; j < timedataAreaLoad.length; j++) {
                text1 += "<td>" + timedataAreaLoad[j] + "</td>";
                text2 += "<td>" + timedataDryTem[j] + "</td>";
                text3 += "<td>" + timedataWetTem[j] + "</td>";
                text4 += "<td>" + timedataTotalRadiation[j] + "</td>";
            }
            text1 += "</tr>";
            text2 += "</tr>";
            text3 += "</tr>";
            text4 += "</tr>";
            //console.log(text1);
            if (temp1==1) {
                $("#timedataAreaLoad").append(text1);
            }
            if (temp2==1) {
                $("#timedataDryTem").append(text2);
            }
            if (temp3==1) {
                $("#timedataWetTem").append(text3);
            }
            if (temp4==1) {
                $("#timedataTotalRadiation").append(text4);
            }
            selSameParam();
            $('#typename').text('同时发生室外计算参数');
        },
        error: function() {

        }
    })

}

function selSameParam() {
    var number = document.getElementById('number').value;
    $.ajax({
        url: "/apis/building/outdoorparm/getSimultaneousParam?id=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            var val = $("#sameTimeParam option:checked").text();
            // if (val == '设计单位外围护结构面积得热') {
            //     $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text(message.param[0].areaHeat);
            // } else 
            if (val == '设计单位外围护结构面积负荷24时刻数据') {
                $("#timedataAreaLoad").show();
                $("#timedataDryTem").hide();
                $("#timedataWetTem").hide();
                $("#timedataTotalRadiation").hide();
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text('设计单位外围护结构面积负荷');
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text(message.param[0].areaLoad);
            } else if (val == '设计干球温度24时刻数据') {
                $("#timedataAreaLoad").hide();
                $("#timedataDryTem").show();
                $("#timedataWetTem").hide();
                $("#timedataTotalRadiation").hide();
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text('设计干球温度');
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text(message.param[0].dryTem);
            } else if (val == '设计湿球温度24时刻数据') {
                $("#timedataAreaLoad").hide();
                $("#timedataDryTem").hide();
                $("#timedataWetTem").show();
                $("#timedataTotalRadiation").hide();
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text('设计湿球温度');
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text(message.param[0].wetTem);
            } else if (val == '设计立面（平面）总辐射24时刻数据') {
                $("#timedataAreaLoad").hide();
                $("#timedataDryTem").hide();
                $("#timedataWetTem").hide();
                $("#timedataTotalRadiation").show();
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text('设计立面（平面）总辐射');
                // $("#SameTimeHappen").find("tr").eq(2).find("td").eq(14).text(message.param[0].totalRadiation);
            }
        }
    })
}