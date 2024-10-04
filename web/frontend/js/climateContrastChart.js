

//空气温度图
function getTemperature(id, temperid) {
    $.ajax({
        url: '/apis/building/basicclimate/getttemById?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
            if (result.dayAvgMonthAvgList.length == 0)
            alert("没有该站点信息")
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
            if (result.dayAvgMonthAvgList.length == 0)
            alert("没有该站点信息")
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
            if (result.dayDirectList.length == 0)
            alert("没有该站点信息")
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
function getWinds(id, windid) {
    $.ajax({
        url: '/apis/building/basicclimate/getwdrwsp?id=' + id,
        type: 'get',
        dataType: "json", //表示从服务端返回的数据为纯文本类型
        success: function(result) { //表示请求成功后调用的函数
            console.log(result);
            if (result.list1.length == 0)
            alert("没有该站点信息")
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
                        },
                        
                    });
            }    
        },
        error: function() {
            alert("获取数据失败");
        }
    });

}