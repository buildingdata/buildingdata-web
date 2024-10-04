//空气温度图
$(function(){
            $("#submit").click(function(){
                var stationId = document.getElementById("stationId");

                $.ajax({
                    url:'/humidity/getbbchumidity',
                    type:'get',
                    data:{
                        'id':stationId,
                        time:new Date().getTime(),   //使用新的url，不使用缓存
                        cache:false   //表示不会从浏览器中加载缓存信息
                    },
                    async: true,
                    dataType:"json",   //表示从服务端返回的数据为纯文本类型
                    success:function(result){   //表示请求成功后调用的函数
                        generateChart(result);
                    },
                    error:function(){
                        alert("ajax调用失败");
                    }
                });
            })


function  generateChart(result){
//空气温度图
option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['累年日最大值','累年日最大值的月均值','累年日均值的月均值','累年日均值的月最小值','累年日最小值']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'累年日最小值',
            type:'line',
            symbol:'rectangle',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90],
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
            name:'累年日均值的月最小值',
            type:'bar',
            barWidth: '20%',
            itemStyle:{
                normal:{
                    color:'white',
                    opacity:0.1
                }
            },
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290]
        },
        {
            name:'累年日均值的月均值',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410,150, 232, 201, 154,330]
        },
        {
            name:'累年日最大值的月均值',
            type:'bar',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320,320, 332, 301,390, 330]
        },
        {
            name:'累年日最大值',
            type:'line',
            symbol: 'diamond',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901,1290, 1330],
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
echarts.init(document.getElementById('climatemain')).setOption(option);
//空气湿度图
option1 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['累年日均值的月最小值','累年日均值的月均值','累年日均值的月最大值']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'累年日均值的月最小值',
            type:'bar',
            barWidth: '10%',
            itemStyle:{
                normal:{
                    color:'white',
                    opacity:0.1
                }
            },
            stack: '总量',
            data:result.dayMinMonthAvgList
        },
        {
            name:'累年日均值的月均值',
            type:'line',
            symbol: 'circle',
            stack: '总量',
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
            data:result.dayAvgMonthAvgList
        },
        {
            name:'累年日均值的月最大值',
            type:'bar',
            barWidth: '10%',
            stack: '总量',
            data:result.dayMaxMonthAvgList
        }
    ]
};

echarts.init(document.getElementById('humiditymain')).setOption(option1,true);
//太阳辐射图
option2 = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['累年日散射辐射月均值','累年日直射辐射月均值','累年日总辐射月均值']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
         {
            name:'累年日散射辐射月均值',
            type:'line',
            symbol:'rectangle',
            stack: '总量',
            data:[120, 132, 101, 134,230, 210,120, 132, 101, 134, 90, 230,],
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    borderColor: '#f39c12',
                    color: '#f39c12'
                }
            }
        },
        {
            name:'累年日直射辐射月均值',
            type:'line',
            symbol:'triangle',
            stack: '总量',
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    borderColor: '#ff2929',
                    color: '#ff2929'
                }
            },
            data:[150, 232, 201, 154, 190, 330, 410,150,201, 154, 190, 330]
        },
        {
            name:'累年日总辐射月均值',
            type:'line',
            symbol: 'diamond',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1320,820, 932, 901, 934, 1290, 1330],
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
echarts.init(document.getElementById('radiationmain')).setOption(option2);
//风速图
// app.title = '极坐标系下的堆叠柱状图';

/*var option3 = {
    angleAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        z: 10
    },
    radiusAxis: {
    },
    polar: {

    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 3, 5, 1],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a'
    }, {
        type: 'bar',
        data: [2, 4, 6, 1, 3, 2, 1],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a'
    }, {
        type: 'bar',
        data: [1, 2, 3, 4, 1, 2, 5],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a'
    }],
    legend: {
        show: true,
        data: ['A', 'B', 'C']
    }
};
echarts.init(document.getElementById('windmain')).setOption(option3);*/

legendName=["≤0.2m/s","＞0.2且≤1.5m/s","＞1.5且≤3.5m/s","＞3.5且≤5.5m/s",
    "＞5.5且≤10.5m/s","＞10.5且≤15.5m/s","＞15.5且≤25.5m/s","≥25.5m/s"],
  echarts.init(document.getElementById('windmain')).setOption( {
     tooltip: {
         trigger: 'item',
         textStyle: {
             fontSize: 16,
             color: '#fff',
             fontFamily: 'Microsoft YaHei'
         }
     },
    color:["#0001F7","#00B8FE","#00FFFF","#00FF68","#BEFE00","#FFFF00","#FFA800","#E10100"],
    angleAxis: {
      zlevel:2,
      type: 'category',
      data: [
        {value: 'N'},
        {value: 'NNE'},
        {value: 'NE'},
        {value: 'ENE'},
        {value: 'E'},
        {value: 'ESE'},
        {value: 'SE'},
        {value: 'SSE'},
        {value: 'S'},
        {value: 'SSW'},
        {value: 'SW'},
        {value: 'WSW'},
        {value: 'W'},
        {value: 'WNW'},
        {value: 'NW'},
        {value: 'NNW'}
      ],

      boundaryGap:false,//标签和数据点都会在两个刻度之间的带(band)中间
      axisTick: {
        show: false//是否显示坐标轴刻度
      },
      show:true,
      splitLine: {
        show:true,
        lineStyle:{
          // color:"black"
        },
      },
      axisLabel:{
        show:true,
        interval:0,//坐标轴刻度标签的显示间隔，在类目轴中有效
      },

    },
    radiusAxis: {

      min:0,
      max:100,
      axisLabel: {
        formatter: '{value}   %',
        margin:-25,

        textStyle: {
          fontSize: 10,
          color: 'black',

          padding:5,
          width:30,

          backgroundColor:'lightgray',
          borderColor:'black',
          borderWidth:1,
          fontFamily: 'Microsoft YaHei'
        },
        rich: { }
      },

      zlevel:3,
      axisTick: {
        show: false//是否显示坐标轴刻度
      },
      axisLine:{
        show:true,//是否显示坐标轴轴线
      },
    },
    polar: {
    },
    series: [{
      barCategoryGap:0,
      type: 'bar',
      zlevel:1,
      data: [17,4,
        4,6,
        2,6,
        3,3,
        1,4,
        4,7,1, 1,
        2,2],
      coordinateSystem: 'polar',
      name: legendName[0],
      stack: 'a',
      itemStyle: {

        borderColor:'black',
        borderWidth:1,
      }


    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [7,  2,
        4,2,
        2,6,
         3,3,
        1,  4,
        4,3,
        1, 4,
        5, 2],
      coordinateSystem: 'polar',
      name: legendName[1],
      stack: 'a',
      itemStyle: {

        borderColor:'black',
      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [10, 4,
        14,12,
        12,32,
        23,23,
        21, 4,
        4,13,
        11,14,
        24,2],
      coordinateSystem: 'polar',
      name: legendName[2],
      stack: 'a',
      itemStyle: {

        borderColor:'black',
      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [10, 2,
       4, 2,
        2,6,
         3,3,
        1,4,
        4,3,
        1,4,
        3, 3],
      coordinateSystem: 'polar',
      name: legendName[3],
      stack: 'a',
      itemStyle: {

        borderColor:'black',
      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [10, 4,
       4, 2,
        1, 1,
        4,2,
        2,6,
        3, 3,
        2,6,
         3, 3],
      coordinateSystem: 'polar',
      name: legendName[4],
      stack: 'a',
      itemStyle: {

        borderColor:'black',

      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [10, 2,
        4,2, 
        1, 1,
        4,2, 
        2,6,
         3, 3,
        2,1,
        2, 3],
      coordinateSystem: 'polar',
      name: legendName[5],
      stack: 'a',
      itemStyle: {

        borderColor:'black',

      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [10,  4,
        4, 2,
        2,2,
        3, 3,
        1,  4,
        3, 3,
        2,6,
         3, 3],
      coordinateSystem: 'polar',
      name: legendName[6],
      stack: 'a',
      itemStyle: {

        borderColor:'black',

      }
    }, {
      barCategoryGap:0,
      type: 'bar',

      data: [0,  0,
         0, 0,
        0,  0,
       0,  2, 
        0,  0,
        3, 3,
        0, 0,
       2, 3],
      coordinateSystem: 'polar',
      name: legendName[7],
      stack: 'a',
      itemStyle: {
        borderColor:'black',

      }
    }],
    legend: {
      show: true,
      data: legendName,
      width:500,//根据宽度调整换行
 
    }
  });
}
})