<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p  id="typename">多不保证率及多参数组合的室外计算参数</p>
            <!-- 显示所选城镇的海拔经纬度等信息 -->  
             <div v-if="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
            </div>
         <!-- 不同气候区室内温度设计 -->
             <div style="padding:10px 15px 25px 15px" v-if="option"> 
              
                <table  id="wind" class="table-class" >                  
                    <tr class="alt">
                      <td style="width:50%;vertical-align: middle;line-height: 20px;" colspan="4">城市名称</td>
                      <td colspan="2" style="width:50%;vertical-align: middle;line-height: 20px;">{{form.city}}</td>
                    </tr>
                    <tr >
                      <td style="width:50%;vertical-align: middle;line-height: 20px;" colspan="4">所属省份</td>
                      <td colspan="2" style="width:50%;vertical-align: middle;line-height: 20px;">{{form.province}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:20%;vertical-align: middle;line-height: 20px;" colspan="2">设计参数</td>
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">统计方法</td>
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">单位</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.stationId}}</td>
                    </tr>
                    <tr>
                      <td rowspan="12" style="width:10%;vertical-align: middle;line-height: 20px;"><div >以温度为主导</div></td>
                      <td  rowspan="3" style="width:10%;vertical-align: middle;line-height: 20px;">冬季空调计算温度</td>
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2"> 累年平均每年不保证6小时</td>
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinAirCt6Hours}}</td>
                    </tr>
                    <tr class="alt">
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">累年平均每年不保证24小时</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinAirCt24Hours}}</td>
                    </tr>
                    <tr>
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">累年平均每年不保证48小时</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinAirCt48Hours}}</td>
                    </tr>

                    <tr class="alt">
                      <td rowspan="3" style="width:10%;vertical-align: middle;line-height: 20px;">冬季供暖计算温度</td>
                    <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">累年平均每年不保证1天</td>
                    <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinHeatingCt1Days}}</td>
                    </tr>
                     <tr >
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">累年平均每年不保证5天</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinHeatingCt5Days}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" colspan="2">累年平均每年不保证10天</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperWinHeatingCt10Days}}</td>
                    </tr>
                     <tr >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="6">夏季空调计算温度（及其对应平均湿球温度）</td>
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" rowspan="2">累年平均每年不保证10小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt10HoursDry}}</td>
                    </tr>

                    <tr  class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">湿球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt10HoursWet}}</td>
                    </tr>
                    <tr >
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" rowspan="2">累年平均每年不保证50小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt50HoursDry}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">湿球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt50HoursWet}}</td>
                    </tr>
                    <tr>
                      <td style="width:30%;vertical-align: middle;line-height: 20px;" rowspan="2">累年平均每年不保证100小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt100HoursDry}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">湿球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.temperSumAirCt100HoursWet}}</td>
                    </tr>
                    <tr>
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="18">以含湿量为主导</td>
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="9">夏季除湿计算绝对湿度（及其对应平均干球温度和相对湿度）</td>
                       <td style="width:30%;vertical-align: middle;line-height: 20px;" rowspan="3">累年平均每年不保证10小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah10HoursMoi}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah10HoursDry}}</td>
                    </tr>
                     <tr >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="width:40%;vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah10HoursRela}}</td>
                    </tr>
                    <tr class="alt">
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="3">累年平均每年不保证50小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah50HoursMoi}}</td>
                    </tr>
                     <tr style="" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah50HoursDry}}</td>
                    </tr>
                     <tr class="alt" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah50HoursRela}}</td>
                    </tr>
                    <tr >
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="3">累年平均每年不保证100小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah100HoursMoi}}</td>
                    </tr>
                     <tr class="alt" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureSumDehumCah100HoursDry}}</td>
                    </tr>
                     <tr style="" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;" >{{tableWind.moistureSumDehumCah100HoursRela}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="9">冬季加湿计算绝对湿度（及其对应平均干球温度和相对湿度）</td>
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="3">累年平均每年不保证10小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah10HoursMoi}}</td>
                    </tr>
                     <tr style="" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah10HoursDry}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah10HoursRela}}</td>
                    </tr>
                    <tr >
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="3">累年平均每年不保证50小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah50HoursMoi}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah50HoursDry}}</td>
                    </tr>
                     <tr style="" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah50HoursRela}}</td>
                      
                    </tr>
                    <tr class="alt">
                       <td style="width:30%vertical-align: middle;line-height: 20px;"  rowspan="3">累年平均每年不保证100小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">含湿量</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">g/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah100HoursMoi}}</td>
                    </tr>
                     <tr style="" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah100HoursDry}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">相对湿度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.moistureWinHumCah100HoursRela}}</td>
                    </tr>

                     <tr >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="12">以焓值为主导</td>
                      <td style="width:10%;vertical-align: middle;line-height: 20px;" rowspan="6">夏季新风计算焓值（及其对应平均干球温度）</td>
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="2">累年平均每年不保证10小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">焓值</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">kJ/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe10HoursEnt}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe10HoursDry}}</td>
                    </tr>
                    <tr >
                       <td style="width:30%;vertical-align: middle;line-height: 20px;"  rowspan="2">累年平均每年不保证50小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">焓值</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">kJ/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe50HoursEnt}}</td>
                    </tr>
                     <tr class="alt">
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe50HoursDry}}</td>
                    </tr>
                      <tr>
                       <td style="width:30%;vertical-align: middle;line-height: 20px;" rowspan="2">累年平均每年不保证50小时</td>
                       <td style="width:10%;vertical-align: middle;line-height: 20px;">焓值</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">kJ/kg</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe100HoursEnt}}</td>
                    </tr>
                     <tr class="alt" >
                      <td style="width:10%;vertical-align: middle;line-height: 20px;">干球温度</td>
                     <td style="width:10%;vertical-align: middle;line-height: 20px;">℃</td>
                      <td style="vertical-align: middle;line-height: 20px;">{{tableWind.enthalpySumFreshCe100HoursDry}}</td>
                    </tr>
                </table>
            </div>
          </div>
  </div>  
</template>
<script>
export default {
      data(){
        return {
          tableWind: {},
          option:false,
          stationId:'54511',
        }
    },
   props:{
       form:{

       }
   },
    components:{
    },
   
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
      var that = this;
      this.getTableInfo();
      
    },
    watch: {
    form(newval, val) {
      this.stationId = newval.stationid
      this. getTableInfo(); 
    }
    },
methods: {

  getTableInfo(){  
        //民用建筑供暖通风与空气调节设计规范附表参数 
      var url = "/building/outdoorparm/getocpMulgrpcById?id=" + this.stationId;
      var that = this
      this.axios.get(url).then(function(res){
       that.tableWind = res.data.ocpMulgrpcInfo
      
       //通过给option赋值决定获取数据后再渲染表格
       if(that.tableWind==null) that.option=false
       else that.option=true
      that.stationId = res.data.ocpMulgrpcInfo.stationId
      }).catch((error)=>{
        console.log(error);
      })
  }
    }
    
}
 
</script>

<style scoped>
*{
    font-size: 0.4rem; 
 
}
 .container-2{
     height:100%;
     width:100%;
     margin-bottom:55px;
      margin-top:15px;
     background-color: white;
    box-shadow: 1px 1px 1px #ccc;
    overflow-y: scroll;
 }
 .table-class{
    width: 100%;
    position: relative;
    border: 1;
    font-size: 14px;
    border-collapse:collapse;
 }
table, td,th 
{
	 border:1px solid darkgray;
    height:40px;
    padding:3px 7px 2px 7px;
    text-align: center;
    font-size:15px;
    vertical-align: middle;
}
table tr.alt
{

	background-color:gainsboro;
  color:black;
  border-radius: 10px 10px 10px 10px;
}
 tr:hover{
    background-color: darkgray;
    margin-top: 2px;
} 
p{
color: #3ac5f0;
font-size: 18px;
font-weight: bold;
  line-height: 50px;
  text-align:center;
}
</style>