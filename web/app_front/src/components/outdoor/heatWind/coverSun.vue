<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">围护结构动态保温设计室外计算参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
           <el-divider></el-divider>
           <div v-if="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
            </div>
         <div style="padding:10px 15px 25px 15px" v-if="option">
             <div style="padding-left:70px;font-size: 18px;">
             <h3>遮阳计算时间段：{{tableData.startDayList[0].sunshadePeriodStart}}-{{tableData.startDayList[0].sunshadePeriodEnd }}</h3>
             </div>
             <p>遮阳计算时段起始日设计计算参数</p>
            <el-table
                :data="tableData.startDayList"
                border
                height="400"
                  :cell-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
                 :row-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
                style="width: 100%">
                <el-table-column
                fixed
                 sortable
                prop="time"
                label="时刻"
                width="80">
                </el-table-column>
                <el-table-column
                prop="solarAltitudeAngle"
                label="太阳高度角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="solarAzimuthAngle"
                label="太阳方位角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="outdoorAirTep"
                label="室外空气温度te（°C）"
                width="140">
                </el-table-column>
                <el-table-column
                label="水平">
                    <el-table-column
                    prop="horiI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="horiId "
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="东向">
                    <el-table-column
                    prop="eastI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="eastId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="南向">
                    <el-table-column
                    prop="soutI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="soutId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="西向">
                    <el-table-column
                    prop="westI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="westId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="北向">
                    <el-table-column
                    prop="nortI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="nortId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
               
            </el-table>
            <p>遮阳计算时段内的设计计算参数</p>
               <el-table
                :data="tableData.middleDayList"
                border
                height="400"
                style="width: 100%">
                <el-table-column
                fixed
                 sortable
                prop="time"
                label="时刻"
                width="80">
                </el-table-column>
                <el-table-column
                prop="solarAltitudeAngle"
                label="太阳高度角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="solarAzimuthAngle"
                label="太阳方位角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="outdoorAirTep"
                label="室外空气温度te（°C）"
                width="140">
                </el-table-column>
                <el-table-column
                label="水平">
                    <el-table-column
                    prop="horiI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="horiId "
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="东向">
                    <el-table-column
                    prop="eastI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="eastId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="南向">
                    <el-table-column
                    prop="soutI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="soutId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="西向">
                    <el-table-column
                    prop="westI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="westId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="北向">
                    <el-table-column
                    prop="nortI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="nortId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
               
            </el-table>
             <p>遮阳计算时段终止日设计计算参数</p>
              <el-table
                :data="tableData.endDayList"
                border
                height="400"
                style="width: 100%">
                <el-table-column
                fixed
                 sortable
                prop="time"
                label="时刻"
                width="80">
                </el-table-column>
                <el-table-column
                prop="solarAltitudeAngle"
                label="太阳高度角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="solarAzimuthAngle"
                label="太阳方位角（°）"
                width="140">
                </el-table-column>
                <el-table-column
                prop="outdoorAirTep"
                label="室外空气温度te（°C）"
                width="140">
                </el-table-column>
                <el-table-column
                label="水平">
                    <el-table-column
                    prop="horiI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="horiId "
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="东向">
                    <el-table-column
                    prop="eastI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="eastId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="南向">
                    <el-table-column
                    prop="soutI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="soutId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="西向">
                    <el-table-column
                    prop="westI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="westId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
                </el-table-column>
                 <el-table-column
                label="北向">
                    <el-table-column
                    prop="nortI"
                    label="太阳总辐射（W/m²）"
                    width="120">
                    </el-table-column>
                     <el-table-column
                    prop="nortId"
                    label="散射辐射（W/m²）"
                    width="120">
                    </el-table-column>
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
         stationId:'54511'
        }
    },
    components:{
    },
      props:{
       form:{

       }
   },
   watch:{
        form(newval, val) {
            console.log("huaahuh",newval)
      this.stationId = newval.stationid
      this.getTable()
      
    }
   },
    
    created (){
    this.getTable()
    },
    methods: {
    getTable(){
    var that = this;
    var url4 = "/building/outdoorparm/getasdoById?id=" + that.stationId ;
    this.axios.get(url4).then(function(res){
       that.tableData  = res.data
       console.log(res.data)
       //通过给option赋值决定获取数据后再渲染表格
       if(res.data.endDayList.length==0)
       that.option = false
       else  that.option = true
      }).catch((error)=>{
        console.log(error);
      })
    }
    }
}
 
</script>

<style >
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
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: rgb(173, 173, 173); 
  font-size: 15px;
}
 .el-table thead.is-group th{
   background: rgb(224, 224, 224);
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