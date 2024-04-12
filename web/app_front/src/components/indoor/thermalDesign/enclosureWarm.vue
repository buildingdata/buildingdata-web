<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">供暖房间保温设计室内计算参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" >
          <table class="table-class"  style="margin-bottom:20px;width: 100%;">
                          <tr>
                           <td colspan="3" style="text-align: center;">隔热设计——非空调房间</td>
                                    </tr>
                                    <tr>
                                        <td style="width:30%">
                                            室内空气温度/℃</td>
                                        <td colspan="2" >
                                            空气温度平均值应取室外空气温度平均值+1.5K、温度波幅应取室外空气温度波幅-1.5K，并将其逐时化</td>
                                    </tr>
                                    <tr>
                                        <td style="">
                                            相对湿度</td>
                                        <td colspan="2" >
                                            60%</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2" style=" vertical-align: middle">内表面最高温度/℃</td>
                                        <td colspan="1">外墙</td>
                                        <td colspan="1">≤te·max</td>
                                    </tr>
                                    <tr>
                                        <td colspan="1">屋面</td>
                                        <td colspan="1">≤te·max</td>
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
          tableData: [
           
          ],
        
        }
    },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     
    },
methods: {
   
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
    font-size: 17px;
    border-collapse:collapse;
 }
table, td,th 
{
	 border:1px solid darkgray;
    height:40px;
    padding:3px 7px 2px 7px;
    text-align: center;
    line-height: 35px;
    font-size:16px
}
table tr.alt
{
	font-size: 17px;;
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