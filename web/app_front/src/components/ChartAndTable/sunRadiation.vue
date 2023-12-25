<template>
<div>
  <div class="container-1">
     <div slot="header" class="clearfix"  style="padding-top:5px">
    <span><font  color="#3ac5f0" size="4px">太阳辐射图</font></span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="hide()" v-text="btnText">折叠</el-button>
     </div>
      <el-divider></el-divider>
      <div v-show="option===false">
               <el-empty description="暂无此站点数据"></el-empty>
      </div>
      <div v-show="option">
      <diV style="margin-top:15px" id="airTem" v-show="isShow">
        <div id="charts" style="width:'100%',height:'350px'">
          <div style="padding-top:5px"></div>
          <div  id="main" :style="{width:'100%',height:'350px'}"></div>
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
            prop="scatter"
            label="日散射"
            sortable
            width="90"
            >
            </el-table-column>
            <el-table-column
            prop="Direct"
            label="日直射"
            sortable
            width="90"
            >
            </el-table-column>
            <el-table-column
            prop="sum"
            label="总辐射"
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

<style scoped>
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
   btnText:'折叠',
   isShow:true,
   data:{},
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
    var url = "/building/basicclimate/getsolarradiation?id="+that.stationId;
    this.axios.get(url).then(function(res){
      that.result = res.data
       if(res.data.dayDirectList.length==0){
        that.option = false
         that.result.dayDirectList = []
        that.result.daySumList = []
        that.result.dayScatterList = []
        that.tableData  = []
       } 
      else{
        that.option = true;
       var tableData =[]
     for(var i=0;i<12;i++){
         var j ={}
         j.month  = i+1;
        j.Direct = that.result.dayDirectList[i].toFixed(2)
        j.sum = that.result.daySumList[i].toFixed(2)
        j.scatter  =that.result.dayScatterList[i].toFixed(2)
        tableData.push(j)
     }
     that.tableData = tableData
      }
        var myChart = that.$echarts.init(document.getElementById('main'));
         myChart.setOption({  title: {
     
              text: ''
          },
          tooltip: {
              trigger: 'axis',
              confine:true,
               formatter(params){
            
                var text =`${params[0].axisValue}<br/>`;
               for(var i=params.length-1;i>=0;i--){
                 text+=`${params[i].marker} ${params[i].seriesName}: ${params[i].data}<br/>`
               }
                
              return text;
         
                 
             }
          },
          legend: {
              data:['累年日散射辐射月均值','累年日直射辐射月均值','累年日总辐射月均值'],
             
          },
          grid: {
              left: '1%',
              right: '4%',
              bottom: '3%',
              top:'25%',
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
              name:'W/m2',
             
          },
          series: [
               {
                  name:'累年日散射辐射月均值',
                  type:'line',
                  symbol:'rectangle',
                  stack: '总量',
                  data:that.result.dayScatterList,
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
                 
                  itemStyle: {
                      normal: {
                          borderWidth: 5,
                          borderColor: 'rgb(39, 138, 204)',
                          color: 'rgb(39, 138, 204)'
                      }
                  },
                  data:that.result.dayDirectList
              },
              {
                  name:'累年日总辐射月均值',
                  type:'line',
                  symbol: 'diamond',
                 
                  data:that.result.daySumList,
                  itemStyle: {
                      normal: {
                          borderWidth: 5,
                          borderColor: '#ff2929',
                          color: '#ff2929'
                      }
                  }
              }
          ]
       
         })
      }).catch((error)=>{
        console.log(error);
      })
 
    },
      getoptions(){
      var that = this 
       
  
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