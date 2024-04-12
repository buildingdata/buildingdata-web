<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">空调房间隔热设计室内计算参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" >
         <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              border
              :show-header="false"
              :cell-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
            :row-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
              fixed
                prop="label"
                label=""
                width="180">
              </el-table-column>
              <el-table-column
                prop="param"
                label="">
              </el-table-column>
              <el-table-column
                prop="p19"
                label="">
              </el-table-column>
              <el-table-column
                prop="p20"
                label="">
              </el-table-column>
              <el-table-column
                prop="p21"
                label="">
              </el-table-column>
              <el-table-column
                prop="p22"
                label="">
              </el-table-column>
              <el-table-column
                prop="p23"
                label="">
              </el-table-column>
              <el-table-column
                prop="p24"
                label="">
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
          tableData: [
             {label:"室内空气温度/℃",
            param:"室内空气温度/℃",
            p18:"18",p19:"19",p20:"20",p21:"21",p22:"22",p23:"23",p24:"24"},
            {label:"内表面温度与室内空气温度的温差限值",
            param:"外墙△tw/℃",
            p18:"2.7",p19:"4.7",p20:"4.9",p21:"4.9",p22:"4.9",p23:"4.9",p24:"4.9"},
             {label:"内表面温度与室内空气温度的温差限值",
            param:"屋面△tr/℃",
            p18:"2.7",p19:"7.9",p20:"8.0",p21:"8.0",p22:"8.1",p23:"8.2",p24:"8.2"},
             {label:"内表面温度与室内空气温度的温差限值",
            param:"地面△tg/℃",
            p18:"2.7",p19:"4.0",p20:"4.0",p21:"4.0",p22:"4.0",p23:"4.0",p24:"4.0"},
             {label:"相对湿度",
            param:"相对湿度",
            p18:"60%",p19:"60%",p20:"60%",p21:"60%",p22:"60%",p23:"60%",p24:"60%"}
          ],
          option:false,
          
        }
    },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
     
    },
methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
     if(rowIndex===0 && columnIndex==0) return {rowspan:1,colspan:2}
     else if(rowIndex===0 && columnIndex===1) return [0,0] 
     else if((rowIndex===1 )&& columnIndex===0) return {rowspan:3,colspan:1}
     else if((rowIndex===2 || rowIndex===3) && columnIndex===0) return [0,0]
     else if(rowIndex===4 && columnIndex===0) return {rowspan:1,colspan:2}
     else if(rowIndex===4 && columnIndex===2) return {rowspan:1,colspan:7}
     else if(rowIndex===4 && columnIndex===1) return [0,0]
    else if(rowIndex===4 && columnIndex>1 && columnIndex<=9) return [0,0]
    else return [1,1]
    
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
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: rgb(143, 142, 142); 
}

</style>