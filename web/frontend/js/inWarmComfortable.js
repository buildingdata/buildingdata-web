//获取省份信息
//getprovince();
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
showParamType();

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
            //$("#province option:selected").text(province)
            //$('#number').append('<option>' + stationId + '</option>');
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
            console.log(message.stationList)
            $('#number').val(message.stationList)
                //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区

            //获取当前站点所选参数的数据
            showParamType();
        },
        error: function() {

        }
    });
}
//通过输入查询获取数据

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

//通过输入城市名查询获取数据
function getSearchInputResult(keyword) {
    console.log(keyword)
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
                        console.log(1);
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
                                        console.log(2);                     
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
                console.log(2);
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
                                console.log(3);                            
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

//获取省份信息
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
//             //console.log(3);
//             citycontent($("#province option:checked").text());
//         },
//         error: function() {

//         }
//     });
// }

//根据所选省份确定城市下拉菜单的内容
function citycontent(province,city) {

//console.log(3);
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
               // numbercontent($("#city option:checked").text());
            
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
            //console.log(message.stationList);
            $('#number').empty();
            $('#number').val(message.stationList)
            if (message.stationList.length > 0) {
                for (var i = 0; i < message.stationList.length; i++) {
                    $('#number').append('<option>' + message.stationList[i] + '</option>');
                }
            }
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            getstationinfo();
            //获取当前站点所选参数的数据
            showParamType();
        },
        error: function() {

        }
    });
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

            // climateType = message.stationinfo.climates;
            return message;
        },
        error: function() {

        }
    });
}
//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    console.log(1);
    citycontent($("#province option:checked").text());
}
//城市切换
function citySelected() {
    //获取当前城市的站点信息
    //所选城市的站点信息         
    console.log(1);                  
    numbercontent($("#city option:checked").text());
    var city = $("#city option:checked").text();
    getStationId(city)

    showParamType();
}
//站点切换
function numberSelected() {

}

//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
function showParamType() {
    var val = $("#paramtype option:checked").text();
    if (val == '室内热环境分级') {
        $('#HotClassify').show();
        $('#typename').text('室内热环境分级');
        $('#datainfo').attr('data-target', '#HotClassify-info');
        getHotClassify();
        $('#HotSuggest').hide();
        $('#HotLocal').hide();
        $('#ClimateDiff').hide();
        $('#BuildDiff').hide();
    } else if (val == '室内热舒适建议') {
        $('#HotClassify').hide();
        $('#HotSuggest').show();
        $('#HotLocal').hide();
        $('#ClimateDiff').hide();
        $('#typename').text('室内热舒适建议');
        $('#datainfo').attr('data-target', '#HotSuggest-info');
        gethotSuggest();
        $('#BuildDiff').hide();

    } else if (val == '局部热不舒适') {
        $('#HotClassify').hide();
        $('#HotSuggest').hide();
        $('#BuildDiff').hide();
        $('#ClimateDiff').hide();
        $('#HotLocal').show();
        $('#typename').text('局部热不舒适');
        $('#datainfo').attr('data-target', '#HotLocal-info');
        getLocal();
    } else if (val == '不同气候区室内温度设计') {
        $('#HotClassify').hide();
        $('#HotSuggest').hide();
        $('#BuildDiff').hide();
        $('#HotLocal').hide();
        $('#ClimateDiff').show();
        $('#typename').text('不同气候区室内温度设计');
        $('#datainfo').attr('data-target', '#ClimateDiff-info');
        getClimate();
    } else if (val == '不同建筑的操作温度') {
        $('#HotClassify').hide();
        $('#HotSuggest').hide();
        $('#ClimateDiff').hide();
        $('#HotLocal').hide();
        $('#BuildDiff').show();
        $('#typename').text('不同建筑的操作温度');
        $('#datainfo').attr('data-target', '#BuildDiff-info');
        getBuild();

    }
}
//参数下拉列表改变时
function selChange() {
    showParamType();
}
//根据当前选择参数请求对应模块的数据
function getParamData() {
    var value = $("#paramtype option:checked").text();
    if (value == '室内热环境分级') {
        $('#datainfo').attr('data-target', '#HotClassify-info');
        getHotClassify();
    } else if (value == '室内热舒适建议') {
        $('#datainfo').attr('data-target', '#HotSuggest-info');
        gethotSuggest();
    } else if (value == '局部热不舒适') {
        $('#datainfo').attr('data-target', '#HotLocal-info');
        getLocal();
    } else if (value == '不同气候区室内温度设计') {
        $('#datainfo').attr('data-target', '#ClimateDiff-info');
        getClimate();
    } else if (value == '不同建筑的操作温度') {
        $('#datainfo').attr('data-target', '#BuildDiff-info');
        getBuild();

    }
}
//获取室内热舒适分级
function getHotClassify() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getHot",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param) {
                $("#HotClassify").find("tr").eq(1).find("td").eq(0).text(message.param[0].level);
                $("#HotClassify").find("tr").eq(1).find("td").eq(1).text(message.param[0].requireL);
                $("#HotClassify").find("tr").eq(1).find("td").eq(2).text(message.param[0].interpretation);
                $("#HotClassify").find("tr").eq(2).find("td").eq(0).text(message.param[1].level);
                $("#HotClassify").find("tr").eq(2).find("td").eq(1).text(message.param[1].requireL);
                $("#HotClassify").find("tr").eq(2).find("td").eq(2).text(message.param[1].interpretation);
                $("#HotClassify").find("tr").eq(3).find("td").eq(0).text(message.param[2].level);
                $("#HotClassify").find("tr").eq(3).find("td").eq(1).text(message.param[2].requireL);
                $("#HotClassify").find("tr").eq(3).find("td").eq(2).text(message.param[2].interpretation);
            }
        },
        error: function() {}
    });
}

//室内热舒适建议
function gethotSuggest() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getSuggest",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param) {
                $("#HotSuggest").find("tr").eq(1).find("td").eq(0).text(message.param[0].level);
                $("#HotSuggest").find("tr").eq(1).find("td").eq(1).text(message.param[0].ppd);
                $("#HotSuggest").find("tr").eq(1).find("td").eq(2).text(message.param[0].pmv);
                $("#HotSuggest").find("tr").eq(2).find("td").eq(0).text(message.param[1].level);
                $("#HotSuggest").find("tr").eq(2).find("td").eq(1).text(message.param[1].ppd);
                $("#HotSuggest").find("tr").eq(2).find("td").eq(2).text(message.param[1].pmv);
                $("#HotSuggest").find("tr").eq(3).find("td").eq(0).text(message.param[2].level);
                $("#HotSuggest").find("tr").eq(3).find("td").eq(1).text(message.param[2].ppd);
                $("#HotSuggest").find("tr").eq(3).find("td").eq(2).text(message.param[2].pmv);
            }
        },
        error: function() {

        }
    });
}
//局部热不舒适
function getLocal() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getLocal",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param) {
                $("#HotLocal").find("tr").eq(3).find("td").eq(0).text(message.param[0].level);
                $("#HotLocal").find("tr").eq(3).find("td").eq(1).text(message.param[0].windSpeedMostWin);
                $("#HotLocal").find("tr").eq(3).find("td").eq(2).text(message.param[0].windSpeedMostSum);
                $("#HotLocal").find("tr").eq(3).find("td").eq(3).text(message.param[0].blowUnsatiRate);
                $("#HotLocal").find("tr").eq(3).find("td").eq(4).text(message.param[0].vertTempUnsatiRate);
                $("#HotLocal").find("tr").eq(3).find("td").eq(5).text(message.param[0].vertTempInequal);
                $("#HotLocal").find("tr").eq(3).find("td").eq(6).text(message.param[0].groTempUnsatiRate);
                $("#HotLocal").find("tr").eq(3).find("td").eq(7).text(message.param[0].groudTempRange);
                $("#HotLocal").find("tr").eq(3).find("td").eq(8).text(message.param[0].nonRadUnsatiRate);
                $("#HotLocal").find("tr").eq(3).find("td").eq(9).text(message.param[0].nonRadHotCeil);
                $("#HotLocal").find("tr").eq(3).find("td").eq(10).text(message.param[0].nonRadColdWall);
                $("#HotLocal").find("tr").eq(3).find("td").eq(11).text(message.param[0].nonRadColdCeil);
                $("#HotLocal").find("tr").eq(3).find("td").eq(12).text(message.param[0].nonRadHotWall);

                $("#HotLocal").find("tr").eq(4).find("td").eq(0).text(message.param[1].level);
                $("#HotLocal").find("tr").eq(4).find("td").eq(1).text(message.param[1].windSpeedMostWin);
                $("#HotLocal").find("tr").eq(4).find("td").eq(2).text(message.param[1].windSpeedMostSum);
                $("#HotLocal").find("tr").eq(4).find("td").eq(3).text(message.param[1].blowUnsatiRate);
                $("#HotLocal").find("tr").eq(4).find("td").eq(4).text(message.param[1].vertTempUnsatiRate);
                $("#HotLocal").find("tr").eq(4).find("td").eq(5).text(message.param[1].vertTempInequal);
                $("#HotLocal").find("tr").eq(4).find("td").eq(6).text(message.param[1].groTempUnsatiRate);
                $("#HotLocal").find("tr").eq(4).find("td").eq(7).text(message.param[1].groudTempRange);
                $("#HotLocal").find("tr").eq(4).find("td").eq(8).text(message.param[1].nonRadUnsatiRate);
                $("#HotLocal").find("tr").eq(4).find("td").eq(9).text(message.param[1].nonRadHotCeil);
                $("#HotLocal").find("tr").eq(4).find("td").eq(10).text(message.param[1].nonRadColdWall);
                $("#HotLocal").find("tr").eq(4).find("td").eq(11).text(message.param[1].nonRadColdCeil);
                $("#HotLocal").find("tr").eq(4).find("td").eq(12).text(message.param[1].nonRadHotWall);

                $("#HotLocal").find("tr").eq(5).find("td").eq(0).text(message.param[2].level);
                $("#HotLocal").find("tr").eq(5).find("td").eq(1).text(message.param[2].windSpeedMostWin);
                $("#HotLocal").find("tr").eq(5).find("td").eq(2).text(message.param[2].windSpeedMostSum);
                $("#HotLocal").find("tr").eq(5).find("td").eq(3).text(message.param[2].blowUnsatiRate);
                $("#HotLocal").find("tr").eq(5).find("td").eq(4).text(message.param[2].vertTempUnsatiRate);
                $("#HotLocal").find("tr").eq(5).find("td").eq(5).text(message.param[2].vertTempInequal);
                $("#HotLocal").find("tr").eq(5).find("td").eq(6).text(message.param[2].groTempUnsatiRate);
                $("#HotLocal").find("tr").eq(5).find("td").eq(7).text(message.param[2].groudTempRange);
                $("#HotLocal").find("tr").eq(5).find("td").eq(8).text(message.param[2].nonRadUnsatiRate);
                $("#HotLocal").find("tr").eq(5).find("td").eq(9).text(message.param[2].nonRadHotCeil);
                $("#HotLocal").find("tr").eq(5).find("td").eq(10).text(message.param[2].nonRadColdWall);
                $("#HotLocal").find("tr").eq(5).find("td").eq(11).text(message.param[2].nonRadColdCeil);
                $("#HotLocal").find("tr").eq(5).find("td").eq(12).text(message.param[2].nonRadHotWall);
            }
        },
        error: function() {

        }
    });
}
//不同气候区室内温度设计
function getClimate() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getDiffTem",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.param) {
                $("#ClimateDiff").find("tr").eq(2).find("td").eq(0).text(message.param[0].climates);
                $("#ClimateDiff").find("tr").eq(2).find("td").eq(1).text(message.param[0].resiWinWarm);
                $("#ClimateDiff").find("tr").eq(2).find("td").eq(2).text(message.param[0].resiSummer);
                $("#ClimateDiff").find("tr").eq(2).find("td").eq(3).text(message.param[0].ruralWinter);
                $("#ClimateDiff").find("tr").eq(2).find("td").eq(4).text(message.param[0].ruralSummer);

                $("#ClimateDiff").find("tr").eq(3).find("td").eq(0).text(message.param[1].climates);
                $("#ClimateDiff").find("tr").eq(3).find("td").eq(1).text(message.param[1].resiWinWarm);
                $("#ClimateDiff").find("tr").eq(3).find("td").eq(2).text(message.param[1].resiSummer);
                $("#ClimateDiff").find("tr").eq(3).find("td").eq(3).text(message.param[1].ruralWinter);
                $("#ClimateDiff").find("tr").eq(3).find("td").eq(4).text(message.param[1].ruralSummer);

                $("#ClimateDiff").find("tr").eq(4).find("td").eq(0).text(message.param[2].climates);
                $("#ClimateDiff").find("tr").eq(4).find("td").eq(1).text(message.param[2].resiWinWarm);
                $("#ClimateDiff").find("tr").eq(4).find("td").eq(2).text(message.param[2].resiSummer);
                $("#ClimateDiff").find("tr").eq(4).find("td").eq(3).text(message.param[2].ruralWinter);
                $("#ClimateDiff").find("tr").eq(4).find("td").eq(4).text(message.param[2].ruralSummer);
            }
        },
        error: function() {

        }
    });
}

//不同建筑的操作温度
function getBuild() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/indoorparm/getDiffBuil",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $("#BuildDiff").find("tr").eq(2).find("td").eq(0).text(message.param1[0].type);
            $("#BuildDiff").find("tr").eq(2).find("td").eq(1).text(message.param1[0].level);
            $("#BuildDiff").find("tr").eq(2).find("td").eq(2).text(message.param1[0].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(2).find("td").eq(3).text(message.param1[0].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(3).find("td").eq(0).text(message.param1[1].level);
            $("#BuildDiff").find("tr").eq(3).find("td").eq(1).text(message.param1[1].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(3).find("td").eq(2).text(message.param1[1].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(4).find("td").eq(0).text(message.param1[2].level);
            $("#BuildDiff").find("tr").eq(4).find("td").eq(1).text(message.param1[2].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(4).find("td").eq(2).text(message.param1[2].limitUpHeatTemp);

            $("#BuildDiff").find("tr").eq(5).find("td").eq(0).text(message.param2[0].type);
            $("#BuildDiff").find("tr").eq(5).find("td").eq(1).text(message.param2[0].level);
            $("#BuildDiff").find("tr").eq(5).find("td").eq(2).text(message.param2[0].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(5).find("td").eq(3).text(message.param2[0].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(6).find("td").eq(0).text(message.param2[1].level);
            $("#BuildDiff").find("tr").eq(6).find("td").eq(1).text(message.param2[1].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(6).find("td").eq(2).text(message.param2[1].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(7).find("td").eq(0).text(message.param2[2].level);
            $("#BuildDiff").find("tr").eq(7).find("td").eq(1).text(message.param2[2].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(7).find("td").eq(2).text(message.param2[2].limitUpHeatTemp);

            $("#BuildDiff").find("tr").eq(8).find("td").eq(0).text(message.param3[0].type);
            $("#BuildDiff").find("tr").eq(8).find("td").eq(1).text(message.param3[0].level);
            $("#BuildDiff").find("tr").eq(8).find("td").eq(2).text(message.param3[0].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(8).find("td").eq(3).text(message.param3[0].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(9).find("td").eq(0).text(message.param3[1].level);
            $("#BuildDiff").find("tr").eq(9).find("td").eq(1).text(message.param3[1].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(9).find("td").eq(2).text(message.param3[1].limitUpHeatTemp);
            $("#BuildDiff").find("tr").eq(10).find("td").eq(0).text(message.param3[2].level);
            $("#BuildDiff").find("tr").eq(10).find("td").eq(1).text(message.param3[2].limitLowHeatTemp);
            $("#BuildDiff").find("tr").eq(10).find("td").eq(2).text(message.param3[2].limitUpHeatTemp);
        },
        error: function() {

        }
    });
}