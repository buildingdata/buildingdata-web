var stationId = window.location.href.split("=")[1]
var draft = "draft"; //
var thermal_storage_draft = "thermal_storage_draft"; //
var evaporative = "evaporative"; //
var passive = "passive"; //
var dataTime = "!choose";
var beginTime = "0";
var toTime = "23";
var dataMonth = "!choose";
var fixed = "!fixed";
var beginMonth = "1";
var toMonth = "12";
var fixedMonth = "1";
// var city = "50639";

getOnlinePic(stationId);
function getOnlinePic(Id) {
    if ($("#Checkbox1").is(":checked")) {
        draft = "on"
    }else{
        draft = "off";
    }
    if ($("#Checkbox2").is(":checked")) {
        thermal_storage_draft = "on"
    }else{
        thermal_storage_draft = "off";
    }
    if ($("#Checkbox3").is(":checked")) {
        evaporative = "on"
    }else{
        evaporative = "off";
    }
    if ($("#Checkbox4").is(":checked")) {
        passive = "on"
    }else{
        passive = "off";
    }
    if ($("input[name='time']:checked").val() == "选择时段") {
        dataTime = "choose";
        beginTime = $("#timeSelectStart").val();
        toTime = $("#timeSelectEnd").val();
    }
    if ($("input[name='time']:checked").val() == "所有时段") {
        dataTime = "!choose";
        beginTime = "0";
        toTime = "23";
    }
    if ($("input[name='month']:checked").val() == "选择月份") {
        dataMonth = "choose";
        fixed = "!fixed"
        beginMonth = $("#monthSelectStart").val();
        toMonth = $("#monthSelectEnd").val();
    }
    if ($("input[name='month']:checked").val() == "固定月份") {
        dataMonth = "!choose";
        fixed = "fixed"
        fixedMonth = $("#monthFixed").val();
    }
    if ($("input[name='month']:checked").val() == "所有月份") {
        dataMonth = "!choose";
        fixed = "!fixed"
        fixedMonth = "1";
        toMonth = "12";
    }
    
    $.ajax({
        url: '/apis/building/basicclimate/OADrawPic?city=' + Id + '&&draft=' + draft + '&&thermal_storage_draft=' + thermal_storage_draft + '&&evaporative=' + evaporative + '&&passive=' + passive + '&&dataTime=' + dataTime + '&&beginTime=' + beginTime + '&&toTime=' + toTime + '&&dataMonth=' + dataMonth + '&&beginMonth=' + beginMonth + '&&toMonth=' + toMonth + '&&fixedMonth=' + fixedMonth,
        type: 'get',
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            if (result.code == 200) {
                console.log(result);
                let src = "data:image/png;base64, ";
                src = decodeURI(src.concat(result.imgb64)); //利用js自带的api 进行解码
                let img = document.querySelector('#onlineImg');
                img.setAttribute('src', src);
            } else {
                alert("该站点暂无数据");
            }
                   
        },
        error: function() {
            let img = document.querySelector('#onlineImg');
            img.setAttribute('src', "");
            alert("该站点暂无数据");
        }
    })
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
    success: function (message) {
        console.log(message);
        $('#province').empty();
        for (var i = 0; i < message.provinceList.length; i++) {
            if(message.provinceList[i]==province){
                $('#province').append('<option selected="selected">' + message.provinceList[i] + '</option>');
            }else{
                $('#province').append('<option>' + message.provinceList[i] + '</option>');
            }
        }
/*//获取省份信息
$.ajax({
    url: "/apis/building/selectcity/getprovince",
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (message) {
        console.log(message);
        $('#province').empty();
        for (var i = 0; i < message.provinceList.length; i++) {
            $('#province').append('<option>' + message.provinceList[i] + '</option>');
        }*/
        //获取所选省份的城市信息
        $.ajax({
            url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                console.log(message);
                $('#city').empty();
                if (message.cityList.length > 0) {
                    for (var i = 0; i < message.cityList.length; i++) {
                        $('#city').append('<option>' + message.cityList[i] + '</option>');
                    }

                    //默认站点的经度、维度、海拔和气候区
                    if (theRequest['stationId']) {
                        $.ajax({
                            url: "/apis/building/selectcity/getstationinfo?stationid=" + stationId,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (message) {
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

                            },
                            error: function () {

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
                            success: function (message) {
                                console.log(message);
                                $('#number').empty();
                                if (message.stationList.length > 0) {
                                    $('#number').val(message.stationList[0]);
                                }
                                //站点的经度、维度、海拔和气候区
                                $.ajax({
                                    url: "/apis/building/selectcity/getstationinfo?stationid=" + $("#number option:checked").text(),
                                    type: "get",
                                    contentType: "application/json",
                                    dataType: "json",
                                    success: function (message) {
                                        var latitude1 = message.stationinfo.latitude
                                        latitude1 = latitude1.toFixed(2)
                                        var longitude1 = message.stationinfo.longitude
                                        longitude1 = longitude1.toFixed(2)
                                        $('#longitude').val(longitude1);
                                        $('#latitude').val(latitude1);
                                        $('#altitude').val(message.stationinfo.altitude);
                                        $('#climates').val(message.stationinfo.climates);

                                    },
                                    error: function () {

                                    }
                                });
                            },
                            error: function () {

                            }
                        });
                    }


                }

            },
            error: function () {

            }
        });

    },
    error: function () {

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
        success: function (message) {
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
                    success: function (message) {
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
                            success: function (message) {
                                var latitude1 = message.stationinfo.latitude
                                latitude1 = latitude1.toFixed(2)
                                var longitude1 = message.stationinfo.longitude
                                longitude1 = longitude1.toFixed(2)
                                $('#longitude').val(longitude1);
                                $('#latitude').val(latitude1);
                                $('#altitude').val(message.stationinfo.altitude);
                                $('#climates').val(message.stationinfo.climates);
                                getOnlinePic(message.stationinfo.stationId);
                            },
                            error: function () {

                            }
                        });
                    },
                    error: function () {

                    }
                });
            }

        },
        error: function () {

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
        success: function (message) {
            console.log(message);
            $('#number').empty();
            if (message.stationList.length > 0) {

                $('#number').val(message.stationList[0]);

            }
            stationId = document.getElementById('number').value;
            //站点的经度、维度、海拔和气候区
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + stationId,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function (message) {
                    var latitude1 = message.stationinfo.latitude
                    latitude1 = latitude1.toFixed(2)
                    var longitude1 = message.stationinfo.longitude
                    longitude1 = longitude1.toFixed(2)
                    $('#longitude').val(longitude1);
                    $('#latitude').val(latitude1);
                    $('#altitude').val(message.stationinfo.altitude);
                    $('#climates').val(message.stationinfo.climates);
                    getOnlinePic(stationId);
                },
                error: function () {

                }
            });

        },
        error: function () {

        }
    });
}

// 通过输入的城市名/台站号模糊搜索
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
        error: function () {}
    });
}

//在线分析图
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

function numbercontent(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (message) {
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
                success: function (message) {
                    var latitude1 = message.stationinfo.latitude
                    latitude1 = latitude1.toFixed(2)
                    var longitude1 = message.stationinfo.longitude
                    longitude1 = longitude1.toFixed(2)
                    $('#longitude').val(longitude1);
                    console.log('这里输出');
                    console.log($('#longitude').val(longitude1));
                    $('#latitude').val(latitude1);
                    $('#altitude').val(message.stationinfo.altitude);
                    $('#climates').val(message.stationinfo.climates);
                },
                error: function () {

                }
            });
            //获取当前站点所选参数的数据

        },
        error: function () {

        }
    });
}

//监控时刻单选框
$("input[type=radio][name='time']").change(function () {
    if ($("input[name='time']:checked").val() == "选择时段") {
        $("#timeSelectStart").css("display", "inline-block")
        $("#timeSelectEnd").css("display", "inline-block")

    } else if ($("input[name='time']:checked").val() == "所有时段") {
        $("#timeSelectStart").css("display", "none")
        $("#timeSelectEnd").css("display", "none")
    }
})

//监控时刻选择的开始时刻的变化
$("#timeSelectStart").change(function () {
    $("#timeSelectEnd option").remove()
    let start = $("#timeSelectStart").val()
    let optionText = ""
    for (let i = Number(start) + 1; i <= 23; i++) {
        optionText = optionText + " <option value = '" + i + "'> " + i + " </option>"
    }
    console.log(optionText);
    $("#timeSelectEnd").append(optionText)

})

//监控月份单选框
$("input[type=radio][name='month']").change(function () {
    if ($("input[name='month']:checked").val() == "选择月份") {
        $("#monthSelectStart").css("display", "inline-block")
        $("#monthSelectEnd").css("display", "inline-block")
        $("#monthFixed").css("display", "none")
    } else if ($("input[name='month']:checked").val() == "所有月份") {
        $("#monthSelectStart").css("display", "none")
        $("#monthSelectEnd").css("display", "none")
        $("#monthFixed").css("display", "none")
    } else if ($("input[name='month']:checked").val() == "固定月份") {
        $("#monthSelectStart").css("display", "none")
        $("#monthSelectEnd").css("display", "none")
        $("#monthFixed").css("display", "inline-block")
    }
})

//监控月份选择的开始时刻的变化
$("#monthSelectStart").change(function () {
    $("#monthSelectEnd option").remove()
    let start = $("#monthSelectStart").val()
    let optionText = ""
    for (let i = Number(start) + 1; i <= 12; i++) {
        optionText = optionText + " <option value = '" + i + "'> " + i + " </option>"
    }
    console.log(optionText);
    $("#monthSelectEnd").append(optionText)

})

//查询按钮点击事件
$("#getPic").click(function (e) {
    var id = $("#number").val();
    getOnlinePic(id);

})