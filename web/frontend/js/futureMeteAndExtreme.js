var Global_province 
var Global_city
var Global_station_id
var stationId = window.location.href.split("=")[1]
if (stationId) {
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" + stationId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            getprovince(message.stationinfo.province,message.stationinfo.cityName);
            //citycontent(message.stationinfo.province,message.stationinfo.cityName);

            $('#number').val(message.stationinfo.stationId);
        },
        error: function() {
        }
    });
} else {
    getInitProvinceAndCity();
}

//获取省份信息
function getprovince(province,city){
    $.ajax({
    url: "/apis/building/selectcity/getprovince",
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(message) {
        console.log(message)
        $('#province').empty();
        for (var i = 0; i < message.provinceList.length; i++) {
            if(message.provinceList[i]==province){
                  $('#province').append('<option selected="selected">' + message.provinceList[i] + '</option>');
            }else{
                  $('#province').append('<option>' + message.provinceList[i] + '</option>');
                 }
        }
       // $("#province option:selected").text(province);
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
                        if(message.cityList[i]==city){
                         $('#city').append('<option selected="selected">' + message.cityList[i] + '</option>');
                     }else{
                         $('#city').append('<option>' + message.cityList[i] + '</option>');
                     }
                    }
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
                                var stationId = document.getElementById('number').value;
                               Global_province =  $("#province option:selected").text()
                               Global_city = $("#city option:selected").text()
                               Global_station_id=stationId
                                //站点的经度、维度、海拔和气候区
                                getAlititude()
                                var type =  $("#selectparam option:selected").text();
                                initialdata(type,stationId);
                            },
                            error: function() {

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
                //numbercontent($("#city option:checked").text());
            }else{
                numbercontent($("#city option:checked").text());
            }
        },
        error: function() {}
    });
}
function getprovinceAndCity(){
    $.ajax({
        url: "/apis/building/selectcity/getprovince",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message)
            $('#province').empty();
		console.log(Global_province)
		console.log(Global_city)
console.log(Global_station_id)
            for (var i = 0; i < message.provinceList.length; i++) {
                if(message.provinceList[i]!=Global_province)
                $('#province').append('<option>' + message.provinceList[i] + '</option>');
            }
            $("#province option:selected").text(Global_province)
            console.log(1);
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
                            if(message.cityList[i]!=Global_city)
                            $('#city').append('<option>' + message.cityList[i] + '</option>');
                        }
                        $("#city option:selected").text(Global_city)
                        $("#number option:selected").text(Global_station_id)
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
//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    var province = $("#province option:checked").text();
    var city = $("#city option:checked").text()
    var station_id = document.getElementById('number').value
    console.log("提前拿到的省份信息",province,city,station_id)
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
                        getAlititude()
                        getData(province,city,station_id);
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
    var province = $("#province option:checked").text();
    var city = $("#city option:checked").text()
    var station_id = document.getElementById('number').value
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
            getAlititude()
            getData(province,city,station_id);
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
    var province = $("#province option:checked").text();
    var city = $("#city option:checked").text()
    var station_id = document.getElementById('number').value

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
                                    
                                    getData(province,city,station_id);
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
                            getData(province,city,station_id);
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
            console.log('查看是什么',message)
            $('#number').empty();
            $('#number').val(message.stationList)
            if (message.stationList.length > 0) {
                for (var i = 0; i < message.stationList.length; i++) {
                    $('#number').append('<option>' + message.stationList[i] + '</option>');
                }
            }
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            //站点的经度、维度、海拔和气候区
            getAlititude()
            //获取当前站点所选参数的数据

        },
        error: function() {

        }
    });
}

function getAlititude(){
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
            $('#climates').val(message.stationinfo.climates);
        },
        error: function() {

        }
    });
}