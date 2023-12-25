<template>
<div>
  <div class="container-1">
     <div slot="header" class="clearfix"  style="padding-top:5px">
        <span><font  color="#3ac5f0" size="4px">空气湿度图</font></span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="hide()" v-text="btnText">折叠</el-button>
     </div>
      <el-divider></el-divider>
           <div v-show="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
      </div>
      <div v-show="option">
        <diV style="margin-top:15px" id="airTem" v-show="isShow">
          <div id="charts" style="width:'100%',height:'350px'">
              <div style="padding-top:10px"></div>
              <div  id="main" :style="{width:'100%',height:'350px'}"></div>
          </div>
        </div> 
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
              prop="average"
              label="平均值"
              sortable
              width="90"
              >
              </el-table-column>
              <el-table-column
              prop="max"
              label="最大值"
              sortable
              width="90"
              >
              </el-table-column>
              <el-table-column
              prop="min"
              label="最小值"
              sortable
              width="90"
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
    average:[],
    max:[],
    data:{},
   btnText:'折叠',
   isShow:true,
   stationId:'54511',
   option:true
    }
   
  },
    props:{
       form:{

       }
   },
    watch: {
    form(newval, val) {
      console.log("传输来的新数据",newval)
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
    var url = "/building/basicclimate/getbbchumidity?id="+this.stationId;
    this.axios.get(url).then(function(res){
      console.log("图数据",res.data)
      that.result = res.data
       if(res.data.dayAvgMonthAvgList.length==0)
       {
         that.option = false
        that.tableData = []
        that.result.dayAvgMonthAvgList = []
        that.result.dayMaxMonthAvgList = []
        that.result.dayMinMonthAvgList = []
       
        that.max  = []
       }
       else {
         that.option = true

      var max =[0];
      var tableData = [];
        for (var i=0;i<12;i++){
    
        var j ={}
        j.month = i+1;
        j.average = that.result.dayAvgMonthAvgList[i].toFixed(2);
        j.max = that.result.dayMaxMonthAvgList[i].toFixed(2)
        j.min = that.result.dayMinMonthAvgList[i].toFixed(2)
        tableData.push(j)
    
        max[i] =(that.result.dayMaxMonthAvgList[i]-that.result.dayMinMonthAvgList[i]).toFixed(2)
        }
   
    that.max =max;
   
    that.tableData =tableData
       }
    var myChart = that.$echarts.init(document.getElementById('main'));
         myChart.setOption({ 
            title: {
              text: ''
          },
          tooltip: {
             trigger: 'axis',
             confine:true,
             textStyle:{
                 fontSize:'12px'
             },
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
              data:['累年日均值的月最小值','累年日均值的月均值','累年日均值的月最大值'],
          
          },
           
          grid: {
              left: '1%',
              right: '2%',
              bottom: '3%',
              top:'20%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }, 
              top:'6%'
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
              type: 'value',
            scale: true,
            max: 120,
            min: 0,
             axisLabel: {
            formatter:'{value} %'
            }
     
          },
        series: [
              {
                  name:'累年日均值的月最小值',
                  type:'bar',
                  barWidth: '10%',
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
                  symbol: 'circle',
                  
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
                  data:that.result.dayAvgMonthAvgList
              },
              {
                  name:'累年日均值的月最大值',
                  type:'bar',
                  barWidth: '10%',
                  stack: '总量',
                  data:that.max
              }
          ]
    } )
    myChart.on('legendselectchanged', function(params) {
    var option = this.getOption();
    if(params.selected['累年日均值的月最小值']== false){
       option.series[2].data =  res.data.dayMaxMonthAvgList;
   }
   else{
       option.series[2].data  = that.max
   }
    
    this.setOption(option)
    
    });

      }).catch((error)=>{
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
  },

  },

}

</script>