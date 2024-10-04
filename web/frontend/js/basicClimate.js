var temperid1 = 'tempermain',
    humidityid1 = 'humiditymain',
    solarrationid1 = 'radiationmain',
    windid1 = 'windmain';

//初始化
//根据传递过来的台站号获得省份、城市信息、经度、维度、海拔、气候区属信息
//默认站点的经度、维度、海拔和气候区
var stationId = window.location.href.split("=")[1]
console.log(stationId)
if (stationId) {
    $.ajax({
        url: "/apis/building/selectcity/getstationinfo?stationid=" +stationId ,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            //getInitProvinceAndCity(message.stationinfo.province);
            getprovince(message.stationinfo.province);
            citycontent(message.stationinfo.province,message.stationinfo.cityName);
            //$("#city option:selected").text(message.stationinfo.cityName);
            $('#number').val(message.stationinfo.stationId)
            numbercontent(message.stationinfo.cityName)
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
            $("#province option:selected").text(province)
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
            }
        },
        error: function() {}
    });
}
//获取省份信息
function getInitProvinceAndCity(province){
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
            //获取所选省份的城市信息
            $.ajax({
                url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(message) {
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
                                    var stationId = document.getElementById('number').value
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
                                            $('#climates').val(message.stationinfo.climates);
                                            //绘制图表
                                            getTemperature(stationId, temperid1);
                                            //获取湿度
                                            getHumidity(stationId, humidityid1);
                                            //获取太阳辐射
                                            getSolarradiation(stationId, solarrationid1);
                                            //获取风速图
                                            getWind(stationId, windid1);
    
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
    
        },
        error: function() {
    
        }
    });
 }


//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            
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
                                $('#climates').val(message.stationinfo.climates);
                                //绘制图表
                     getTemperature( document.getElementById('number').value, temperid1);
                     //获取湿度
                     getHumidity( document.getElementById('number').value, humidityid1);
                     //获取太阳辐射
                     getSolarradiation( document.getElementById('number').value, solarrationid1);
                     //获取风速图
                     getWind( document.getElementById('number').value, windid1);
                                
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
                    $('#climates').val(message.stationinfo.climates);

                    var stationId = document.getElementById('number').value
                     //绘制图表
                     getTemperature(stationId, temperid1);
                     //获取湿度
                     getHumidity(stationId, humidityid1);
                     //获取太阳辐射
                     getSolarradiation(stationId, solarrationid1);
                     //获取风速图
                     getWind(stationId, windid1);
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

    var stationId = document.getElementById('number').value
    //绘制图表
    getTemperature(stationId, temperid1);
    //获取湿度
    getHumidity(stationId, humidityid1);
    //获取太阳辐射
    getSolarradiation(stationId, solarrationid1);
    //获取风速图
    getWind(stationId, windid1);
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

function numbercontent(city) {
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
 	console.log(message)
            $('#number').empty();
            $('#number').val(message.stationList[0])
            var stationId =document.getElementById('number').value; 
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
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
                    $('#climates').val(message.stationinfo.climates);
			
                     //绘制图表
                     getTemperature(stationId , temperid1);
                     //获取湿度
                     getHumidity(stationId , humidityid1);
                     //获取太阳辐射
                     getSolarradiation(stationId , solarrationid1);
                     //获取风速图
                     getWind(stationId , windid1);
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
//空气温度图
function getTemperature(id, temperid) {
    $.ajax({
        url: '/apis/building/basicclimate/getttemById?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
	console.log(result)
            if (result.dayAvgMonthAvgList.length == 0){
                $('#tempermain').html("");
                 //$('#chart-2').html("");
                alert("没有该站点信息");
            }
            
            else{
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            let inner = "";
                            for (let i = 0; i < params.length; i++) {
                                for (var j = i; j < params.length; j++) {
                                    if (params[i].data < params[j].data) {
                                        var temp = {};
                                        temp = params[i];
                                        params[i] = params[j];
                                        params[j] = temp;
                                    }
                                }
                                inner += '<div style="padding: 5px 2px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
                            }
                            res = '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 5px;">' + inner + '</div>';
                            // console.log(params[0].dataIndex);
                            switch (params[0].dataIndex) {
                                case 0:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '一月' + '</div>' + res;
                                case 1:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '二月' + '</div>' + res;
                                case 2:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '三月' + '</div>' + res;
                                case 3:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '四月' + '</div>' + res;
                                case 4:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '五月' + '</div>' + res;
                                case 5:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '六月' + '</div>' + res;
                                case 6:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '七月' + '</div>' + res;
                                case 7:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '八月' + '</div>' + res;
                                case 8:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '九月' + '</div>' + res;
                                case 9:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十月' + '</div>' + res;
                                case 10:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十一月' + '</div>' + res;
                                case 11:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十二月' + '</div>' + res;
                            }
                        },
                    },
                    legend: {
                        data: ['累年日最大值', '累年日最大值的月均值', '累年日均值的月均值', '累年日均值的月最小值', '累年日最小值']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                    right: '20',
                        feature: {
                            saveAsImage: {title:'存为png图片'}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: { formatter: '{value} ℃' }
                    },
                    series: [{
                            name: '累年日最小值',
                            type: 'line',
                            symbol: 'rectangle',
                            stack: '总量1',
                            data: result.dayMinList,
                            lineStyle: {
                                normal: {
                                    color: 'white',
                                    width: 4,
                                    type: 'none'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: '#ff6060',
                                    color: 'red'
                                }
                            }
                        },
                        {
                            name: '累年日均值的月最小值',
                            type: 'bar',
                            barWidth: '20%',
                            itemStyle: {
                                normal: {
                                    color: 'skyblue',
                                    // opacity: 0.1
                                }
                            },
                            stack: '总量2',
                            data: result.dayMinMonthAvgList
                        },
                        {
                            name: '累年日均值的月均值',
                            type: 'line',
                            stack: '总量3',
                            data: result.dayAvgMonthAvgList
                        },
                        {
                            name: '累年日最大值的月均值',
                            type: 'bar',
                            stack: '总量4',
                            data: result.dayMaxMonthAvgList
                        },
                        {
                            name: '累年日最大值',
                            type: 'line',
                            symbol: 'diamond',
                            stack: '总量5',
                            data: result.dayMaxList,
                            lineStyle: {
                                normal: {
                                    color: 'white',
                                    width: 4,
                                    type: 'none'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: '#ff2929',
                                    color: '#ff2929'
                                }
                            }
                        }
                    ]
                };
                echarts.init(document.getElementById(temperid)).setOption(option);
            }           
        },
        error: function() {
            alert("获取数据失败");
        }
    });
}
//空气湿度图
function getHumidity(id, humidityid) {
    $.ajax({
        url: '/apis/building/basicclimate/getbbchumidity?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
	console.log(result)
            if (result.dayAvgMonthAvgList.length == 0){
                $('#humiditymain').html("");
                 //alert("没有该站点信息
            }
            else{
           
                var option1 = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            let inner = "";
                            // sum = 0;
                            // console.log('这里2');
                            // console.log('鼠标移到了这里' + window.mouseCurValue);
                            // console.log(params);
                            for (let i = 0; i < params.length; i++) {
                                for (var j = i; j < params.length; j++) {
                                    if (params[i].data < params[j].data) {
                                        var temp = {};
                                        temp = params[i];
                                        params[i] = params[j];
                                        params[j] = temp;
                                    }
                                }
                                inner += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
                            }
                            res = '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + inner + '</div>';
                            // console.log(params[0].dataIndex);
                            switch (params[0].dataIndex) {
                                case 0:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '一月' + '</div>' + res;
                                case 1:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '二月' + '</div>' + res;
                                case 2:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '三月' + '</div>' + res;
                                case 3:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '四月' + '</div>' + res;
                                case 4:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '五月' + '</div>' + res;
                                case 5:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '六月' + '</div>' + res;
                                case 6:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '七月' + '</div>' + res;
                                case 7:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '八月' + '</div>' + res;
                                case 8:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '九月' + '</div>' + res;
                                case 9:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十月' + '</div>' + res;
                                case 10:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十一月' + '</div>' + res;
                                case 11:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十二月' + '</div>' + res;
                            }
                        },
                    },
                    legend: {
                        data: ['累年日均值的月最小值', '累年日均值的月均值', '累年日均值的月最大值']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                    right: '20',
                        feature: {
                            saveAsImage: {title:'存为png图片'}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: { formatter: '{value} %' }
                    },
                    series: [{
                            name: '累年日均值的月最小值',
                            type: 'bar',
                            barWidth: '30%',
                            itemStyle: {
                                normal: {
                                    color: 'orange',
                                    opacity: 0.9
                                }
                            },
                            stack: '总量1',
                            data: result.dayMinMonthAvgList
                        },
                        {
                            name: '累年日均值的月均值',
                            type: 'line',
                            symbol: 'circle',
                            stack: '总量2',
                            lineStyle: {
                                normal: {
                                    color: 'white',
                                    width: 4,
                                    type: 'none'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor: '#2f4554',
                                    color: '#2f4554'
                                }
                            },
                            data: result.dayAvgMonthAvgList
                        },
                        {
                            name: '累年日均值的月最大值',
                            type: 'bar',
                            barWidth: '30%',
                            stack: '总量3',
                            data: result.dayMaxMonthAvgList
                        }
                    ]
                };
                echarts.init(document.getElementById(humidityid)).setOption(option1);
            }
          
        },
        error: function() {
            alert("获取数据失败");
        }
    });

}

//太阳辐射图
function getSolarradiation(id, solarraionid) {
    $.ajax({
        url: '/apis/building/basicclimate/getsolarradiation?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
	console.log(result)
            if (result.dayDirectList.length == 0){
                $('#radiationmain').html("");
                //alert("没有该站点信息")
            }
            
            else{
                var option2 = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            let inner = "";
                            // sum = 0;
                            // console.log('这里2');
                            // console.log('鼠标移到了这里' + window.mouseCurValue);
                            // console.log(params);
                            for (let i = 0; i < params.length; i++) {
                                for (var j = i; j < params.length; j++) {
                                    if (params[i].data < params[j].data) {
                                        var temp = {};
                                        temp = params[i];
                                        params[i] = params[j];
                                        params[j] = temp;
                                    }
                                }
                                inner += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
                            }
                            res = '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + inner + '</div>';
                            // console.log(params[0].dataIndex);
                            switch (params[0].dataIndex) {
                                case 0:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '一月' + '</div>' + res;
                                case 1:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '二月' + '</div>' + res;
                                case 2:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '三月' + '</div>' + res;
                                case 3:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '四月' + '</div>' + res;
                                case 4:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '五月' + '</div>' + res;
                                case 5:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '六月' + '</div>' + res;
                                case 6:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '七月' + '</div>' + res;
                                case 7:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '八月' + '</div>' + res;
                                case 8:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '九月' + '</div>' + res;
                                case 9:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十月' + '</div>' + res;
                                case 10:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十一月' + '</div>' + res;
                                case 11:
                                    return '<div style="font-size:18px;margin-left:40%;">' + '十二月' + '</div>' + res;
                            }
                        },
                    },
                    legend: {
                        data: ['累年日散射辐射月均值', '累年日直射辐射月均值', '累年日总辐射月均值']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                    right: '20',
                     feature: {
                          saveAsImage: {title:'存为png图片'}
                         }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        axisLine: {
                            lineStyle: {
                                color: '#000',
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: { formatter: '{value} MJ' }
                    },
                    series: [{
                            name: '累年日散射辐射月均值',
                            type: 'line',
                            symbol: 'rectangle',
                            stack: '总量1',
                            data: result.dayScatterList,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: '#f39c12',
                                    color: '#f39c12'
                                }
                            }
                        },
                        {
                            name: '累年日直射辐射月均值',
                            type: 'line',
                            symbol: 'triangle',
                            stack: '总量2',
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: '#ff2929',
                                    color: '#ff2929'
                                }
                            },
                            data: result.dayDirectList
                        },
                        {
                            name: '累年日总辐射月均值',
                            type: 'line',
                            symbol: 'diamond',
                            stack: '总量3',
                            data: result.daySumList,
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: '#ff2929',
                                    color: '#ff2929'
                                }
                            }
                        }
                    ]
                };
                echarts.init(document.getElementById(solarraionid)).setOption(option2);
            }     
        },
        error: function() {
            alert("获取数据失败");
        }
    });

}

//风速图
function getWind(id, windid) {
    $.ajax({
        url: '/apis/building/basicclimate/getwdrwsp?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
	console.log(result)
            if (result.list1.length == 0)
            {
                $('#windmain').html("");
                //alert("没有该站点信息")

            }
                        else{
                for (var i = 0; i < result.list1.length; i++) {
                    result.list1[i] = parseFloat(result.list1[i]) / 100;
                }
                max = 0;
                for (var i = 0; i < result.list2.length; i++) {
                    result.list2[i] = parseFloat(result.list2[i]) / 100;
                }
                for (var i = 0; i < result.list3.length; i++) {
                    result.list3[i] = parseFloat(result.list3[i]) / 100;
                }
                for (var i = 0; i < result.list4.length; i++) {
                    result.list4[i] = parseFloat(result.list4[i]) / 100;
                }
                for (var i = 0; i < result.list5.length; i++) {
                    result.list5[i] = parseFloat(result.list5[i]) / 100;
                }
                for (var i = 0; i < result.list6.length; i++) {
                    result.list6[i] = parseFloat(result.list6[i]) / 100;
                }
                for (var i = 0; i < result.list7.length; i++) {
                    result.list7[i] = parseFloat(result.list7[i]) / 100;
                }
                for (var i = 0; i < result.list8.length; i++) {
                    result.list8[i] = parseFloat(result.list8[i]) / 100;
                }
                var maxsum = 0;
                var max;
                for (var i = 0; i < 16; i++) {
                    max = 0;
                    max = result.list1[i] + result.list2[i] + result.list3[i] + result.list4[i] + result.list5[i] + result.list6[i] + result.list7[i] + result.list8[i];
                    if (max > maxsum) {
                        maxsum = max;
                    }
                }
                legendName = ["≤0.2m/s", "＞0.2且≤1.5m/s", "＞1.5且≤3.5m/s", "＞3.5且≤5.5m/s",
                        "＞5.5且≤10.5m/s", "＞10.5且≤15.5m/s", "＞15.5且≤25.5m/s", "≥25.5m/s",
                    ],
                    echarts.init(document.getElementById(windid)).setOption({
                        tooltip: {
                            trigger: 'item',
                            textStyle: {
                                fontSize: 16,
                                color: '#fff',
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        color: ["#0001F7", "#00B8FE", "#00FFFF", "#00FF68", "#BEFE00", "#FFFF00", "#FFA800", "#E10100"],
                        toolbox: {
                             right: '20',
                            feature: {
                                saveAsImage: {title:'存为png图片'}
                            }
                        },
                        angleAxis: {
                            zlevel: 2,
                            type: 'category',
                            data: [
                                { value: 'N' },
                                { value: 'NNE' },
                                { value: 'NE' },
                                { value: 'ENE' },
                                { value: 'E' },
                                { value: 'ESE' },
                                { value: 'SE' },
                                { value: 'SSE' },
                                { value: 'S' },
                                { value: 'SSW' },
                                { value: 'SW' },
                                { value: 'WSW' },
                                { value: 'W' },
                                { value: 'WNW' },
                                { value: 'NW' },
                                { value: 'NNW' }
                            ],
                            boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
                            axisTick: {
                                show: true //是否显示坐标轴刻度
                            },
                            show: true,
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    // color: "black"
                                },
                            },
                            axisLabel: {
                                show: true,
                                interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
                            },
                        },
                        radiusAxis: {
                            min: 0,
                            //max: 1,
                            axisLabel: {
                                formatter: '{value}',
                                margin: -25,
                                textStyle: {
                                    fontSize: 10,
                                    color: 'black',
                                    padding: 5,
                                    width: 30,
                                    backgroundColor: '',
                                    borderColor: '',
                                    borderWidth: 1,
                                    fontFamily: 'Microsoft YaHei'
                                },
                                rich: {}
                            },
                            zlevel: 3,
                            axisTick: {
                                show: false //是否显示坐标轴刻度
                            },
                            axisLine: {
                                show: true, //是否显示坐标轴轴线
                            },
                        },
                        polar: { center: ['50%', 223] },
                        series: [{
                                barCategoryGap: 0,
                                type: 'bar',
                                zlevel: 1,
                                data: result.list1,
                                coordinateSystem: 'polar',
                                name: legendName[0],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                    borderWidth: 0,
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list2,
                                coordinateSystem: 'polar',
                                name: legendName[1],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list3,
                                coordinateSystem: 'polar',
                                name: legendName[2],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list4,
                                coordinateSystem: 'polar',
                                name: legendName[3],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list5,
                                coordinateSystem: 'polar',
                                name: legendName[4],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list6,
                                coordinateSystem: 'polar',
                                name: legendName[5],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }, {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list7,
                                coordinateSystem: 'polar',
                                name: legendName[6],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            },
                            {
                                barCategoryGap: 0,
                                type: 'bar',
                                data: result.list8,
                                coordinateSystem: 'polar',
                                name: legendName[7],
                                stack: 'a',
                                itemStyle: {
                                    borderColor: '',
                                }
                            }
                        ],
                        legend: {
                            show: true,
                            data: legendName,
                            width: 500, //根据宽度调整换行 
                        }
                    });
            }    
        },
        error: function() {
            alert("获取数据失败");
        }
    });

}