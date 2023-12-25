<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">围护结构热湿耦合计算室外计算参数</p>
              <div v-if="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
            </div>
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 15px 15px" v-if="option">
            <div class="grid-content ">
            
              <div class="station-content"  style="display:inline-block;padding-left:0.6rem">月份:
                  <select id="month"  v-model="monthSelect" class="handle-select ">
                        <option v-for="item in month" v-bind:value='item'  v-text="item" :key="item" style="font-size:12px"></option> 
                  </select>
              </div> 
              <div class="station-content"  style="display:inline-block;padding-left:0.4rem;padding-top:0.6rem">日期:
                  <select id="day"  v-model="daySelect"  class="handle-select ">
                            <option v-for="item in day" v-bind:value='item'  v-text="item" :key="item" style="font-size:12px"></option> 
                </select>
              </div>      
            </div>
               <el-table
                  :data="tableData"
                  height="400"
                  border
                    :cell-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
                 :row-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
                  style="width: 100%">
                  <el-table-column
                    prop="month"
                    label="月份"
                    fixed
                    width="80"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="day"
                    label="日期"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="时刻"
                    width="80">
                  </el-table-column>
                    <el-table-column
                    prop="pre"
                    label="气压"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="rhm"
                    label="相对湿度	">
                  </el-table-column>

                   <el-table-column
                    prop="wDir"
                    label="风向"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="wSpd"
                    label="风速">
                  </el-table-column>
                    <el-table-column
                    prop="dbt"
                    label="干球温度"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="dpt"
                    label="露点温度	">
                  </el-table-column>

                   <el-table-column
                    prop="gsr"
                    label="水平面太阳总辐射（W/㎡）"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="dif"
                    label="水平面散射（W/㎡）">
                  </el-table-column>
                    <el-table-column
                    prop="dir"
                    label="法向直射（W/㎡）"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="cc"
                    label="云量	">
                   
                  </el-table-column>
                  <el-table-column
                    prop="pct"
                    label="降水量	">
                   
                  </el-table-column>
                 
                  
                </el-table>
         </div>
    </div>
</div>  
</template>
<script>
export default {
      data(){
        return {
          tableTitle: {},
          tableData: [],
          option:false,
          stationId:'57131',
          typeSelect:"RCP45-2050",
          monthSelect:'1月',
          daySelect:'1日',
          month:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
          day:[],
           currentPage4: 4
         
        }
    },
    props:{
       form:{

       }
   },
   watch:{
        form(newval, val) {
      this.stationId = newval.stationid
      this.typeSelect = newval.param
     
      this.getTable()
      this.intiTableMonthAndDay()
      
    },
    monthSelect(newval,val){
      this.intiTableMonthAndDay()
      this.getTable()
    },
    daySelect(newval,val){
      this.getTable()
    }
   },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
      this.getTable()
      this.intiTableMonthAndDay()
    },
methods: {
   getTable(){
     var url = "/building/outdoorparm/getocpehhccById?id=" + this.stationId + "&pagenum=" + 50;
      var that = this
      this.axios.get(url).then(function(res){
      
       var month = that.monthSelect.slice(0,that.monthSelect.length-1)
       var data = res.data.totalList.filter(function (e) { return e.month == month });
        data = data.filter(function (e) { return e.day == that.daySelect.slice(0,that.daySelect.length-1) })
        that.tableData = data
       //通过给option赋值决定获取数据后再渲染表格
       if(that.tableData.length==0) that.option=false
       else that.option=true
     
      }).catch((error)=>{
        console.log(error);
      })
  },
  intiTableMonthAndDay(){
    var month = this.monthSelect
    console.log(month)
    if(month==="1月" || month==="3月" || month==="5月" || month==="7月" || month==="8月" || month==="10月" || month==="12月"){
       this.day  =[]
       console.log(month)
      for(let i = 1;i<=31;i++){
        this.day.push(i+"日")
      }
    }else if(month==="4月" || month==="6月" || month==="9月" ||month==="11月"){
       this.day  =[]
      for(let i = 1;i<=30;i++){
       this.day.push(i+"日")
      }
    }else{
      this.day  =[]
      for(let i = 1;i<=28;i++){
       this.day.push(i+"日")
      }
    }

  }
  
    }
}
 
</script>

<style scoped>
*{
    font-size: 0.4rem; 
 
}

 .container-2{
     height:480px;
     width:100%;
     margin-bottom:50px;
      margin-top:15px;
     background-color: white;
    box-shadow: 1px 1px 1px #ccc;
   overflow-y:scroll;
 }
 .handle-select {
     width: 2.5rem;
     outline: none;
     cursor: pointer;     
     border:1px solid darkgray;
     overflow-y: scroll;
     height: 0.6rem;
    background-color: white;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 10px;
    /* margin-top: 10px; */
  }
  .station-content{
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
  }

p{
color: #3ac5f0;
font-size: 18px;
font-weight: bold;
line-height: 30px;
text-align:center;
margin-top:10px;
}


</style>