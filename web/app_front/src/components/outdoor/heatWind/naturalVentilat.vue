<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">自然通风设计室外计算参数</p>
              <div v-if="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
            </div>
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" v-if="option">
           <table  id="wind" class="table-class" >                  
                    <tr style="" class="alt">
                      <td style="width:50%">自然通风适用期	</td>
                      <td  style="width:50%">{{tableData.zvp}}</td>
                   
                    <tr>
                      <td >自然通风天数</td>
                      <td>{{tableData.zvd}}</td>
                    </tr>
                    
                    <tr class="alt">
                      <td  style="vertical-align: middle;">自然通风设计室外计算风速vc(m/s)</td>
                        <td>{{tableData.zvows}}</td>
                    </tr>
                    <tr >
                      <td >自然通风设计室外计算相对湿度"φ" ̅c(%)</td>
                        <td>{{tableData.zvorh}}</td>
                    </tr>
                     <tr  class="alt">
                      <td >自然通风设计室外计算温度tc(°C)</td>
                       <td>{{tableData.zvot}}</td>
                    </tr>
                     <tr>
                      <td >风向</td>
                       <td>{{tableData.windDirect}}</td>
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
          tableTitle: {},
          tableData: [],
          option:false,
          stationId:'54511'
         
        }
    },
    props:{
       form:{

       }
   },
   watch:{
        form(newval, val) {
           
      this.stationId = newval.stationid
      this.getTable()
      
    }
   },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
      this.getTable()
    },
methods: {
   getTable(){
      var that = this;
      //获取不同气候区室内温度设计表格数据
      var url4 = "/building/outdoorparm/getocpnvdById?id="+this.stationId;
      this.axios.get(url4).then(function(res){
          that.tableData=res.data.ocpnvdinfo
       //通过给option赋值决定获取数据后再渲染表格
         if(that.tableData==null)
       that.option = false
       else that.option = true
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
     height:480px;
     width:100%;
     margin-bottom:50px;
      margin-top:15px;
     background-color: white;
    box-shadow: 1px 1px 1px #ccc;
   overflow-y:scroll;
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
line-height: 30px;
text-align:center;
margin-top:10px;
}


</style>