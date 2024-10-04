//获取省份信息
//getprovince();
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
showParamType();
// //定义全局变量气候区属
// var climateType;

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
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
function showParamType() {
    var val = $("#paramtype option:checked").text();
    console.log(val);
    if (val == '非供暖房间保温设计室内计算参数') {
        $('#nonHeatingAir').hide();
        $('#heatingAir').show();
        $('#enclosureInsulation').hide();
        $('#enclosureEnvelope').hide();
        $('#transparentEnclosureInsulation').hide();
        $('#passiveSolarBuilding').hide();
        $('#typename').text('非供暖房间保温设计室内计算参数');
        $('#datainfo').attr('data-target', '#heatingAirIndoor-info');
    } else if (val == '非空调房间隔热设计室内计算参数') {
        $('#nonHeatingAir').show();
        $('#heatingAir').hide();
        $('#enclosureInsulation').hide();
        $('#enclosureEnvelope').hide();
        $('#transparentEnclosureInsulation').hide();
        $('#passiveSolarBuilding').hide();
        $('#typename').text('非空调房间隔热设计室内计算参数');
        $('#datainfo').attr('data-target', '#nonHeatingAirIndoor-info');
    } else if (val == '供暖房间保温设计室内计算参数') {
        $('#nonHeatingAir').hide();
        $('#heatingAir').hide();
        $('#enclosureInsulation').show();
        $('#enclosureEnvelope').hide();
        $('#transparentEnclosureInsulation').hide();
        $('#passiveSolarBuilding').hide();
        $('#typename').text('供暖房间保温设计室内计算参数');
        $('#datainfo').attr('data-target', '#enclosureInsulation-info');
    } else if (val == '空调房间隔热设计室内计算参数') {
        $('#nonHeatingAir').hide();
        $('#heatingAir').hide();
        $('#enclosureInsulation').hide();
        $('#enclosureEnvelope').show();
        $('#transparentEnclosureInsulation').hide();
        $('#passiveSolarBuilding').hide();
        $('#typename').text('空调房间隔热设计室内计算参数');
        $('#datainfo').attr('data-target', '#enclosureEnvelope-info');
      
    } else if (val == '自然通风设计室内计算参数') {
        $('#nonHeatingAir').hide();
        $('#heatingAir').hide();
        $('#enclosureInsulation').hide();
        $('#enclosureEnvelope').hide();
        $('#transparentEnclosureInsulation').hide();
        $('#passiveSolarBuilding').show();
        $('#typename').text('自然通风设计室内计算参数');
        $('#datainfo').attr('data-target', '#passiveSolarBuilding-info');
    } 
}
// function showParamType2(){
//     var val2=$("#param2type option:checked").text();
//     if(val2=='冬季供暖室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-冬季供暖室外计算参数');
//         $('#datainfo').attr('data-target','#typical-winterWarm-info');
//         $('#typical-winterWarm').show();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').hide();            
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').hide();
//         getWinterWarm();
//     }
//     else if(val2=='冬夏空调室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-冬夏空调室外计算参数');
//         $('#datainfo').attr('data-target','#typical-wsAirConditioner-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').show();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').hide();
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').hide();
//         getWinterAir();
//     }
//     else if(val2=='夏季空调室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-夏季空调室外计算参数');
//         $('#datainfo').attr('data-target','#typical-summerAirConditioner-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').show();
//         $('#typical-summerDeHumidity').hide();
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').hide();
//         getSummerAir();
//     }
//     else if(val2=='夏季除湿室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-夏季除湿室外计算参数');
//         $('#datainfo').attr('data-target','#typical-summerDeHumidity-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').show();
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').hide();
//         getsummernNoHumidity();
//     }
//     else if(val2=='冬季加湿室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-冬季加湿室外计算参数');
//         $('#datainfo').attr('data-target','#typical-winterAddHumidity-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').hide();
//         $('#typical-winterAddHumidity').show();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').hide();
//         getwinterAddHumidity();
//     }
//     else if(val2=='夏季新风计算室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-夏季新风计算室外计算参数');
//         $('#datainfo').attr('data-target','#typical-summerNewWind-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').hide();
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').show();
//         $('#typical-winterNewWind').hide();
//         getSummerNewWind();
//     }
//     else if(val2=='冬季新风计算室外计算参数'){
//         $('#typename').text('冬夏季典型设计气象日参数-冬季新风计算室外计算参数');
//         $('#datainfo').attr('data-target','#typical-winterNewWind-info');
//         $('#typical-winterWarm').hide();
//         $('#typical-wsAirConditioner').hide();
//         $('#typical-summerAirConditioner').hide();
//         $('#typical-summerDeHumidity').hide();
//         $('#typical-winterAddHumidity').hide();
//         $('#typical-summerNewWind').hide();
//         $('#typical-winterNewWind').show();
//         getWinterNewWind();
//     }
// }
//参数下拉列表改变时
function selChange() {
    showParamType();
}

// function selChange2() {
//     showParamType2();
// }
//根据当前选择参数请求对应模块的数据
// function getParamData() {
//     var value = $("#paramtype option:checked").text();
//     if (value == '多不保证率及多参数组合的室外计算参数') {
//         $('#datainfo').attr('data-target', '#moreCombination-info');
//         getMoreCombination()
//     } else if (value == '冬夏季典型设计气象日参数') {
//         var val2 = $("#param2type option:checked").text();
//         if (val2 == '冬季供暖室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-winterWarm-info');
//             getWinterWarm();
//         } else if (val2 == '冬夏空调室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-wsAirConditioner-info');
//             getWinterAir();

//         } else if (val2 == '夏季空调室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-summerAirConditioner-info');
//             getSummerAir();
//         } else if (val2 == '夏季除湿室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-summerDeHumidity-info');
//             getsummernNoHumidity();
//         } else if (val2 == '冬季加湿室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-winterAddHumidity-info');
//             getwinterAddHumidity();
//         } else if (val2 == '夏季新风计算室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-summerNewWind-info');
//             getSummerNewWind();
//         } else if (val2 == '冬季新风计算室外计算参数') {
//             $('#datainfo').attr('data-target', '#typical-winterNewWind-info');
//             getWinterNewWind();
//         }
//     }
// }

//获取暖空调建筑热工计算室内计算参数表数据的方法
// function getHeatingAir() {
//     console.log($("#number option:checked").text());
//     $.ajax({
//         // url: "/apis/building/selectcity/getstationinfo?stationid=" + $("#number option:checked").text(),
//         url: "/apis/building/selectcity/getstationinfo?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(datainfo) {
//             $.ajax({
//                 url: "/apis/building/indoorparm/gethaicp?stationid=" + 57131,
//                 type: "get",
//                 contentType: "application/json",
//                 dataType: "json",
//                 success: function(message) {
//                     console.log(message);
//                     //防止表格重复出现，所以检测到有，就清空
//                     if ($("#heatingAir tr").eq(1)) {
//                         $("#heatingAir tr").html('');
//                     }
//                     if (message.success) {
//                         if (message.InfoMsg) {
//                             var texthead =
//                                 "<tr><td rowspan='2' style='width: 18%;text-align: center; vertical-align: middle'>气候区属</td><td rowspan='2' style='width: 20%;text-align: center; vertical-align: middle'>建筑/房间类型</td><td rowspan='2' style='width: 10%;text-align: center; vertical-align: middle'>级别</td><td rowspan='1' colspan='2' style='width: 18%;'>室内设计温度（℃）</td><td rowspan='1' colspan='2' style='width: 18%;'>相对湿度（%）</td></tr><tr><td colspan='1'>冬季</td><td colspan='1'>夏季</td> <td colspan='1'>冬季</td> <td colspan='1'>夏季</td>  </tr>",
//                                 text2 = "<td rowspan='9'style='text-align: center; vertical-align: middle'>" + datainfo.stationinfo.climates + "</td>",
//                                 text3 = "<td rowspan='3' style='text-align: center; vertical-align: middle'>居住建筑</td>",
//                                 text4 = "<td rowspan='3' style='text-align: center; vertical-align: middle'>办公建筑</td>",
//                                 text5 = "<td rowspan='3' style='text-align: center; vertical-align: middle'>商场</td>",
//                                 text6 = "<td>Ⅰ</td>",
//                                 text7 = "<td>Ⅱ</td>",
//                                 text8 = "<td>Ⅲ</td>";
//                             var textL1, textL2, textL3, textL4, textL5, textL6, textL7, textL8, textL9;
//                             for (i = 0; i < message.InfoMsg.length; i++) {
//                                 if (message.InfoMsg[i].typeAndLevel == "居住Ⅰ") {
//                                     var text11, text22, text33, text44;
//                                     // console.log(message.InfoMsg[i]);
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL1 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "居住Ⅱ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL2 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "居住Ⅲ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL3 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅰ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL4 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅱ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL5 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅲ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL6 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅰ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL7 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅱ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL8 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅲ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL9 = text11 + text22 + text33 + text44;
//                                 }
//                             }

//                         }
//                         // console.log(textL1);
//                         $('#heatingAir').append(texthead +
//                             "<tr>" + text2 + text3 + text6 + textL1 + "</tr>" +
//                             "<tr>" + text7 + textL2 + "</tr>" +
//                             "<tr>" + text8 + textL3 + "</tr>" +
//                             "<tr>" + text4 + text6 + textL4 + "</tr>" +
//                             "<tr>" + text7 + textL5 + "</tr>" +
//                             "<tr>" + text8 + textL6 + "</tr>" +
//                             "<tr>" + text5 + text6 + textL7 + "</tr>" +
//                             "<tr>" + text7 + textL8 + "</tr>" +
//                             "<tr>" + text8 + textL9 + "</tr>");

//                     }
//                 },
//                 error: function() {

//                 }
//             });
//         },
//         error: function() {

//         }
//     });
// }


//获取非采暖空调建筑室内计算参数表数据的方法
// function getNonHeatingAir() {
//     console.log($("#number option:checked").text());
//     $.ajax({
//         // url: "/apis/building/selectcity/getstationinfo?stationid=" + $("#number option:checked").text(),
//         url: "/apis/building/selectcity/getstationinfo?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(datainfo) {
//             $.ajax({
//                 url: "/apis/building/indoorparm/getnhaicp?stationid=" + 57131,
//                 type: "get",
//                 contentType: "application/json",
//                 dataType: "json",
//                 success: function(message) {
//                     console.log(message);
//                     if ($("#nonHeatingAir tr").eq(1)) {
//                         $("#nonHeatingAir tr").html('');
//                     }
//                     if (message.success) {
//                         if (message.InfoMsg) {
//                             var texthead =
//                                 "<tr><td rowspan='2' style='width: 18%;text-align: center; vertical-align: middle'>气候区属</td><td rowspan='2' style='width: 20%;text-align: center; vertical-align: middle'>建筑/房间类型</td><td rowspan='2' style='width: 10%;text-align: center; vertical-align: middle'>级别</td><td rowspan='1' colspan='2' style='width: 18%;'>室内设计温度（℃）</td><td rowspan='1' colspan='2' style='width: 18%;'>相对湿度（%）</td></tr><tr><td colspan='1'>冬季</td><td colspan='1'>夏季</td> <td colspan='1'>冬季</td> <td colspan='1'>夏季</td>  </tr>",
//                                 text2 = "<td rowspan='9' style='text-align: center; vertical-align: middle'>" + datainfo.stationinfo.climates + "</td>",
//                                 text3 = "<td rowspan='3'style='text-align: center; vertical-align: middle'>居住建筑</td>",
//                                 text4 = "<td rowspan='3' style='text-align: center; vertical-align: middle'>办公建筑</td>",
//                                 // text5 = "<td rowspan='3'>商场</td>",
//                                 text6 = "<td>Ⅰ</td>",
//                                 text7 = "<td>Ⅱ</td>",
//                                 text8 = "<td>Ⅲ</td>";
//                             var textL1, textL2, textL3, textL4, textL5, textL6;
//                             // textL7, textL8, textL9;
//                             for (i = 0; i < message.InfoMsg.length; i++) {
//                                 if (message.InfoMsg[i].typeAndLevel == "居住Ⅰ") {
//                                     var text11, text22, text33, text44;
//                                     // console.log(message.InfoMsg[i]);
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL1 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "居住Ⅱ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL2 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "居住Ⅲ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL3 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅰ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL4 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅱ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL5 = text11 + text22 + text33 + text44;
//                                 } else if (message.InfoMsg[i].typeAndLevel == "办公Ⅲ") {
//                                     var text11, text22, text33, text44;
//                                     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                     textL6 = text11 + text22 + text33 + text44;
//                                 }
//                                 // } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅰ") {
//                                 //     var text11, text22, text33, text44;
//                                 //     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                 //     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                 //     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                 //     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                 //     textL7 = text11 + text22 + text33 + text44;
//                                 // } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅱ") {
//                                 //     var text11, text22, text33, text44;
//                                 //     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                 //     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                 //     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                 //     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                 //     textL8 = text11 + text22 + text33 + text44;
//                                 // } else if (message.InfoMsg[i].typeAndLevel == "商场Ⅲ") {
//                                 //     var text11, text22, text33, text44;
//                                 //     text11 = "<td>" + message.InfoMsg[i].winterDesignTemperature + "</td>";
//                                 //     text22 = "<td>" + message.InfoMsg[i].summerDesignTemperature + "</td>";
//                                 //     text33 = "<td>" + message.InfoMsg[i].winterRelativeHumidity + "</td>";
//                                 //     text44 = "<td>" + message.InfoMsg[i].summerRelativeHumidity + "</td>";
//                                 //     textL9 = text11 + text22 + text33 + text44;
//                                 // }
//                             }

//                         }
//                         // console.log(textL1);
//                         $('#nonHeatingAir').append(texthead +
//                             "<tr>" + text2 + text3 + text6 + textL1 + "</tr>" +
//                             "<tr>" + text7 + textL2 + "</tr>" +
//                             "<tr>" + text8 + textL3 + "</tr>" +
//                             "<tr>" + text4 + text6 + textL4 + "</tr>" +
//                             "<tr>" + text7 + textL5 + "</tr>" +
//                             "<tr>" + text8 + textL6 + "</tr>");
//                         // "<tr>" + text5 + text6 + textL7 + "</tr>"+
//                         // "<tr>" + text7 + textL8 + "</tr>"+
//                         // "<tr>" + text8 + textL9 + "</tr>");

//                     }
//                 },
//                 error: function() {

//                 }
//             });
//         },
//         error: function() {

//         }
//     });
// }



//获取围护结构保温设计表数据的方法
// function getEnclosureInsulation() {
//     $.ajax({
//         url: "/apis/building/indoorparm/getesid?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(message) {
//             console.log(message);
//             if ($("#enclosureInsulation tr").eq(1)) {
//                 $("#enclosureInsulation tr").html('');
//             }
//             if (message.success) {
//                 if (message.InfoMsg) {
//                     var texthead = "<tr><td style='text-align: center; vertical-align: middle'>围护结构</td><td style='text-align: center; vertical-align: middle'>房间设计要求</td><td style='text-align: center; vertical-align: middle'>防结露</td><td style='text-align: center; vertical-align: middle'>基本热舒适（℃）</td></tr>",
//                         text1 = "<td style='text-align: center; vertical-align: middle'>墙体</td>",
//                         text2 = "<td style='text-align: center; vertical-align: middle'>楼、屋面</td>",
//                         text3 = "<td style='text-align: center; vertical-align: middle'>地面</td>",
//                         text4 = "<td style='text-align: center; vertical-align: middle'>地下室</td>",
//                         text5 = "<td rowspan='4' style='text-align: center; vertical-align: middle'>允许温差△tb</td>",
//                         text6 = "<td rowspan='4' style='text-align: center; vertical-align: middle'>≤ti—td</td>";
//                     var textL1, textL2, textL3, textL4;
//                     for (i = 0; i < message.InfoMsg.length; i++) {
//                         if (message.InfoMsg[i].enclosureStructure == "墙体") {
//                             // console.log(message.InfoMsg[i]);
//                             textL1 = "<td>" + message.InfoMsg[i].basicThermalComfort + "</td>";
//                         } else if (message.InfoMsg[i].enclosureStructure == "楼、屋面") {
//                             textL2 = "<td>" + message.InfoMsg[i].basicThermalComfort + "</td>";
//                         } else if (message.InfoMsg[i].enclosureStructure == "地面") {
//                             textL3 = "<td>" + message.InfoMsg[i].basicThermalComfort + "</td>";
//                         } else if (message.InfoMsg[i].enclosureStructure == "地下室") {
//                             textL4 = "<td>" + message.InfoMsg[i].basicThermalComfort + "</td>";
//                         }

//                     }

//                 }

//                 $('#enclosureInsulation').append(texthead +
//                     "<tr>" + text1 + text5 + text6 + textL1 + "</tr>" +
//                     "<tr>" + text2 + textL2 + "</tr>" +
//                     "<tr>" + text3 + textL3 + "</tr>" +
//                     "<tr>" + text4 + textL4 + "</tr>");
//             }
//         },
//         error: function() {

//         }
//     });
// }




//获取围护结构隔热设计表数据的方法
// function getEnclosureEnvelope() {
//     $.ajax({
//         url: "/apis/building/indoorparm/getesed?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(message) {
//             console.log(message);
//             if ($("#enclosureEnvelope tr").eq(1)) {
//                 $("#enclosureEnvelope tr").html('');
//             }
//             if (message.success) {
//                 if (message.InfoMsg) {
//                     console.log(message)
//                     var texthead =
//                         "<tr><td style='text-align: center; vertical-align: middle'>围护结构名称</td> <td colspan='3' style='text-align: center; vertical-align: middle'>外墙</td><td colspan='3' style='text-align: center; vertical-align: middle'>屋顶</td></tr><tr><td rowspan='2' style='text-align: center; vertical-align: middle'>房间类型</td><td colspan='2' style='text-align: center; vertical-align: middle'>空调房间</td><td rowspan='2' style='text-align: center; vertical-align: middle'>自然通风房间</td><td colspan='2' style='text-align: center; vertical-align: middle'>空调房间</td><td rowspan='2' style='text-align: center; vertical-align: middle'>自然通风房间</td></tr><tr><td style='text-align: center; vertical-align: middle'>重质（D≥2.5）</td><td style='text-align: center; vertical-align: middle'>轻质（D＜2.5)</td> <td style='text-align: center; vertical-align: middle'>重质（D≥2.5）</td><td style='text-align: center; vertical-align: middle'>轻质（D＜2.5)</td></tr>",
//                         text1 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].structureName + "</td>",
//                         text2 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param1 + "</td>",
//                         text3 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param2 + "</td>",
//                         text4 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param3 + "</td>",
//                         text5 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param4 + "</td>",
//                         text6 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param5 + "</td>",
//                         text7 = "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[0].param6 + "</td>";
//                     $('#enclosureEnvelope').append(texthead + "<tr>" + text1 + text2 + text3 + text4 + text5 + text6 + text7 + "</tr>");
//                 }
//             }
//         },
//         error: function() {

//         }
//     });
// }




//获取透明围护结构保温设计表数据的方法
// function getTransparentEnclosureInsulation() {
//     $.ajax({
//         url: "/apis/building/indoorparm/gettesid?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(message) {
//             console.log(message);
//             if ($("#transparentEnclosureInsulation tr").eq(1)) {
//                 $("#transparentEnclosureInsulation tr").html('');
//             }
//             if (message.success) {
//                 if (message.InfoMsg) {
//                     console.log(message)
//                     var texthead =
//                         "<tr><td>气候区</td><td>K[W/(m2·K)]</td><td>防结露</td><td>基本热舒适（℃）</td></tr>",
//                         text;
//                     for (i = 0; i < message.InfoMsg.length; i++) {
//                         text += "<tr>" + "<td>" + message.InfoMsg[i].climateZones + "</td>" +
//                             "<td>" + message.InfoMsg[i].kvalue + "</td>" +
//                             "<td>" + message.InfoMsg[i].resistanceToCondensation + "</td>" +
//                             "<td>" + message.InfoMsg[i].basicThermalComfort + "</td>" + "</tr>"
//                     }
//                     $('#transparentEnclosureInsulation').append(texthead + text);
//                 }
//             }
//         },
//         error: function() {

//         }
//     });
// }





//获取被动式太阳能建筑设计参数表数据的方法
// function getPassiveSolarBuilding() {
//     $.ajax({
//         url: "/apis/building/indoorparm/getpsbdp?stationid=" + 57131,
//         type: "get",
//         contentType: "application/json",
//         dataType: "json",
//         success: function(message) {
//             console.log(message);
//             if ($("#passiveSolarBuilding tr").eq(1)) {
//                 $("#passiveSolarBuilding tr").html('');
//             }
//             if (message.success) {
//                 if (message.InfoMsg) {
//                     console.log(message)
//                     var texthead =
//                         "<tr><td></td><td style='text-align: center; vertical-align: middle'>冬季采暖计算温度（℃）</td><td style='text-align: center; vertical-align: middle'>夏季降温计算温度（℃）</td><td style='text-align: center; vertical-align: middle'>夏季高温高湿地区（℃）</td></tr>",
//                         text;
//                     for (i = 0; i < message.InfoMsg.length; i++) {
//                         text += "<tr>" + "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[i].type + "</td>" +
//                             "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[i].winterHeatingCalculationTemperature + "</td>" +
//                             "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[i].summerCoolingCalculationTemperature + "</td>" +
//                             "<td style='text-align: center; vertical-align: middle'>" + message.InfoMsg[i].summerHotAndHumidAreas + "</td>" + "</tr>"
//                     }
//                     $('#passiveSolarBuilding').append(texthead + text);
//                 }
//             }
//         },
//         error: function() {

//         }
//     });
// }



// $.ajax({
//     url: "/apis/building/selectcity/getstationinfo?stationid=" + $("#number option:checked").text(),
//     type: "get",
//     contentType: "application/json",
//     dataType: "json",
//     success: function (datainfo) {
//         console.log(datainfo);
//         $.ajax({
//             url: "/apis/building/outdoorparm/getocpMulgrpcById?id=" + 57131,
//             type: "get",
//             contentType: "application/json",
//             dataType: "json",
//             success: function (message) {
//                 console.log(message);
//                 if (message.ocpMulgrpcInfo) {
//                     $("#moreCombination").find("tr").eq(0).find("td").eq(1).text(datainfo.stationinfo.cityName);
//                     $("#moreCombination").find("tr").eq(1).find("td").eq(1).text(datainfo.stationinfo.province);
//                     $("#moreCombination").find("tr").eq(2).find("td").eq(1).text(datainfo.stationinfo.climates);
//                     $("#moreCombination").find("tr").eq(4).find("td").eq(4).text(message.ocpMulgrpcInfo.temperWinAirCt6Hours);
//                     $("#moreCombination").find("tr").eq(5).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinAirCt24Hours);
//                     $("#moreCombination").find("tr").eq(6).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinAirCt48Hours);
//                     $("#moreCombination").find("tr").eq(7).find("td").eq(3).text(message.ocpMulgrpcInfo.temperWinHeatingCt1Days);
//                     $("#moreCombination").find("tr").eq(8).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinHeatingCt5Days);
//                     $("#moreCombination").find("tr").eq(9).find("td").eq(2).text(message.ocpMulgrpcInfo.temperWinHeatingCt10Days);
//                     $("#moreCombination").find("tr").eq(10).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCdat1Days);
//                     $("#moreCombination").find("tr").eq(11).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCdat5Days);
//                     $("#moreCombination").find("tr").eq(12).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCdat10Days);
//                     $("#moreCombination").find("tr").eq(13).find("td").eq(4).text(message.ocpMulgrpcInfo.temperSumAirCt10HoursDry);
//                     $("#moreCombination").find("tr").eq(14).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt10HoursWet);
//                     $("#moreCombination").find("tr").eq(15).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCt50HoursDry);
//                     $("#moreCombination").find("tr").eq(16).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt50HoursWet);
//                     $("#moreCombination").find("tr").eq(17).find("td").eq(3).text(message.ocpMulgrpcInfo.temperSumAirCt100HoursDry);
//                     $("#moreCombination").find("tr").eq(18).find("td").eq(2).text(message.ocpMulgrpcInfo.temperSumAirCt100HoursWet);
//                     $("#moreCombination").find("tr").eq(19).find("td").eq(5).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursMoi);
//                     $("#moreCombination").find("tr").eq(20).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursDry);
//                     $("#moreCombination").find("tr").eq(21).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah10HoursRela);
//                     $("#moreCombination").find("tr").eq(22).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursMoi);
//                     $("#moreCombination").find("tr").eq(23).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursDry);
//                     $("#moreCombination").find("tr").eq(24).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah50HoursRela);
//                     $("#moreCombination").find("tr").eq(25).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursMoi);
//                     $("#moreCombination").find("tr").eq(26).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursDry);
//                     $("#moreCombination").find("tr").eq(27).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureSumDehumCah100HoursRela);
//                     $("#moreCombination").find("tr").eq(28).find("td").eq(4).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursMoi);
//                     $("#moreCombination").find("tr").eq(29).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursDry);
//                     $("#moreCombination").find("tr").eq(30).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah10HoursRela);
//                     $("#moreCombination").find("tr").eq(31).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursMoi);
//                     $("#moreCombination").find("tr").eq(32).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursDry);
//                     $("#moreCombination").find("tr").eq(33).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah50HoursRela);
//                     $("#moreCombination").find("tr").eq(34).find("td").eq(3).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursMoi);
//                     $("#moreCombination").find("tr").eq(35).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursDry);
//                     $("#moreCombination").find("tr").eq(36).find("td").eq(2).text(message.ocpMulgrpcInfo.moistureWinHumCah100HoursRela);
//                     $("#moreCombination").find("tr").eq(37).find("td").eq(5).text(message.ocpMulgrpcInfo.enthalpySumFreshCe10HoursEnt);
//                     $("#moreCombination").find("tr").eq(38).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe10HoursDry);
//                     $("#moreCombination").find("tr").eq(39).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpySumFreshCe50HoursEnt);
//                     $("#moreCombination").find("tr").eq(40).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe50HoursDry);
//                     $("#moreCombination").find("tr").eq(41).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpySumFreshCe100HoursEnt);
//                     $("#moreCombination").find("tr").eq(42).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpySumFreshCe100HoursDry);
//                     $("#moreCombination").find("tr").eq(43).find("td").eq(4).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe10HoursEnt);
//                     $("#moreCombination").find("tr").eq(44).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe10HoursDry);
//                     $("#moreCombination").find("tr").eq(45).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe50HoursEnt);
//                     $("#moreCombination").find("tr").eq(46).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe50HoursDry);
//                     $("#moreCombination").find("tr").eq(47).find("td").eq(3).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe100HoursEnt);
//                     $("#moreCombination").find("tr").eq(48).find("td").eq(2).text(message.ocpMulgrpcInfo.enthalpyWinFreshCe100HoursDry);
//                 }
//             },
//             error: function () {

//             }
//         });




//     },
//     error: function () {

//     }
// });