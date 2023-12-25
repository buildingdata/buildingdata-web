<template>
<div>
  <div class="container-1">
     <div slot="header" class="clearfix"  style="padding-top:5px">
      <span><font  color="#3ac5f0" size="4px">风速图</font></span>
      <el-button  class="el-card__body" style="float: right; padding: 3px 0" type="text" @click="hide()" v-text="btnText">折叠</el-button>
    </div>
    <el-divider></el-divider>
    <div v-show="option==false">
          <el-empty description="暂无此站点数据"></el-empty>
    </div>
    <div v-show="option">
      <diV style="margin-top:15px;" id="airTem" v-show="isShow">
          <div id="charts" style="width:'100%',height:'350px'">
            <div style="padding-top:5px"></div>
            <div  id="main" :style="{width:'100%',height:'410px'}"></div>
          </div>
      </diV>   
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
  height:400px;
  overflow-y: scroll;
}
.container-1{
  width: 97%;
  height: auto;

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
    legendName:'',
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
      console.log("数据发生变化",newval)
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
    var result ;
    var url = "/building/basicclimate/getwdrwsp?id="+that.stationId;
    this.axios.get(url).then(function(res){
        result = res.data
      if(res.data.list1.length==0){ 
        that.option = false
        that.result.list1 = []
        that.result.list2 = []
        that.result.list3 = []
        that.result.list4 = []
        that.result.list5 = []
        that.result.list6 = []
        that.result.list7 = []
        that.result.list8 = []
        that.tableData  = []
        }
      else{
        that.option = true;
        console.log("获得得新数据",res.data)
       for(var i=0;i<result.list1.length;i++){
          result.list1[i]=(parseFloat(result.list1[i])/100).toFixed(2);
        }  
        max=0;
        for(var i=0;i<result.list2.length;i++){
            result.list2[i]=(parseFloat(result.list2[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list3.length;i++){
            result.list3[i]=(parseFloat(result.list3[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list4.length;i++){
            result.list4[i]=(parseFloat(result.list4[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list5.length;i++){
          result.list5[i]=(parseFloat(result.list5[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list6.length;i++){
            result.list6[i]=(parseFloat(result.list6[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list7.length;i++){
            result.list7[i]=(parseFloat(result.list7[i])/100).toFixed(2);
        }
        for(var i=0;i<result.list8.length;i++){
            result.list8[i]=(parseFloat(result.list8[i])/100).toFixed(2);
        }
        var maxsum=0;
        var max;
        for(var i=0;i<16;i++){
          max=0;
          max=result.list1[i]+result.list2[i]+result.list3[i]+result.list4[i]+result.list5[i]+result.list6[i]+result.list7[i]+result.list8[i];  
          if(max>maxsum){
            maxsum=max;
          }
        }
      
      that.result =result
     } 
that.legendName=["≤0.2m/s","＞0.2且≤1.5m/s","＞1.5且≤3.5m/s","＞3.5且≤5.5m/s",
          "＞5.5且≤10.5m/s","＞10.5且≤15.5m/s","＞15.5且≤25.5m/s","≥25.5m/s"]
var myChart = that.$echarts.init(document.getElementById('main'));
         myChart.setOption({ 
            tooltip: {
               trigger: 'item',
               confine:true,
               textStyle: {
                   fontSize: 15,
                   color: '#fff',
                   fontFamily: 'Microsoft YaHei'
               }
           },
          toolbox: {
              feature: {
                  saveAsImage: {}
              },
              top:'10%'
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
              show: true//是否显示坐标轴刻度
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
           
            axisLabel: {
              formatter: '{value}',
              margin:-25,
              textStyle: {
                fontSize: 10,
                color: 'black',
                padding:25,
                width:30,
                backgroundColor:'',
                borderColor:'',
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
             
              center: ['50%', 250]
          },
          series: [{
            barCategoryGap:0,
            type: 'bar',
            zlevel:1,
            data: that.result.list1,
            coordinateSystem: 'polar',
            name: that.legendName[0],
            stack: 'a',
            itemStyle: {
              borderColor:'',
              borderWidth:0,
            }
          }, {
            barCategoryGap:0,
            type: 'bar',
            data: that.result.list2,
            coordinateSystem: 'polar',
            name: that.legendName[1],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }, {
            barCategoryGap:0,
            type: 'bar',
            data: that.result.list3,
            coordinateSystem: 'polar',
            name: that.legendName[2],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }, {
            barCategoryGap:0,
            type: 'bar',
            data:that.result.list4,
            coordinateSystem: 'polar',
            name: that.legendName[3],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }, {
            barCategoryGap:0,
            type: 'bar',
            data:that.result.list5,
            coordinateSystem: 'polar',
            name: that.legendName[4],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }, {
            barCategoryGap:0,
            type: 'bar',
            data:that.result.list6,
            coordinateSystem: 'polar',
            name: that.legendName[5],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          },{
            barCategoryGap:0,
            type: 'bar',
            data:that.result.list7,
            coordinateSystem: 'polar',
            name: that.legendName[6],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }, 
          {
            barCategoryGap:0,
            type: 'bar',
            data: that.result.list8,
            coordinateSystem: 'polar',
            name: that.legendName[7],
            stack: 'a',
            itemStyle: {
              borderColor:'',
            }
          }],
          legend: {
            show: true,
            data: that.legendName,
            width:350,//根据宽度调整换行 
            
          }
       
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