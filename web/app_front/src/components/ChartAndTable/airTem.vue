<template>
<div>
  <div class="container-1">
     <div slot="header" class="clearfix"  style="padding-top:5px">
        <span><font color="#3ac5f0" size="4px">空气温度图</font></span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="hide()" v-text="btnText">折叠</el-button>
     </div>
      <el-divider></el-divider>
      <div v-show="option">
               <el-empty description="暂无此站点数据"></el-empty>
      </div>
      <div v-show="option===false">
        <diV style="margin-top:15px" id="airTem" v-show="isShow">
            <div id="charts" style="width:'100%',height:'350px'">
                <div style="padding-top:5px"></div>
                <div  id="main" :style="{width:'100%',height:'400px'}"></div>
            </div>
        </diV>   
        <el-card style="margin-top:10px;padding:0px">
          <el-table
          :data="tableData"
          height="250"
            border
        
            stripe
            style="width: 100%">
        <el-table-column
        prop="month"
        label="月份"
        sortable
        fixed
        width="80">
        </el-table-column>
        <el-table-column
        prop="dayMax"
        label="日最大值"
        sortable
        width="110">
        </el-table-column>
        <el-table-column
        prop="dayMin"
        label="日最小值"
        sortable
        width="110"
        >
        </el-table-column>
        <el-table-column
        prop="aveDayMax"
        label="日最大值的月均值"
        sortable
        width="160"
        >
        </el-table-column>
        <el-table-column
        prop="aveDayAve"
        label="日均值的月均值"
        sortable
        width="150"
        >
        </el-table-column>
        <el-table-column
        prop="minDayAve"
        label="日均值的月最小值"
        sortable
        width="160"
        >
        </el-table-column>
          </el-table> 
        </el-card>
      </div>
  </div>
</div>
</template>

<style  scoped>


/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height:350px;
}
.container-1{
  width: 100%;
  height:auto;
}
.el-card__body{
  padding: 0;
}
</style>

<script>

import echarts from 'echarts'
export default {
  components: {
   echarts
  },
 
  data () {
    
    return {
    result:{},
    options:{},
    tableData:[],
    MinMon:[],
    MaxMon :[],
   btnText:'折叠',
   isShow:true,
   stationId:'54511',
   option:false
    }
   
  },
   props:{
       form:{

       }
   },
    watch: {
    form(newval, val) {
      console.log("chuanshuxinshuju ",newval)
      this.stationId = newval.stationid
    this.getChart()
    }
    },
  mounted(){
  this.getChart()
 
  },
  methods:{
    getChart(){
   var that = this
    var url = "/building/basicclimate/getttemById?id="+that.stationId;
    this.axios.get(url).then(function(res){
      console.log(that.stationId)
      that.result = res.data
      if(res.data.dayMaxMonthAvgList.length===0){
        that.option = true
        that.tableData = []
        that.result.dayMinList = []
        that.result.dayMaxMonthAvgList = []
        that.result.dayAvgMonthAvgList = []
        that.result.dayMinMonthAvgList = []
        that.result.dayMaxList = []
        that.MaxMon  = []

      } 
      else{
      that.option = false;
      var MaxMon =[0];
      var tableData = [];
        for (var i=0;i<12;i++){
        MaxMon[i] = (that.result.dayMaxMonthAvgList[i]-that.result.dayMinMonthAvgList[i]).toFixed(2)
        var j ={}
        j.month = i+1;
          j.dayMax = that.result.dayMaxList[i].toFixed(2);
          j.dayMin = that.result.dayMinList[i].toFixed(2)
          j.aveDayMax = that.result.dayMaxMonthAvgList[i].toFixed(2);
          j.aveDayAve = that.result.dayAvgMonthAvgList[i].toFixed(2)
          j.minDayAve = that.result.dayMinMonthAvgList[i].toFixed(2)
          tableData.push(j)
        }
      that.MaxMon =MaxMon
      that.tableData =tableData 
      }
      console.log(that.tableData)
        var myChart = that.$echarts.init(document.getElementById('main'));
        console.log("zhixing")
        myChart.setOption({
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                confine:true,
                formatter(params){
            
                var text =`${params[0].axisValue}<br/>`;
               for(var i=params.length-1;i>=0;i--){
                 if(params[i].seriesName == '累年日均值的月最大值'){
                   text+=`${params[i].marker} ${params[i].seriesName}: ${that.result.dayMaxMonthAvgList[params[i].dataIndex]}<br/>`
                 }
                 else
                 text+=`${params[i].marker} ${params[i].seriesName}: ${params[i].data}<br/>`
               }
                
              return text;
         
                 
             }
            },
            legend: {
                data:['累年日最大值','累年日最大值的月均值','累年日均值的月均值','累年日均值的月最小值','累年日最小值']
            },
            grid: {
                left: '1%',
                right: '4%',
                bottom: '3%',
                top:'20%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }, 
              top:'-2%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                
            },
            yAxis: {
                type: 'value',
                axisLabel: {
            formatter:'{value} ℃'
            }
                          
                
            },
            series: [
                {
                    name:'累年日最小值',
                    type:'line',
                    symbol:'rectangle',
                    
                    data:that.result.dayMinList,
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
                            color:'#ddd',
                            opacity:0.1
                        }
                    },
                    stack: '总量',
                    data:that.result.dayMinMonthAvgList
                },
                {
                    name:'累年日均值的月均值',
                    type:'line',
                    
                    data:that.result.dayAvgMonthAvgList
                },
                {
                    name:'累年日最大值的月均值',
                    type:'bar',
                     barWidth: '20%',
                    stack: '总量',
                    data:that.MaxMon
                },
                {
                    name:'累年日最大值',
                    type:'line',
                    symbol: 'diamond',
                    
                    data:that.result.dayMaxList,
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
        });
        myChart.on('legendselectchanged', function(params) {
        var option = that.getOption();
        if(params.selected['累年日均值的月最小值']== false){
          option.series[3].data =  res.data.dayMaxMonthAvgList;
        }
        else{
            option.series[3].data  = that.MaxMon
        }
        console.log("进入option里面了",option)
        that.setOption(option)
        });
      }
        ).catch((error)=>{
        console.log(error);
      })
    },
 
  hide(){
    this.isShow = !this.isShow
    if(this.isShow){
      this.btnText = "折叠"
    }
    else{
      this.btnText = "显示"
    }
  }
  }
 
}

</script>