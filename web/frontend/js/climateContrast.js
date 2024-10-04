var stationId = window.location.href.split("=")[1]
init(stationId);
function init(stationId){
if (stationId) {
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + theRequest['stationId'],
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            getprovince(message.stationinfo.province);
            citycontent(message.stationinfo.province,message.stationinfo.cityName);
            //$("#city1 option:selected").text(message.stationinfo.cityName);
            //$("#city2 option:selected").text(message.stationinfo.cityName);
            $('#number1').val(message.stationinfo.stationId)
            $('#number2').val(message.stationinfo.stationId)
            getTableInfo()
        },
        error: function() {
        }
    });
} else {
    getInitProvinceAndCity();
}
}
//获取省份信息
function getprovince(province) {
    $.ajax({
        url: "/apis/building/selectcity/getprovince",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#province1').empty();
            $('#province2').empty();
            for (var i = 0; i < message.provinceList.length; i++) {
                if(message.provinceList[i]==province){
                    $('#province1').append('<option selected="selected">' + message.provinceList[i] + '</option>');
                    $('#province2').append('<option selected="selected">' + message.provinceList[i] + '</option>');
                }else{
                    $('#province1').append('<option>' + message.provinceList[i] + '</option>');
                    $('#province2').append('<option>' + message.provinceList[i] + '</option>');
                }
            }  
           //$("#province1 option:selected").text(province);
           // $("#province2 option:selected").text(province);
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
            $('#city1').empty();
            $('#city2').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    if(message.cityList[i]==city){
                         $('#city1').append('<option selected="selected">' + message.cityList[i] + '</option>');
                         $('#city2').append('<option selected="selected">' + message.cityList[i] + '</option>');
                     }else{
                        $('#city1').append('<option>' + message.cityList[i] + '</option>');
                         $('#city2').append('<option>' + message.cityList[i] + '</option>');
                     }
                } 
            }
        },
        error: function() {}
    });
}


function getTableInfo() {
    var temperid1 = 'tempermain',
        temperid2 = 'tempermain2',
        humidityid1 = 'humiditymain',
        humidityid2 = 'humiditymain2',
        solarrationid1 = 'radiationmain',
        solarrationid2 = 'radiationmain2',
        windid1 = 'windmain1',
        windid2 = 'windmain2';
        var stationid1 = document.getElementById('number1').value,
        stationid2 = document.getElementById('number2').value;
     
    var val = $("#param option:checked").text();
    if (val == '空气温度图') {
        $('#temperparam').show();
        $('#humidityparam').hide();
        $('#solarrationparam').hide();
        $('#windparam').hide();
        getTemperature(stationid1, temperid1);
        getTemperature(stationid2, temperid2);
    } else if (val == '空气湿度图') {
        $('#temperparam').hide();
        $('#humidityparam').show();
        $('#solarrationparam').hide();
        $('#windparam').hide();
        getHumidity(stationid1, humidityid1);
        getHumidity(stationid2, humidityid2);
    } else if (val == '太阳辐射图') {
        $('#temperparam').hide();
        $('#humidityparam').hide();
        $('#solarrationparam').show();
        $('#windparam').hide();
        getSolarradiation(stationid1, solarrationid1);
        getSolarradiation(stationid2, solarrationid2);
    } else if (val == '风玫瑰图') {
        $('#temperparam').hide();
        $('#humidityparam').hide();
        $('#solarrationparam').hide();
        $('#windparam').show();
        getWinds(stationid1, windid1);
        getWinds(stationid2, windid2);
    }
}
function paramSelected() {
    getTableInfo()
}

//获取省份信息1和2
function getInitProvinceAndCity(){
   $.ajax({
    url: "/apis/building/selectcity/getprovince",
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(message) {
        console.log(message);
        $('#province2').empty();
        $('#province1').empty();
        for (var i = 0; i < message.provinceList.length; i++) {
            $('#province2').append('<option>' + message.provinceList[i] + '</option>');
            $('#province1').append('<option>' + message.provinceList[i] + '</option>');
        }
        //获取所选省份的城市信息2
        $.ajax({
            url: "/apis/building/selectcity/getcitys?province=" + $("#province2 option:checked").text(),
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                console.log(message);
                $('#city2').empty();
                $('#city1').empty();
                if (message.cityList.length > 0) {
                    for (var i = 0; i < message.cityList.length; i++) {
                        $('#city2').append('<option>' + message.cityList[i] + '</option>');
                        $('#city1').append('<option>' + message.cityList[i] + '</option>');
                    }
                    //所选城市的站点信息
                        $.ajax({
                            url: "/apis/building/selectcity/getstations?city=" + $("#city2 option:checked").text(),
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(message) {
                                console.log(message);
                                $('#number2').empty();
                                $('#number1').empty();
                                if (message.stationList.length > 0) {
                                    $('#number2').val(message.stationList[0]);
                                    $('#number1').val(message.stationList[0]);
                                }
                                getTableInfo(); 
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


//省份切换2
function provinceSelected2() {
    //获取切换省份后的城市信息
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + $("#province2 option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#city2').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    $('#city2').append('<option>' + message.cityList[i] + '</option>');
                }
                //获取当前城市的站点信息
                $.ajax({
                    url: "/apis/building/selectcity/getstations?city=" + $("#city2 option:checked").text(),
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(message) {
                        console.log(message);
                        $('#number2').empty();
                        if (message.stationList.length > 0) {

                            $('#number2').val(message.stationList[0]);

                        }
                        getTableInfo();
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
//城市切换2
function citySelected2() {
    //获取当前城市的站点信息
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + $("#city2 option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number2').empty();
            if (message.stationList.length > 0) {

                $('#number2').val(message.stationList[0]);

            }
            getTableInfo();
        },
        error: function() {

        }
    });
}


//省份切换1
function provinceSelected1() {
    //获取切换省份后的城市信息
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + $("#province1 option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#city1').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    $('#city1').append('<option>' + message.cityList[i] + '</option>');
                }
                //获取当前城市的站点信息
                $.ajax({
                    url: "/apis/building/selectcity/getstations?city=" + $("#city1 option:checked").text(),
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(message) {
                        console.log(message);
                        $('#number1').empty();
                        if (message.stationList.length > 0) {

                            $('#number1').val(message.stationList[0]);

                        }
                        getTableInfo();
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
function citySelected1() {
    //获取当前城市的站点信息
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + $("#city1 option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number1').empty();
            if (message.stationList.length > 0) {

                $('#number1').val(message.stationList[0]);

            }
            getTableInfo();
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

//通过输入的城市名查询获取数据
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
                console.log(m);
                $('#searchResult').empty();
                $('#searchResult').append(m);
            }
            console.log(message);
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
    console.log(searchContent.match(input_reg1));
    if (searchContent.match(input_reg1)) {
        $.ajax({
            url: "/apis/building/selectcity/getstations?city=" + searchContent,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                console.log(message);
                $.ajax({
                    url: "/apis/building/selectcity/getstationinfo?stationid=" + message.stationList,
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        $.ajax({
                            url: "/apis/building/selectcity/getcitys?province=" + data.stationinfo.province,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(city) {
                                console.log(city);
                                $('#city1').empty();
                                if (city.cityList.length > 0) {
                                    for (var i = 0; i < city.cityList.length; i++) {
					if(city.cityList[i]!=data.stationinfo.cityName)
                                        $('#city1').append('<option>' + city.cityList[i] + '</option>');
                                    }
                                    $("#city1 option:selected").text(data.stationinfo.cityName)
                                    $("#province1 option:selected").text(data.stationinfo.province)
                                    $('#number1').val(data.stationinfo.stationId)
                                        //所选城市的站点信息                           
                                        // numbercontent($("#city option:checked").text());
                                      getTableInfo() 
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
                        $('#city1').empty();
                        if (city.cityList.length > 0) {
                            for (var i = 0; i < city.cityList.length; i++) {
				if(city.cityList[i]!=message.stationinfo.cityName)
                                $('#city1').append('<option>' + city.cityList[i] + '</option>');
                            }
                            $("#city1 option:selected").text(message.stationinfo.cityName)
                            $("#province1 option:selected").text(message.stationinfo.province)
                            $('#number1').val(message.stationinfo.stationId)
                                //所选城市的站点信息                           
                                // numbercontent($("#city option:checked").text());
                                getTableInfo()
                                
                        }
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    }


}

//通过输入查询获取站点2
var searchItem2 = '';
$('#search2').on('input propertychange', function() {
    var _v = $(this).val();
    console.log(_v);
    var input_reg1 = /^[\u4E00-\u9FA5]+$/;
    var input_reg2 = /^\d{3,5}$/;
    $('#search2').empty();
    if (_v.match(input_reg1)) {
        searchItem2 = _v;
        getSearchInputResult2(searchItem2);
    } else if (_v.match(input_reg2)) {
        searchItem2 = _v;
        getSearchInputNumberResult2(searchItem2);
    }
});
//通过输入查询城市名获取数据
function getSearchInputResult2(keyword) {
    console.log(keyword)
    $.ajax({
        url: "/apis/building/selectcity/getstation?city=" + keyword,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if (message.stationList.length == 0)
                alert("没有该站点信息")

            else {
                var m = '';
                for (var i = 0; i < message.stationList.length; i++) {
                    m += '<option  ' + ' value="' + message.stationList[i].cityName + '">';
                }
                console.log(m)
                $('#searchResult2').empty();
                $('#searchResult2').append(m);
            }
        },
        error: function() {}
    });

}

//通过输入的台站号查询获取数据
function getSearchInputNumberResult2(keyword) {
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
                $('#searchResult2').empty();
                $('#searchResult2').append(m);
            }
            console.log('这里');
            console.log(message.stationListId);

        },
        error: function() {}
    });
}


function getFuzyResult2() {
    var input_reg1 = /^[\u4E00-\u9FA5\（\）]+$/;
    var input_reg2 = /^\d{3,5}$/;
    var searchContent = document.getElementById('search2').value;
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
                                $('#city2').empty();
                                if (city.cityList.length > 0) {
                                    for (var i = 0; i < city.cityList.length; i++) {
					if(city.cityList[i]!=data.stationinfo.cityName)
                                        $('#city2').append('<option>' + city.cityList[i] + '</option>');
                                    }
                                    $("#city2 option:selected").text(data.stationinfo.cityName)
                                    $("#province2 option:selected").text(data.stationinfo.province)
                                    $('#number2').val(data.stationinfo.stationId)
                                        //所选城市的站点信息                           
                                        // numbercontent($("#city option:checked").text());
                                        getTableInfo()
                                        
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
                        $('#city2').empty();
                        if (city.cityList.length > 0) {
                            for (var i = 0; i < city.cityList.length; i++) {
				if(city.cityList[i]!=message.stationinfo.cityName)
                                $('#city2').append('<option>' + city.cityList[i] + '</option>');
                            }
                            $("#city2 option:selected").text(message.stationinfo.cityName)
                            $("#province2 option:selected").text(message.stationinfo.province)
                            $('#number2').val(message.stationinfo.stationId)
                                //所选城市的站点信息                           
                                // numbercontent($("#city option:checked").text());
                                getTableInfo()
                               
                        }
                    },
                    error: function() {}
                });
            },
            error: function() {}
        });
    }

}
