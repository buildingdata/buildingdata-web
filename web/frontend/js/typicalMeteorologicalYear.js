$('#temperRadiation').show();
// $('#clound').hide();
$('#temperSolid').hide();
$('#windRose').hide();

var stationid = document.getElementById('number').value;
var windid = 'windRosemain';

function paramselect() {
    var val = $("#paramtype option:checked").text();
    if (val == '温度辐射综合图') {
        $('#temperRadiation').show();
        $('#clound').hide();
        $('#temperSolid').hide();
        $('#windRose').hide();
    }
     else if (val == '逐月份温湿度耦合图') {
        $('#temperRadiation').hide();
        $('#clound').hide();
        $('#temperSolid').show();
        $('#windRose').hide();
    }
}
var res = {
    xdata:[],
    result:[],  
}

function downloadFile(){
      
var Filetype = $("#datatype option:selected").text();
var stationId = document.getElementById('number').value
console.log("典型年下载文件",stationId,Filetype)
var file 
var saveFile
if (document.getElementById('admin_input').style.display == '') {
    if(Filetype=="bin文件数据集")
   {file = "../downData/BIN/"+stationId+".BIN";
    saveFile = +stationId+".BIN";
}
else if(Filetype=="epw文件数据集")
  {
file = "../downData/EPW/"+stationId+".epw";
saveFile = +stationId+".epw";
}
else if(Filetype=="tm2文件数据集")
 {
 file = "../downData/TM2/"+stationId+".tm2"
saveFile = +stationId+".tm2";
}
else if(Filetype=="wea文件数据集")
 {
 file = "../downData/WEA/"+stationId+".wea"
saveFile = +stationId+".wea";
}
console.log(file)
console.log(1)
 let link = document.createElement("a");
 link.href = file;
  //对下载的文件命名
    link.download = saveFile;
     document.body.appendChild(link);
     link.click();
    document.body.removeChild(link);
        
}else if (stationId == 50953 || stationId == 53463 ||stationId == 54161||stationId==51463||stationId==52866||stationId==52889||stationId==53772||stationId==53785||
stationId==53614||stationId==57131||stationId==57083||stationId==54342||stationId==54511||stationId==54527||stationId==54823||stationId==55591||stationId==56294||
stationId==56778||stationId==57816||stationId==57494||stationId==57516||stationId==57687||stationId==58606||stationId==59431||stationId==58321||stationId==58238||
stationId==58367||stationId==58457||stationId==58847||stationId==59287||stationId==59758||stationId==45007
    ) {
        if(Filetype=="bin文件数据集")
   {file = "../downData/BIN/"+stationId+".BIN";
    saveFile = +stationId+".BIN";
}
else if(Filetype=="epw文件数据集")
  {
file = "../downData/EPW/"+stationId+".epw";
saveFile = +stationId+".epw";
}
else if(Filetype=="tm2文件数据集")
 {
 file = "../downData/TM2/"+stationId+".tm2"
saveFile = +stationId+".tm2";
}
else if(Filetype=="wea文件数据集")
 {
 file = "../downData/WEA/"+stationId+".wea"
saveFile = +stationId+".wea";
}
console.log(file)
console.log(2)
 let link = document.createElement("a");
 link.href = file;
  //对下载的文件命名
    link.download = saveFile;
     document.body.appendChild(link);
     link.click();
    document.body.removeChild(link);
        
}else{
    console.log("没有下载权限，请联系管理员。邮箱：buildingdata@xauat.edu.cn");
    alert("没有下载权限，请联系管理员。邮箱：buildingdata@xauat.edu.cn")
}
}

//获取典型年的数据
function getTypicalData(id){
    $.ajax({
        url:'/apis/building/meteorological/getTypicalById?id='+id,
        type:'get',
        async: true,
        dataType:"json",   //表示从服务端返回的数据为纯文本类型
        success:function(result){   //表示请求成功后调用的函数;
            console.log('*********',document.getElementById('number').value);
            console.log(result);
            if (result.success) {
                var xdata = []
                array = ['0', '1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20', '21', '22', '23']
                for(var i=0;i<12;i++){
                   xdata = xdata.concat(array)
                }
                res.xdata = xdata  
                res.result =  result.typicalList.result;
                generateChart(res);
                
            }else{
                    $("#temperRadiation").html("");
                    alert("该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。");
            }
        },
        error:function(){
            alert("出错啦！");
        }
    });
}

function alertData(){
    //alert(11111);
    $('#datainfo').attr('data-target', '#station-info');
}
function  generateChart(res){
    //温度辐射综合图
    var option = {
        legend: {
            data: ['总辐射', '法向直射', '干球平均温度','干球温度最小值','干球温度最大值','水平面散射']
        },
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer: {type: 'line'},
            formatter: function(params){
             
                let res = "";
                for (let i = 0; i < params.length; i++) {
                    res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
                }
                return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
            },
            
        },
        axisPointer: {
          
            link: {xAxisIndex: '1'},
        },
               
        grid:{
            top:'25%'
        },
        legend: {     
            data: ['总辐射', '法向直射', '干球平均温度','干球温度最小值','干球温度最大值', '水平面散射'],         
        },
                       
        toolbox: {
            top: '10%',
            feature: {            
                saveAsImage: {show: true}
            }
        },
      
        xAxis: [{
            type: 'category',
            axisLabel: {  
                interval:289,  
             }  ,      
            data: res.xdata
        },{
            type: 'category',
            axisLabel: {  
                interval:0,  
             }  ,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            position: 'bottom'
        },
        ],
           
        yAxis: [
            {
                position:'left',
                name: "辐射W/m²",
                type: 'value',
                max: 1500,
                splitLine: {
                    show: false
                },
                interval:100,
                scale:true,
           
        },{
            position:'right',
            type : 'value',
            name:'温度℃',
            max: 50,
            interval:5,
            min:-30,
            splitLine: {
                show: false
            },
            scale:true,
        }
        ],
        
        series: [
            {
                name: '总辐射',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                yAxisIndex : '0',
                itemStyle: {
                    color: 'rgb(65, 105, 225)'
                },
                
                data: res.result[1].sunRad
            },
            {
                name: '法向直射',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                yAxisIndex : '0',
                itemStyle: {
                    color: 'rgb(0, 255, 0)'
                },
                areaStyle: {
                    color:'rgb(0, 255, 0)'
                },
                data: res.result[3].dirRad
            },
            {
                name: '干球平均温度',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                yAxisIndex : '1',
                data: res.result[0].dryTem
            },
            
            {
                name: '干球温度最小值',
                type: 'bar',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(30,144,255)'
                },
                yAxisIndex : '1',
                data: res.result[6].dryTemMin
            },
        
            {
                name: '干球温度最大值',
                type: 'bar',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(30,144,255)'
                },
                yAxisIndex : '1',
                data: res.result[5].dryTemMax
            },
            {
                name: '水平面散射',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                yAxisIndex : '0',
                itemStyle: {
                    color: 'rgb(250,128,114)'
                },
                areaStyle: {
                    color:'rgb(250,128,114)'
                },
                data:  res.result[4].scatterRad
            }
        ]
            
    }; 
    echarts.init(document.getElementById('temperRadiationmain')).setOption(option);


//逐月份温度湿度耦合图
//一月份
console.log(res);
var option11 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: "line"
        },
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24'],
        axisLine: {
            lineStyle: {
                color: '#000',
                width:1
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            // stack: '总量1',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(0,24)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            // stack: '总量2',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(0,24)
        }
    ]
};
var eachmonth1 = echarts.init(document.getElementById('temperSolidmain1'));
eachmonth1.setOption(option11);

//二月数据
var option12 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }
    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data:res.result[0].dryTem.slice(24,48)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(24,48)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain2')).setOption(option12);

//三月数据
var option13 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }
    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(48,72)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(48,72)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain3')).setOption(option13);

//四月数据
var option14 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(72,96)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(72,96)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain4')).setOption(option14);

//五月数据
var option15 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data:['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(96,120)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(96,120)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain5')).setOption(option15);

//六月数据
var option16 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(120,144)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(120,144)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain6')).setOption(option16);

//七月数据
var option17 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(144,168)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(144,168)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain7')).setOption(option17);

//八月数据
var option18 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(168,192)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(168,192)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain8')).setOption(option18);

//九月数据
var option19 = {
    tooltip: {
        trigger: 'axis',formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data:['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
           // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data:res.result[0].dryTem.slice(192,216)},
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            //stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(192,216)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain9')).setOption(option19);

//十月数据
var option110 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },

    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(216,240)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(216,240)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain10')).setOption(option110);

//十一月数据
var option111 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data: ['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(240,264)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(240,264)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain11')).setOption(option111);

//十二月数据
var option112 = {
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            let res = "";
            for (let i = 0; i < params.length; i++) {
                for (var j = i; j < params.length; j++) {
                    if (params[i].data < params[j].data) {
                        var temp = {};
                        temp = params[i];
                        params[i] = params[j];
                        params[j] = temp;
                    }
                }
                res += '<div style="padding: 10px 5px; ">' + '<div style="display:inline-block;margin:0px 5px 3px 0px;height:10px;width:10px;border-radius:10px;background-color:' + params[i].color + ';">' + '</div>' + params[i].seriesName + ':' + params[i].data + '</div>';
            }
            return '<div style="background: linear-gradient(to left, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) right top no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to bottom, #FCEA00, #FCEA00) left bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat, linear-gradient(to left, #FCEA00, #FCEA00) right bottom no-repeat;background-size: 1px 21px, 21px 1px, 1px 21px, 21px 1px;padding: 10px;">' + res + '</div>';
        },
    },
    legend: {
        data: ['温度年变化', '露点温度年变化']
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
        data:['0','1','2','3', '4', '5','6','7','8','9','10','11', '12','13','14', '15', '16','17','18', '19', '20','21','22', '23', '24']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}℃'
        }

    },
    series: [{
            name: '温度年变化',
            type: 'line',
            symbol: 'circle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'skyblue',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#00a65a',
                    color: '#00a65a'
                }
            },
            data: res.result[0].dryTem.slice(264,288)
        },
        {
            name: '露点温度年变化',
            type: 'line',
            symbol: 'rectangle',
            // stack: '总量',
            lineStyle: {
                normal: {
                    color: 'orange',
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#8cc63e',
                    color: '#8cc63e'
                }
            },
            data: res.result[2].PointTem.slice(264,288)
        }
    ]
};
echarts.init(document.getElementById('temperSolidmain12')).setOption(option112);

// getWind(1, 'windRosemain');
// //风玫瑰图
// function getWind(id, windid) {
//     $.ajax({
//         url: '/apis/building/basicclimate/getwdrwsp?id=' + 1,
//         type: 'get',
//         dataType: "json", //表示从服务端返回的数据为纯文本类型
//         success: function(result) { //表示请求成功后调用的函数
//             for (var i = 0; i < result.list1.length; i++) {
//                 result.list1[i] = parseFloat(result.list1[i]) / 100;
//             }
//             max = 0;
//             for (var i = 0; i < result.list2.length; i++) {
//                 result.list2[i] = parseFloat(result.list2[i]) / 100;
//             }
//             for (var i = 0; i < result.list3.length; i++) {
//                 result.list3[i] = parseFloat(result.list3[i]) / 100;
//             }
//             for (var i = 0; i < result.list4.length; i++) {
//                 result.list4[i] = parseFloat(result.list4[i]) / 100;
//             }
//             for (var i = 0; i < result.list5.length; i++) {
//                 result.list5[i] = parseFloat(result.list5[i]) / 100;
//             }
//             for (var i = 0; i < result.list6.length; i++) {
//                 result.list6[i] = parseFloat(result.list6[i]) / 100;
//             }
//             for (var i = 0; i < result.list7.length; i++) {
//                 result.list7[i] = parseFloat(result.list7[i]) / 100;
//             }
//             for (var i = 0; i < result.list8.length; i++) {
//                 result.list8[i] = parseFloat(result.list8[i]) / 100;
//             }
//             var maxsum = 0;
//             var max;
//             for (var i = 0; i < 16; i++) {
//                 max = 0;
//                 max = result.list1[i] + result.list2[i] + result.list3[i] + result.list4[i] + result.list5[i] + result.list6[i] + result.list7[i] + result.list8[i];
//                 if (max > maxsum) {
//                     maxsum = max;
//                 }
//             }
//             console.log('风速图数据');
//             console.log(maxsum);
//             legendName = ["≤0.2m/s", "＞0.2且≤1.5m/s", "＞1.5且≤3.5m/s", "＞3.5且≤5.5m/s",
//                     "＞5.5且≤10.5m/s", "＞10.5且≤15.5m/s", "＞15.5且≤25.5m/s", "≥25.5m/s",
//                 ],
//                 echarts.init(document.getElementById(windid)).setOption({
//                     // 提示框
//                     tooltip: {
//                         trigger: 'item', // 触发类型，默认数据触发，可选为：'item' ¦ 'axis' ,item为单项的提示框，axis为整体一列的所有值的提示框
//                         textStyle: {
//                             fontSize: 16,
//                             color: '#fff',
//                             fontFamily: 'Microsoft YaHei'
//                         }
//                     },
//                     //图中各个项的颜色，按顺序匹配。
//                     color: ["#0001F7", "#00B8FE", "#00FFFF", "#00FF68", "#BEFE00", "#FFFF00", "#FFA800", "#E10100"],
//                     //极坐标系的角度轴。基本与类目轴一致，可参考'categoryAxis'。
//                     angleAxis: {
//                         zlevel: 2, //zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的zlevel。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。  注：zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。                        
//                         type: 'category', //轴类型：类目（类别）
//                         data: [{
//                                 value: 'N'
//                             },
//                             {
//                                 value: 'NNE'
//                             },
//                             {
//                                 value: 'NE'
//                             },
//                             {
//                                 value: 'ENE'
//                             },
//                             {
//                                 value: 'E'
//                             },
//                             {
//                                 value: 'ESE'
//                             },
//                             {
//                                 value: 'SE'
//                             },
//                             {
//                                 value: 'SSE'
//                             },
//                             {
//                                 value: 'S'
//                             },
//                             {
//                                 value: 'SSW'
//                             },
//                             {
//                                 value: 'SW'
//                             },
//                             {
//                                 value: 'WSW'
//                             },
//                             {
//                                 value: 'W'
//                             },
//                             {
//                                 value: 'WNW'
//                             },
//                             {
//                                 value: 'NW'
//                             },
//                             {
//                                 value: 'NNW'
//                             }
//                         ],
//                         boundaryGap: false, //为true的话，标签和数据点都会在两个刻度之间的带(band)中间；为false的话，标签和数据点都会在刻度上，以刻度为中心。
//                         axisTick: {
//                             show: true //是否显示坐标轴刻度
//                         },
//                         show: true, //是否显示当前轴
//                         splitLine: { //坐标轴在'grid'区域中的分隔线
//                             show: true,
//                             lineStyle: {
//                                 // color: "black"
//                             },
//                         },
//                         axisLabel: { //坐标轴刻度上的标签名称的相关设置
//                             show: true,
//                             interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
//                         },
//                     },
//                     //极坐标系的径向轴。基本与类目轴一致，可参考'categoryAxis'。
//                     radiusAxis: {
//                         min: 0,
//                         max: 1,
//                         axisLabel: {
//                             formatter: '{value}',
//                             margin: -25,
//                             textStyle: {
//                                 fontSize: 10,
//                                 color: 'black',
//                                 padding: 5,
//                                 width: 30,
//                                 backgroundColor: '',
//                                 borderColor: '',
//                                 borderWidth: 1,
//                                 fontFamily: 'Microsoft YaHei'
//                             },
//                             rich: {} //富文本编辑，可以编辑当前的本文以及文本块的样式，例如文本块的阴影等。
//                         },
//                         zlevel: 3,
//                         axisTick: {
//                             show: false //是否显示坐标轴刻度
//                         },
//                         axisLine: {
//                             show: true, //是否显示坐标轴轴线
//                         },
//                     },
//                     polar: {}, //极坐标，必须要，不然就报错，不知道为哈，可能是声明这是个极坐标吧。
//                     series: [{
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             zlevel: 1,
//                             data: result.list1,
//                             coordinateSystem: 'polar',
//                             name: legendName[0],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                                 borderWidth: 0,
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list2,
//                             coordinateSystem: 'polar',
//                             name: legendName[1],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list3,
//                             coordinateSystem: 'polar',
//                             name: legendName[2],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list4,
//                             coordinateSystem: 'polar',
//                             name: legendName[3],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list5,
//                             coordinateSystem: 'polar',
//                             name: legendName[4],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list6,
//                             coordinateSystem: 'polar',
//                             name: legendName[5],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }, {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list7,
//                             coordinateSystem: 'polar',
//                             name: legendName[6],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         },
//                         {
//                             barCategoryGap: 0,
//                             type: 'bar',
//                             data: result.list8,
//                             coordinateSystem: 'polar',
//                             name: legendName[7],
//                             stack: 'a',
//                             itemStyle: {
//                                 borderColor: '#fff',
//                             }
//                         }
//                     ],
//                     legend: {
//                         show: true,
//                         data: legendName,
//                         width: 300, //根据宽度调整换行 
//                         top: 100,
//                         orient: 'vertical', //垂直显示
//                         x: 'left', //居左显示

//                     }
//                 });
//         },
//         error: function() {
//             alert("ajax调用失败");
//         }
//     });

// }
// var option3 = {
//     tooltip: {
//         trigger: 'item',
//         textStyle: {
//             fontSize: 16,
//             color: '#fff',
//             fontFamily: 'Microsoft YaHei'
//         }
//     },
//     color: ["#0001F7", "#00B8FE", "#00FFFF", "#00FF68", "#BEFE00", "#FFFF00", "#FFA800", "#E10100"],
//     angleAxis: {
//         zlevel: 2,
//         type: 'category',
//         data: [
//             { value: 'N' },
//             { value: 'NNE' },
//             { value: 'NE' },
//             { value: 'ENE' },
//             { value: 'E' },
//             { value: 'ESE' },
//             { value: 'SE' },
//             { value: 'SSE' },
//             { value: 'S' },
//             { value: 'SSW' },
//             { value: 'SW' },
//             { value: 'WSW' },
//             { value: 'W' },
//             { value: 'WNW' },
//             { value: 'NW' },
//             { value: 'NNW' }
//         ],
//         boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
//         axisTick: {
//             show: true //是否显示坐标轴刻度
//         },
//         show: true,
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 // color: "black"
//             },
//         },
//         axisLabel: {
//             show: true,
//             interval: 0, //坐标轴刻度标签的显示间隔，在类目轴中有效
//         },
//     },
//     radiusAxis: {
//         min: 0,
//         max: 2.5,
//         axisLabel: {
//             formatter: '{value}',
//             margin: -25,
//             textStyle: {
//                 fontSize: 10,
//                 color: 'black',
//                 padding: 5,
//                 width: 30,
//                 backgroundColor: '',
//                 borderColor: '',
//                 borderWidth: 1,
//                 fontFamily: 'Microsoft YaHei'
//             },
//             rich: {}
//         },
//         zlevel: 3,
//         axisTick: {
//             show: false //是否显示坐标轴刻度
//         },
//         axisLine: {
//             show: true, //是否显示坐标轴轴线
//         },
//     },
//     polar: {},
//     series: [{
//             barCategoryGap: 0,
//             type: 'bar',
//             zlevel: 1,
//             data: result.list1,
//             coordinateSystem: 'polar',
//             name: legendName[0],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//                 borderWidth: 0,
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list2,
//             coordinateSystem: 'polar',
//             name: legendName[1],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list3,
//             coordinateSystem: 'polar',
//             name: legendName[2],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list4,
//             coordinateSystem: 'polar',
//             name: legendName[3],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list5,
//             coordinateSystem: 'polar',
//             name: legendName[4],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list6,
//             coordinateSystem: 'polar',
//             name: legendName[5],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }, {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list7,
//             coordinateSystem: 'polar',
//             name: legendName[6],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         },
//         {
//             barCategoryGap: 0,
//             type: 'bar',
//             data: result.list8,
//             coordinateSystem: 'polar',
//             name: legendName[7],
//             stack: 'a',
//             itemStyle: {
//                 borderColor: '',
//             }
//         }
//     ],
//     legend: {
//         show: true,
//         data: legendName,
//         width: 500, //根据宽度调整换行 
//     }
// }
// echarts.init(document.getElementById('windRosemain')).setOption(option3);

// 下载div包含的内容
// tab是指定要下载的div的id
$(function() {
    function printPhoto(tab) {
        html2canvas(document.querySelector("#" + tab)).then(canvas => {

            // 图片导出为 png 格式
            var type = 'png';
            var imgData = canvas.toDataURL(type);
            var _fixType = function(type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                var r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            };

            // 加工image data，替换mime type
            imgData = imgData.replace(_fixType(type), 'image/octet-stream');

            //console.log(imgData);

            var saveFile = function(data, filename) {
                var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;

                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            };

            // 下载后的文件名
            var filename = '逐月温度' + '.' + type;
            // download
            saveFile(imgData, filename);

        });
    }
    var divid = document.querySelector('#downloadzone').id;
    var downclick = document.querySelector('#download');
    // console.log('我在这');
    downclick.addEventListener('click', function() {
        printPhoto(divid);
    })
    console.log(divid);
    // console.log('结束');
})
}

