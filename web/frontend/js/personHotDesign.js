//获取省份信息
//getprovince();
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
showParamType();



//初始化
//根据传递过来的台站号获得省份、城市信息、经度、维度、海拔、气候区属信息
//默认站点的经度、维度、海拔和气候区

// 通过输入的城市名/台站号模糊搜索
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
var searchItem = '';
$('#search').on('input propertychange', function () {
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
        success: function (message) {
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
        error: function () {}
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
        success: function (message) {
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
        error: function () {}
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
            success: function (message) {
                // console.log(message);
                $.ajax({
                    url: "/apis/building/selectcity/getstationinfo?stationid=" + message.stationList,
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        $.ajax({
                            url: "/apis/building/selectcity/getcitys?province=" + data.stationinfo.province,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (city) {
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
                            error: function () {}
                        });
                    },
                    error: function () {}
                });
            },
            error: function () {}
        });
    } else if (searchContent.match(input_reg2)) {
        $.ajax({
            url: "/apis/building/selectcity/getstationinfo?stationid=" + searchContent,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                $.ajax({
                    url: "/apis/building/selectcity/getcitys?province=" + message.stationinfo.province,
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function (city) {
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
                    error: function () {}
                });
            },
            error: function () {}
        });
    }


}

//获取省份信息
function getprovince(province) {
    $.ajax({
        url: "/apis/building/selectcity/getprovince",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {


            $('#province').empty();
            for (var i = 0; i < message.provinceList.length; i++) {
                if(message.provinceList[i]==province){
                    $('#province').append('<option selected="selected">' + message.provinceList[i] + '</option>');
                }else{
                    $('#province').append('<option>' + message.provinceList[i] + '</option>');
                }
            }
            //获取所选省份的城市信息
            //citycontent($("#province option:checked").text());
        },
        error: function () {

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
        success: function (message) {
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
                //numbercontent($("#city option:checked").text());
            }
        },
        error: function () {}
    });
}
//根据城市信息确定站点
function numbercontent(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            console.log('身份', city)
            console.log(message)
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
        error: function () {

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

//表头获取站点的经度、维度、海拔和气候区
function getstationinfo() {
    var number = document.getElementById("number").value
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + number,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            var latitude1 = message.stationinfo.latitude
            latitude1 = latitude1.toFixed(2)
            var longitude1 = message.stationinfo.longitude
            longitude1 = longitude1.toFixed(2)
            $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
            $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
            $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
            $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(longitude1);
            $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(latitude1);
        },
        error: function () {

        }
    });
}

//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
function showParamType() {
    var val = $("#paramtype option:checked").text();
    if (val == '自然通风设计室外计算参数') {

        $('#wind').show();
        $('#tabletitle').show();
        $('#typename').text('自然通风设计室外计算参数');
        $('#datainfo').attr('data-target', '#wind-info');
        getwind();
        $('#standard').hide();
        $('#DevHeat-head').hide();
        $('#buildSun').hide();
        $('#hotSolidcontainer').hide();
        // $('#nowarm').hide();
        $('#norm-head').hide();
        // $('#left-nowarm').hide();

        $('#page').hide();
    } else if (val == '围护结构动态保温设计室外计算参数') {

        $('#wind').hide();
        $('#tabletitle').show();
        $('#typename').text('围护结构动态保温设计室外计算参数');
        // $('#datainfo').attr('data-target', '#wind-info');
        $('#datainfo').attr('data-target', '#dongtai-info');
        $('#standard').hide();
        $('#DevHeat-head').show();
        getOcpedid();
        $('#buildSun').hide();
        $('#hotSolidcontainer').hide();
        // $('#nowarm').hide();
        $('#norm-head').hide();
        // $('#left-nowarm').hide();

        $('#page').hide();
    } else if (val == '建筑遮阳设计室外计算参数') {
        $('#wind').hide();
        $('#buildSun').show();
        $('#norm-head').hide();
        $('#DevHeat-head').hide();
        $('#standard').hide();
        $('#hotSolidcontainer').hide();
        $('#typename').text('建筑遮阳设计室外计算参数');
        $('#datainfo').attr('data-target', '#buildSun-info');
        getnosun();
        // $('#nowarm').hide();
        // $('#left-nowarm').hide();
        $('#page').hide();
    } else if (val == '围护结构隔热设计室外计算参数') {
        $('#wind').hide();
        $('#buildSun').hide();
        $('#standard').hide();
        $('#page').hide();
        $('#DevHeat-head').hide();
        $('#hotSolidcontainer').hide();
        $('#tabletitle').show();
        // $('#nowarm').show();
        // $('#left-nowarm').show();
        $('#norm-head').show();
        $('#typename').text('围护结构隔热设计室外计算参数');
        $('#datainfo').attr('data-target', '#nowarm-info');
        gethot();
    } else if (val == '围护结构热湿耦合计算室外计算参数') {
        $('#wind').hide();
        $('#buildSun').hide();
        $('#tabletitle').hide();
        // $('#nowarm').hide();
        // $('#left-nowarm').hide();
        $('#DevHeat-head').hide();
        $('#standard').hide();
        $('#norm-head').hide();
        $('#hotSolidcontainer').show();
        $('#page').show();
        $('#typename').text('围护结构热湿耦合计算室外计算参数（数据正在加载中，请稍后。）');
        $('#datainfo').attr('data-target', '#hotSolid-info');
        gethotsolid(1);

    }
    else if (val == '围护结构稳态保温防潮设计室外计算参数') {
        $('#wind').hide();
        $('#buildSun').hide();
        $('#tabletitle').hide();
        // $('#nowarm').hide();
        $('#DevHeat-head').hide();
        // $('#left-nowarm').hide();
        $('#page').hide();
        $('#hotSolidcontainer').hide();
        $('#standard').show();
        $('#norm-head').hide();
        $('#typename').text('围护结构稳态保温防潮设计室外计算参数');
        $('#datainfo').attr('data-target', '#standard-info');
        getstandar();
    }
}
//参数下拉列表改变时
function selChange() {
    getstationinfo()
    showParamType();
}

//自然通风设计室外参数 
function getwind() {
    console.log($("#number option:checked").text());
    $.ajax({
        url: "/apis/building/outdoorparm/getocpnvdById?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            if (message.ocpnvdinfo == null) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。');
                   //按照要求需要清空表里面的数据
                $("#tfcs").html("");

            }
            // console.log('自然同分', message)
            // if (message.ocpnvdinfo == null) {
            //     alert('该站点暂无数据')
            //     //按照要求需要清空表里面的数据，
            //
            // } else {
            //     if (message.ocpnvdinfo) {
            if (message.ocpnvdinfo.zvp == null) {
                $("#wind").find("tr").eq(0).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(0).find("td").eq(0).text(message.ocpnvdinfo.zvp);
            }
            if (message.ocpnvdinfo.zvd == null) {
                $("#wind").find("tr").eq(1).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(1).find("td").eq(0).text(message.ocpnvdinfo.zvd);
            }
            if (message.ocpnvdinfo.zvows == null) {
                $("#wind").find("tr").eq(2).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(2).find("td").eq(0).text(message.ocpnvdinfo.zvows);
            }
            if (message.ocpnvdinfo.zvorh == null) {
                $("#wind").find("tr").eq(3).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(3).find("td").eq(0).text(message.ocpnvdinfo.zvorh);
            }
            if (message.ocpnvdinfo.zvot == null) {
                $("#wind").find("tr").eq(4).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(4).find("td").eq(0).text(message.ocpnvdinfo.zvot);
            }
            if (message.ocpnvdinfo.windDirect == null) {
                $("#wind").find("tr").eq(5).find("td").eq(0).text("无自然通风需求");
            } else {
                $("#wind").find("tr").eq(5).find("td").eq(0).text(message.ocpnvdinfo.windDirect);
            }
            // $("#wind").find("tr").eq(5).find("td").eq(0).text(message.ocpnvdinfo.cvp);
            // $("#wind").find("tr").eq(6).find("td").eq(0).text(message.ocpnvdinfo.cvd);
            // $("#wind").find("tr").eq(7).find("td").eq(0).text(message.ocpnvdinfo.cvows);
            // $("#wind").find("tr").eq(8).find("td").eq(0).text(message.ocpnvdinfo.cvorh);
            // $("#wind").find("tr").eq(9).find("td").eq(0).text(message.ocpnvdinfo.cvot);
            // $("#wind").find("tr").eq(10).find("td").eq(0).text(message.ocpnvdinfo.nvp);
            // $("#wind").find("tr").eq(11).find("td").eq(0).text(message.ocpnvdinfo.nvd);
            // $("#wind").find("tr").eq(12).find("td").eq(0).text(message.ocpnvdinfo.nvows);
            // $("#wind").find("tr").eq(13).find("td").eq(0).text(message.ocpnvdinfo.nvorh);
            // $("#wind").find("tr").eq(14).find("td").eq(0).text(message.ocpnvdinfo.nvot);
            //     }
            // }
        },
        error: function () {

        }
    });
}

//维护结构隔热设计室外计算参数
function gethot() {
    $.ajax({
        url: "/apis/building/outdoorparm/getotmccById?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            if (message.otmccinfo.length == 0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
                   //按照要求需要清空表里面的数据

            }
            //
            //     if (message.otmccinfo) {
                    if ($("#nowarm tr").eq(1)) {
                        if (message.otmccinfo) {
                            if ($("#nowarm tr").eq(1)) {
                                $("#nowarm tr").eq(1).remove();
                                $("#nowarm tr").eq(1).remove();
                                $("#nowarm tr").eq(1).remove();
                                $("#nowarm tr").eq(1).remove();
                                $("#nowarm tr").eq(1).remove();
                                $("#nowarm tr").eq(1).remove();
                            }
                        }
                    }
                    var text1 = '<tr>',
                        text2 = "<tr>",
                        text3 = "<tr>",
                        text4 = "<tr>",
                        text5 = "<tr>",
                        text6 = "<tr>";
                    for (var i = 0; i < message.otmccinfo.length; i++) {
                        text1 += "<td>" + message.otmccinfo[i].outdoorAirTep + "</>";
                        text2 += "<td>" + message.otmccinfo[i].horizontal + "</td>";
                        text3 += "<td>" + message.otmccinfo[i].east + "</td>";
                        text4 += "<td>" + message.otmccinfo[i].south + "</td>";
                        text5 += "<td>" + message.otmccinfo[i].west + "</td>";
                        text6 += "<td>" + message.otmccinfo[i].north + "</td>";
                    }
                    text1 += "</tr>"
                    text2 += "</tr>"
                    text3 += "</tr>"
                    text4 += "</tr>"
                    text5 += "</tr>"
                    text6 += "</tr>"



                    $("#nowarm").append(text1 + text2 + text3 + text4 + text5 + text6);
            //      }
            // }
        },
        error: function () {

        }
    });
}
//民用建筑热工设计规范附表参数
function getstandar() {
    $.ajax({
        url: "/apis/building/outdoorparm/gettdocbById?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            if (message.tdocbInfo == null) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
                $("#standard").hide()

            } else {

                if (message.tdocbInfo) {
                    $("#standard").find("tr").eq(0).find("td").eq(0).text($("#city option:checked").text());
                    $("#standard").find("tr").eq(1).find("td").eq(0).text($("#province option:checked").text());
                    $("#standard").find("tr").eq(2).find("td").eq(0).text($("#tabletitle").find("tr").eq(0).find("td").eq(2).text());
                    $("#standard").find("tr").eq(3).find("td").eq(0).text(message.tdocbInfo.hdd);
                    $("#standard").find("tr").eq(4).find("td").eq(0).text(message.tdocbInfo.cdd);
                    $("#standard").find("tr").eq(5).find("td").eq(0).text(message.tdocbInfo.tMinDMT);
                    $("#standard").find("tr").eq(6).find("td").eq(0).text(message.tdocbInfo.tMaxDMT);
                    $("#standard").find("tr").eq(7).find("td").eq(0).text(message.tdocbInfo.tHCalDMT);
                    $("#standard").find("tr").eq(8).find("td").eq(0).text(message.tdocbInfo.tW);
                    $("#standard").find("tr").eq(9).find("td").eq(0).text(message.tdocbInfo.tMinMMT);
                    $("#standard").find("tr").eq(10).find("td").eq(0).text(message.tdocbInfo.tMaxMMT);
                    $("#standard").find("tr").eq(11).find("td").eq(0).text(message.tdocbInfo.startHeating.substring(0, 10));
                    $("#standard").find("tr").eq(12).find("td").eq(0).text(message.tdocbInfo.endHeating.substring(0, 10));
                    $("#standard").find("tr").eq(13).find("td").eq(0).text(message.tdocbInfo.heatingMT);
                    $("#standard").find("tr").eq(14).find("td").eq(0).text(message.tdocbInfo.zD);
                    $("#standard").find("tr").eq(15).find("td").eq(0).text(message.tdocbInfo.wEAve);
                    $("#standard").show()
                }
            }
        },
        error: function () {

        }
    });
}

// 围护结构动态保温设计室外计算参数表
function getOcpedid() {
    $.ajax({
        url: "/apis/building/outdoorparm/getocpedid?id=" + document.getElementById('number').value,
        type: "get",
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            if (result.ocpedidInfoList.length == 0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
                for (let j = 0; j < 24; j++) {

                    $("#right-DevHeat-min").find("tr").eq(1).find("td").eq(j).text("");
                    $("#right-DevHeat-min").find("tr").eq(2).find("td").eq(j).text("");
                    $("#right-DevHeat-min").find("tr").eq(3).find("td").eq(j).text("");
                    $("#right-DevHeat-min").find("tr").eq(4).find("td").eq(j).text("");
                    $("#right-DevHeat-min").find("tr").eq(5).find("td").eq(j).text("");
                    $("#right-DevHeat-min").find("tr").eq(6).find("td").eq(j).text("");
                    //反应的两个表（min和5日）数据不一致问题在这
                    $("#right-DevHeat-5d").find("tr").eq(1).find("td").eq(j).text("");
                    $("#right-DevHeat-5d").find("tr").eq(2).find("td").eq(j).text("");
                    $("#right-DevHeat-5d").find("tr").eq(3).find("td").eq(j).text("");
                    $("#right-DevHeat-5d").find("tr").eq(4).find("td").eq(j).text("");
                    $("#right-DevHeat-5d").find("tr").eq(5).find("td").eq(j).text("");
                    $("#right-DevHeat-5d").find("tr").eq(6).find("td").eq(j).text("");
                }
            } else {
                // console.log("打印一下")
                // console.log(result.ocpedidInfoList.length)
                for (let j = 0; j < result.ocpedidInfoList.length; j++) {

                    $("#right-DevHeat-min").find("tr").eq(1).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpcot);
                    $("#right-DevHeat-min").find("tr").eq(2).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpsriH);
                    $("#right-DevHeat-min").find("tr").eq(3).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpsriE);
                    $("#right-DevHeat-min").find("tr").eq(4).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpsriS);
                    $("#right-DevHeat-min").find("tr").eq(5).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpsriW);
                    $("#right-DevHeat-min").find("tr").eq(6).find("td").eq(j).text(result.ocpedidInfoList[j].lDhpsriN);
                    //反应的两个表（min和5日）数据不一致问题在这
                    $("#right-DevHeat-5d").find("tr").eq(1).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpcot);
                    $("#right-DevHeat-5d").find("tr").eq(2).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpsriH);
                    $("#right-DevHeat-5d").find("tr").eq(3).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpsriE);
                    $("#right-DevHeat-5d").find("tr").eq(4).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpsriS);
                    $("#right-DevHeat-5d").find("tr").eq(5).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpsriW);
                    $("#right-DevHeat-5d").find("tr").eq(6).find("td").eq(j).text(result.ocpedidInfoList[j].fDhpsriN);
                }
            }
            //     let text0  =" <tr><td>"+1+"</td> <td>"+2+"</td><td>"+3+"</td><td>"+4+"</td><td>"+5+"</td><td>"+6+"</td><td>"+7+"</td><td>"+8+"</td> <td>"+9+"</td> <td>"+10+"</td> <td>"+11+"</td><td>"+12+"</td><td>"+13+"</td> <td>"+14+"</td><td>"+15+"</td> <td>"+16+"</td><td>"+17+"</td><td>"+18+"</td> <td>"+19+"</td><td>"+20+"</td><td>"+21+"</td><td>"+22+"</td> <td>"+23+"</td><td>"+24+"</td></tr>";
            //     // 最小值行
            //     let text1 = "<tr>";
            //     let text2 = "<tr>";
            //     let text3 = "<tr>";
            //     let text4 = "<tr>";
            //     let text5 = "<tr>";
            //     let text6 = "<tr>";
            //     // 不保证日为5天的行
            //     let text7 = "<tr>";
            //     let text8 = "<tr>";
            //     let text9 = "<tr>";
            //     let text10 = "<tr>";
            //     let text11 = "<tr>";
            //     let text12 = "<tr>";
            //     for (let i = 0; i < result.ocpedidInfoList.length; i++) {
            //         // 最小值的数据
            //         text1 += "<td>" + result.ocpedidInfoList[i].lDhpcot + "</td>";
            //         text2 += "<td>" + result.ocpedidInfoList[i].lDhpsriH + "</td>";
            //         text3 += "<td>" + result.ocpedidInfoList[i].lDhpsriE + "</td>";
            //         text4 += "<td>" + result.ocpedidInfoList[i].lDhpsriS + "</td>";
            //         text5 += "<td>" + result.ocpedidInfoList[i].lDhpsriW + "</td>";
            //         text6 += "<td>" + result.ocpedidInfoList[i].lDhpsriN + "</td>";
            //         // 不保证日为5天的数据
            //         text7 += "<td>" + result.ocpedidInfoList[i].fDhpcot + "</td>";
            //         text8 += "<td>" + result.ocpedidInfoList[i].fDhpsriH + "</td>";
            //         text9 += "<td>" + result.ocpedidInfoList[i].fDhpsriE + "</td>";
            //         text10 += "<td>" + result.ocpedidInfoList[i].fDhpsriS + "</td>";
            //         text11 += "<td>" + result.ocpedidInfoList[i].fDhpsriW + "</td>";
            //         text12 += "<td>" + result.ocpedidInfoList[i].fDhpsriN + "</td>";
            //     }
            //     // 最小值行
            //     text1 += "</tr>";
            //     text2 += "</tr>";
            //     text3 += "</tr>";
            //     text4 += "</tr>";
            //     text5 += "</tr>";
            //     text6 += "</tr>";
            //     // 不保证日为5天的行
            //     text7 += "</tr>";
            //     text8 += "</tr>";
            //     text9 += "</tr>";
            //     text10 += "</tr>";
            //     text11 += "</tr>";
            //     text12 += "</tr>";
            //     $("#right-DevHeat-min").append( text1 + text2 + text3 + text4 + text5 + text6);
            //     $("#right-DevHeat-5d").append(text7 + text8 + text9 + text10 + text11 + text12);
            // }
        }
    });
}

//建筑遮阳设计室外计算参数
function getnosun() {
    $.ajax({
        url: "/apis/building/outdoorparm/getasdoById?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {

            if (message.startDayList.length == 0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
                //清空表
                $('#buildSun').hide()

            } else {

                if ($("#buildSun tr").eq(1)) {
                    $("#buildSun tr").html('');
                }
                let startDayTimes = message.startDayList[message.startDayList.length - 1].time - message.startDayList[0].time + 1;
                let endDayTimes = message.endDayList[message.endDayList.length - 1].time - message.endDayList[0].time + 1;
                let middleDayTimes = message.middleDayList[message.middleDayList.length - 1].time - message.middleDayList[0].time + 1;
                // console.log("起始日时刻总数：" + startDayTimes);
                // console.log("终止日时刻总数：" + endDayTimes);
                // console.log("中间日时刻总数：" + middleDayTimes);
                var text1 = "<tr><td colspan='3'>遮阳计算时段</td><td colspan='" + startDayTimes + "'>" + message.startDayList[0].sunshadePeriodStart + "-" + message.startDayList[0].sunshadePeriodEnd + "</td></tr>",
                    text2 = "<tr><th style='color:#8cc63e;text-align: center;' colspan='" + (endDayTimes + 3) + "'>遮阳计算时段起始日设计计算参数</th></tr>",
                    text3 = "<tr><td colspan='3'>时刻</td>",
                    text4 = "<tr><td colspan='3'>太阳高度角（°）</td>",
                    text5 = "<tr><td colspan='3' >太阳方位角（°）</td>",
                    text6 = "<tr><td colspan='3' >室外空气温度te（°C）</td>",
                    text7 = "<tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>水平</td><td colspan='2'>太阳总辐射（W/m²）</td>",
                    text8 = " <tr><td colspan='2' >散射辐射（W/m²）</td>",
                    text9 = " <tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>东向</td><td colspan='2'>太阳总辐射（W/m²）</td>",
                    text10 = "<tr><td colspan='2'>直射辐射（W/m²）</td>",
                    text11 = " <tr><td rowspan='2'style=' text-align: center;vertical-align: middle'>南向</td><td colspan='2'>太阳总辐射（W/m²）</td>",
                    text12 = "<tr><td colspan='2'>直射辐射（W/m²）</td>",
                    text13 = " <tr><td rowspan='2'style=' text-align: center;vertical-align: middle'>西向</td><td colspan='2'>太阳总辐射（W/m²）</td>",
                    text14 = "<tr><td colspan='2'>直射辐射（W/m²）</td>",
                    text15 = "<tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>北向</td><td colspan='2'>太阳总辐射（W/m²）</td>",
                    text16 = "<tr><td colspan='2'>直射辐射Id（W/m²）</td>",

                    text17 = "<tr><th style='color:#8cc63e;text-align: center;' colspan='" + (endDayTimes + 3) + "'>遮阳计算时段终止日设计计算参数</th></tr>",
                    text18 = text3,

                    text19 = text4,
                    text20 = text5,
                    text21 = text6,
                    text22 = text7,
                    text23 = text8,
                    text24 = text9,
                    text25 = text10,
                    text26 = text11,
                    text27 = text12,
                    text28 = text13,
                    text29 = text14,
                    text30 = text15,
                    text31 = text16,

                    text32 = "<tr><th style='color:#8cc63e;text-align: center;' colspan='" + (middleDayTimes + 3) + "'>遮阳计算时段内的设计计算参数</th></tr>",
                    text33 = text3,
                    text34 = " <tr><td colspan='3'>室外空气温度逐日逐时平均值（°C）</td>",
                    text35 = "<tr><td rowspan='10' style=' text-align: center;vertical-align: middle'>太阳辐射逐日逐时刻平均值（W/m²）</td><td rowspan='2' style=' text-align: center;vertical-align: middle'>水平</td><td>总辐射</td>",
                    text36 = "<tr><td>散射辐射</td>",
                    text37 = "<tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>东向</td><td>总辐射</td>",
                    text38 = text36,
                    text39 = "<tr><td rowspan='2'style=' text-align: center;vertical-align: middle'>南向</td><td>总辐射</td>",
                    text40 = text36,
                    text41 = "<tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>西向</td><td>总辐射</td>",
                    text42 = text36,
                    text43 = "<tr><td rowspan='2' style=' text-align: center;vertical-align: middle'>北向</td><td>总辐射</td>",
                    text44 = text36;
                for (var i = 0; i < message.startDayList.length; i++) {
                    text3 += "<td>" + message.startDayList[i].time + "</td>";
                    text4 += "<td>" + message.startDayList[i].solarAltitudeAngle + "</td>";
                    text5 += "<td>" + message.startDayList[i].solarAzimuthAngle + "</td>";
                    text6 += "<td>" + message.startDayList[i].outdoorAirTep + "</td>";
                    text7 += "<td>" + message.startDayList[i].horiI + "</td>";
                    text8 += "<td>" + message.startDayList[i].horiId + "</td>";
                    text9 += "<td>" + message.startDayList[i].eastI + "</td>";
                    text10 += "<td>" + message.startDayList[i].eastId + "</td>";
                    text11 += "<td>" + message.startDayList[i].soutI + "</td>";
                    text12 += "<td>" + message.startDayList[i].soutId + "</td>";
                    text13 += "<td>" + message.startDayList[i].westI + "</td>";
                    text14 += "<td>" + message.startDayList[i].westId + "</td>";
                    text15 += "<td>" + message.startDayList[i].nortI + "</td>";
                    text16 += "<td>" + message.startDayList[i].nortId + "</td>";
                }
                for (var j = 0; j < message.endDayList.length; j++) {
                    text18 += "<td>" + message.endDayList[j].time + "</td>";
                    text19 += "<td>" + message.endDayList[j].solarAltitudeAngle + "</td>";
                    text20 += "<td>" + message.endDayList[j].solarAzimuthAngle + "</td>";
                    text21 += "<td>" + message.endDayList[j].outdoorAirTep + "</td>";
                    text22 += "<td>" + message.endDayList[j].horiI + "</td>";
                    text23 += "<td>" + message.endDayList[j].horiId + "</td>";
                    text24 += "<td>" + message.endDayList[j].eastI + "</td>";
                    text25 += "<td>" + message.endDayList[j].eastId + "</td>";
                    text26 += "<td>" + message.endDayList[j].soutI + "</td>";
                    text27 += "<td>" + message.endDayList[j].soutId + "</td>";
                    text28 += "<td>" + message.endDayList[j].westI + "</td>";
                    text29 += "<td>" + message.endDayList[j].westId + "</td>";
                    text30 += "<td>" + message.endDayList[j].nortI + "</td>";
                    text31 += "<td>" + message.endDayList[j].nortId + "</td>";
                }
                for (var k = 0; k < message.middleDayList.length; k++) {
                    text33 += "<td>" + message.middleDayList[k].time + "</td>";
                    text34 += "<td>" + message.middleDayList[k].aveValueOutairDayHour + "</td>";
                    text35 += "<td>" + message.middleDayList[k].horiI + "</td>";
                    text36 += "<td>" + message.middleDayList[k].horiId + "</td>";
                    text37 += "<td>" + message.middleDayList[k].eastI + "</td>";
                    text38 += "<td>" + message.middleDayList[k].eastId + "</td>";
                    text39 += "<td>" + message.middleDayList[k].soutI + "</td>";
                    text40 += "<td>" + message.middleDayList[k].soutId + "</td>";
                    text41 += "<td>" + message.middleDayList[k].westI + "</td>";
                    text42 += "<td>" + message.middleDayList[k].westId + "</td>";
                    text43 += "<td>" + message.middleDayList[k].nortI + "</td>";
                    text44 += "<td>" + message.middleDayList[k].nortId + "</td>";
                }
                $("#buildSun").append(text1 + text2 + text3 + "/tr" + text4 + "/tr" + text5 + "/tr" + text6 + "/tr" + text7 + "/tr" + text8 + "/tr" + text9 + "/tr" + text10 + "/tr" + text11 + "/tr" + text12 + "/tr" + text13 + "/tr" +
                    text14 + "/tr" + text15 + "/tr" + text16 + "/tr" + text17 + text18 + text19 + "/tr" + text20 + "/tr" + text21 + "/tr" + text22 + "/tr" + text23 + "/tr" + text24 + "/tr" + text25 + "/tr" + text26 + "/tr" +
                    text27 + "/tr" + text28 + "/tr" + text29 + "/tr" + text30 + "/tr" + text31 + "/tr" + text32 + text33 + text34 + "/tr" + text35 + "/tr" + text36 + "/tr" + text37 + "/tr" + text38 + "/tr" + text39 + "/tr" +
                    text40 + "/tr" + text41 + "/tr" + text42 + "/tr" + text43 + "/tr" + text44 + "/tr");
                $('#buildSun').show()
            }
        },
        error: function () {

        }
    });
}

//围护结构热湿耦合计算室外参数
function gethotsolid(pagenum) {
    //alert("查询中，请稍后……");
    $.ajax({
        url: "/apis/building/outdoorparm/getocpehhccById?id=" + document.getElementById('number').value + "&pagenum=" + pagenum,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            if (message.totalList.length == 0) {
                alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')

                // tablearea
                 //$("#page").html('');
                $("#tablearea").hide()
                $('#total').hide()
                $('#page').hide()


            } else {
                // console.log(message.totalList);
                // console.log(message.totalpage);
                // 获取数据中有哪些年有数据
                let years = new Array();
                let k = 0;
                let yeartext = "";
                for (let i = 1; i < message.totalList.length; i++) {
                    years[k] = message.totalList[i - 1].year;
                    if (message.totalList[i].year != message.totalList[i - 1].year) {
                        k++;
                        years[k] = message.totalList[i].year;
                    }
                }
                for (let j = 0; j < years.length; j++) {
                    yeartext += "<option>" + years[j] + "</option>"
                    // console.log(years[j]);
                }
                $("#selectyear").append(yeartext);
                total_page = message.totalpage;
                if ($("#hotSolid tr").eq(1)) {
                    $("#hotSolid tr").html('');
                }
                //     var titletext="<tr style='background-color:white' height='30'><th style='text-align: center;width:10%'>时刻</th><th style='text-align: center;width:15%'>室外空气温度te(°C)</th><th style='text-align: center;width:15%'>相对湿度（%）</th><th style='text-align: center;width:15%'>降雨量（mm）</th><th style='text-align: center;width:15%'>风向</th><th style='text-align: center;width:15%'>风速（m/s）</th><th style='text-align: center;width:20%'>大气压力（Pa）</th></tr>"
                //    $("#hotSolid").append(titletext);
                var text;
                for (var i = 0; i < message.currentpageList.length; i++) {
                    text = '';
                    text ="<tr><td style='text-align: center; width: 10%;'>" + message.currentpageList[i].month + "</td><td style='text-align: center; width: 10%;'>" +
                        message.currentpageList[i].day + "</td><td>" + message.currentpageList[i].time + "</td><td>" +
                        message.currentpageList[i].dbt + "</td><td>" + message.currentpageList[i].pre + "</td><td>" +
                        message.currentpageList[i].rhm + "</td><td>" + message.currentpageList[i].wDir + "</td><td>" +
                        message.currentpageList[i].wSpd + "</td><td>" + message.currentpageList[i].dpt + "</td><td>" +
                        message.currentpageList[i].cc + "</td><td>" + message.currentpageList[i].gsr + "</td><td>" +
                        message.currentpageList[i].dif + "</td><td>" + message.currentpageList[i].dir + "</td><td>";
                    if (message.currentpageList[i].pct === null) {
                        text += "无降水</td></tr>";
                    } else {
                        text += message.currentpageList[i].pct + "</td></tr>";
                        // console.log(message.currentpageList[i].pct);
                    }

                    $("#tablearea").append(text);
                }
                paging(pagenum);
                $('#total').text('总页数 ' + total_page + ' 页');
                $("#tablearea").show()
                $('#total').show()
                $('#page').show()
                $('#typename').text('围护结构热湿耦合计算室外计算参数');
            }
        },
        error: function () {

        }
    });
}


//分页
var total_page;

function paging(pagenum) {
    console.log(total_page);
    var element = $("#grid_paging");
    var options = {
        size: "normal",
        bootstrapMajorVersion: 3,
        currentPage: pagenum,
        numberOfPages: 10,
        totalPages: total_page,
        onPageChanged: function (event, oldPage, newPage) {
            // 页面变化时触发更新内容
            // cbOk & cbOk(newPage);
            gethotsolid(newPage);
        }
    }
    element.bootstrapPaginator(options);
}


// 热湿耦合选择年份
function chooseYear() {
    let yearselected = $("#selectyear option:checked").text();
    let currentmonth;
    let monthtext = "";
    let month = $("#selectmonth");
    let day = $("#selectday");
    $.ajax({
        url: "/apis/building/outdoorparm/getocpehhccByStationId?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            console.log('现在的站点', document.getElementById('number').value)
            console.log(message.ocpehhccList);
            // 根据选择的年份，改变可选的月份
            for (let i = 1; i < message.ocpehhccList.length - 1; i++) {

                if (message.ocpehhccList[i].year == parseInt(yearselected)) {
                    if (message.ocpehhccList[i - 1].year != message.ocpehhccList[i].year) {
                        currentmonth = message.ocpehhccList[i].month;

                    } else if (i == 1) {
                        currentmonth = message.ocpehhccList[1].month;
                    }
                    if (message.ocpehhccList[i].month != message.ocpehhccList[i + 1].month && message.ocpehhccList[i + 1].year == parseInt(yearselected)) {

                        monthtext += "<option>" + message.ocpehhccList[i].month + "月</option>";

                    } else if (message.ocpehhccList[i].month != message.ocpehhccList[i + 1].month && message.ocpehhccList[i + 1].year != parseInt(yearselected)) {

                        monthtext += "<option>" + message.ocpehhccList[i].month + "月</option>";
                    } else if (i == (message.ocpehhccList.length - 2)) {

                        monthtext += "<option>" + message.ocpehhccList[i].month + "月</option>";
                    }
                }

            }
            console.log(currentmonth);
            month.html(monthtext);
            // 初始化选择完年后日选择框里的内容
            if (currentmonth == 2) {
                console.log(currentmonth);
                day.empty();
                if (isleapyear(parseInt(yearselected))) {
                    for (let i = 1; i <= 29; i++) {
                        day.append("<option value='" + i + "'>" + i + "号" + "</option>");
                    }
                } else {
                    for (let i = 1; i <= 28; i++) {
                        day.append("<option value='" + i + "'>" + i + "号" + "</option>");
                    }
                }

            } else if (currentmonth == 1 || currentmonth == 3 || currentmonth == 5 || currentmonth == 7 || currentmonth == 8 || currentmonth == 10 || currentmonth == 12) {
                day.empty();
                console.log(currentmonth);
                for (let i = 1; i <= 31; i++) {
                    day.append("<option value='" + i + "'>" + i + "号" + "</option>");
                }
            } else if (currentmonth == 4 || currentmonth == 6 || currentmonth == 9 || currentmonth == 11) {
                day.empty();
                console.log(currentmonth);
                for (let i = 1; i <= 30; i++) {
                    day.append("<option value='" + i + "'>" + i + "号" + "</option>");
                }
            }
            // 选择年后将初始化的有数据的月的一号的数据展示
            $("#page").hide();
            $("#tablearea").find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < message.ocpehhccList.length; i++) {
                if (message.ocpehhccList[i].year == parseInt(yearselected) && message.ocpehhccList[i].month == currentmonth && message.ocpehhccList[i].day == 1) {
                    let text = "<tr><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].year + "</td><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].month + "</td><td style='text-align: center; width: 10%;'>" +
                        message.ocpehhccList[i].day + "</td><td>" + message.ocpehhccList[i].time + "</td><td>" +
                        message.ocpehhccList[i].dbt + "</td><td>" + message.ocpehhccList[i].pre + "</td><td>" +
                        message.ocpehhccList[i].rhm + "</td><td>" + message.ocpehhccList[i].wDir + "</td><td>" +
                        message.ocpehhccList[i].wSpd + "</td><td>" + message.ocpehhccList[i].dpt + "</td><td>" +
                        message.ocpehhccList[i].wbt + "</td><td>" + message.ocpehhccList[i].gsr + "</td><td>" +
                        message.ocpehhccList[i].dif + "</td><td>" + message.ocpehhccList[i].dir + "</td><td>";
                    if (message.ocpehhccList[i].pct === null) {
                        text += "无降水</td></tr>";
                    } else {
                        text += message.ocpehhccList[i].pct + "</td></tr>";
                        // console.log(message.ocpehhccList[i].pct);
                    }
                    $("#tablearea").append(text);
                }
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}



// 热湿耦合选择月份
function selectMonth() {
    let yearselected = $("#selectyear option:checked").text();
    let monthselected = $("#selectmonth option:checked").text();
    let currentmonth;
    let monthtext = "";
    let month = $("#selectmonth");
    let day = $("#selectday");
    // 根据月份改变selectday里面的可选日期
    currentmonth = parseInt(monthselected.substring(0, monthselected.lastIndexOf("月")));
    if (currentmonth == 2) {
        console.log(currentmonth);
        day.empty();
        if (isleapyear(parseInt(yearselected))) {
            for (let i = 1; i <= 29; i++) {
                day.append("<option value='" + i + "'>" + i + "号" + "</option>");
            }
        } else {
            for (let i = 1; i <= 28; i++) {
                day.append("<option value='" + i + "'>" + i + "号" + "</option>");
            }
        }

    } else if (currentmonth == 1 || currentmonth == 3 || currentmonth == 5 || currentmonth == 7 || currentmonth == 8 || currentmonth == 10 || currentmonth == 12) {
        day.empty();
        console.log(currentmonth);
        for (let i = 1; i <= 31; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    } else if (currentmonth == 4 || currentmonth == 6 || currentmonth == 9 || currentmonth == 11) {
        day.empty();
        console.log(currentmonth);
        for (let i = 1; i <= 30; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    }
    // 根据选择的月份展示每个月一号的数据
    $.ajax({
        url: "/apis/building/outdoorparm/getocpehhccByStationId?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            $("#page").hide();
            $("#tablearea").find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < message.ocpehhccList.length; i++) {
                if (message.ocpehhccList[i].year == parseInt(yearselected) && message.ocpehhccList[i].month == currentmonth && message.ocpehhccList[i].day == 1) {
                    let text = "<tr><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].year + "</td><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].month + "</td><td style='text-align: center; width: 10%;'>" +
                        message.ocpehhccList[i].day + "</td><td>" + message.ocpehhccList[i].time + "</td><td>" +
                        message.ocpehhccList[i].dbt + "</td><td>" + message.ocpehhccList[i].pre + "</td><td>" +
                        message.ocpehhccList[i].rhm + "</td><td>" + message.ocpehhccList[i].wDir + "</td><td>" +
                        message.ocpehhccList[i].wSpd + "</td><td>" + message.ocpehhccList[i].dpt + "</td><td>" +
                        message.ocpehhccList[i].wbt + "</td><td>" + message.ocpehhccList[i].gsr + "</td><td>" +
                        message.ocpehhccList[i].dif + "</td><td>" + message.ocpehhccList[i].dir + "</td><td>";
                    if (message.ocpehhccList[i].pct === null) {
                        text += "无降水</td></tr>";
                    } else {
                        text += message.ocpehhccList[i].pct + "</td></tr>";
                        // console.log(message.ocpehhccList[i].pct);
                    }
                    $("#tablearea").append(text);
                }
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}

// 热湿耦合选择日
function chooseDay() {
    let yearselected = $("#selectyear option:checked").text();
    let monthselected = $("#selectmonth option:checked").text();
    let dayselected = $("#selectday option:checked").text();
    let currentday = dayselected.substring(0, dayselected.lastIndexOf("号"));
    let currentmonth = monthselected.substring(0, monthselected.lastIndexOf("月"));
    let month = $("#selectmonth");
    let day = $("#selectday");
    $.ajax({
        url: "/apis/building/outdoorparm/getocpehhccByStationId?id=" + document.getElementById('number').value,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
            $("#page").hide();
            $("#tablearea").find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < message.ocpehhccList.length; i++) {
                if (message.ocpehhccList[i].year == parseInt(yearselected) && message.ocpehhccList[i].month == currentmonth && message.ocpehhccList[i].day == currentday) {
                    let text = "<tr><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].year + "</td><td style='text-align: center; width: 10%;'>" + message.ocpehhccList[i].month + "</td><td style='text-align: center; width: 10%;'>" +
                        message.ocpehhccList[i].day + "</td><td>" + message.ocpehhccList[i].time + "</td><td>" +
                        message.ocpehhccList[i].dbt + "</td><td>" + message.ocpehhccList[i].pre + "</td><td>" +
                        message.ocpehhccList[i].rhm + "</td><td>" + message.ocpehhccList[i].wDir + "</td><td>" +
                        message.ocpehhccList[i].wSpd + "</td><td>" + message.ocpehhccList[i].dpt + "</td><td>" +
                        message.ocpehhccList[i].wbt + "</td><td>" + message.ocpehhccList[i].gsr + "</td><td>" +
                        message.ocpehhccList[i].dif + "</td><td>" + message.ocpehhccList[i].dir + "</td><td>";
                    if (message.ocpehhccList[i].pct === null) {
                        text += "无降水</td></tr>";
                    } else {
                        text += message.ocpehhccList[i].pct + "</td></tr>";
                        // console.log(message.ocpehhccList[i].pct);
                    }
                    $("#tablearea").append(text);
                }
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}

// 判断是不是闰年
function isleapyear(year) {
    if (year % 400 == 0 && year % 100 == 0) {
        return true;
    } else if (year % 4 == 0 && year % 100 != 0) {
        return true;
    }
    return false;

}