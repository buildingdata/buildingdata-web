<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">非供暖房间保温设计室内计算参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" >
          <table class="table-class" style="margin-bottom:20px;width: 100%;">
                                    <tr>
                                        <td colspan="7" style="text-align: center;">保温设计——非供暖房间</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 10%;text-align: center; vertical-align: middle">
                                            典型城市</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle">
                                            上海</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle">
                                            昆明</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle ">
                                            广州</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 10%;text-align: center; vertical-align: middle">
                                            气候分区</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle">
                                            夏热冬冷地区</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle">
                                            温和A区</td>
                                        <td colspan="2" style="width: 10%;text-align: center; vertical-align: middle ">
                                            夏热冬暖地区</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 10%;text-align: center; vertical-align: middle">
                                            部位</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle">
                                            室内温度</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle">
                                            温差</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle ">
                                            室内温度</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle ">
                                            温差</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle ">
                                            室内温度</td>
                                        <td style="width: 10%;text-align: center; vertical-align: middle ">
                                            温差</td>
                                    </tr>

                                    <tr>
                                        <td>外墙</td>
                                        <td rowspan="3" style=" vertical-align: middle">15</td>
                                        <td>3</td>
                                        <td rowspan="3" style=" vertical-align: middle">15</td>
                                        <td>2.5</td>
                                        <td rowspan="3" style=" vertical-align: middle">16</td>
                                        <td>2.5</td>
                                    </tr>
                                    <tr>
                                        <td>地面</td>
                                        <td>2</td>
                                        <td>1.5</td>
                                        <td>1.5</td>
                                    </tr>
                                    <tr>
                                        <td>屋面</td>
                                        <td>4</td>
                                        <td>3.5</td>
                                        <td>3.5</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;" colspan="7">注：严寒地区和寒冷地区建议供暖</td>
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
         
        }
    },
    components:{
    },
     
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
    font-size:16px;
    vertical-align: middle
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