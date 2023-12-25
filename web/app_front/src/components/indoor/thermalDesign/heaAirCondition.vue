<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">自然通风设计室内计算参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" >
          <div style="text-align:center;font-size:15px"> 自然通风设计——典型城市全年逐月自然通风热可接受温度区间</div>
            <el-table
            :data="leftTable"
            :span-method="objectSpanMethod"
            :cell-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
            :row-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
            :header-cell-style="{color: 'black',textAlign:'center'}"
             height="400"
             border
            style="width: 100">
            <el-table-column
            prop="city"
            fixed
            label="城市">
            </el-table-column>
            <el-table-column
            prop="month"
            label="月份"
             width="130">
            </el-table-column>
             <el-table-column
                prop="m1"
                label="1">
                </el-table-column>
                <el-table-column
                prop="m2"
                label="2">
                </el-table-column>
                <el-table-column
                prop="m3"
                label="3">
                </el-table-column>
                <el-table-column
                prop="m4"
                label="4">
                </el-table-column>
                <el-table-column
                prop="m5"
                label="5">
                </el-table-column>
                <el-table-column
                prop="m6"
                label="6">
                </el-table-column>
                <el-table-column
                prop="m7"
                label="7">
                </el-table-column>
                <el-table-column
                prop="m8"
                label="8">
                </el-table-column>
                   <el-table-column
                prop="m9"
                label="9">
                </el-table-column>
                <el-table-column
                prop="m10"
                label="10">
                </el-table-column>
                <el-table-column
                prop="m11"
                label="11">
                </el-table-column>
                <el-table-column
                prop="m12"
                label="12">
                </el-table-column>
          </el-table>
          <div style="text-align:center;font-size:15px">注：当室外平均气温低于5℃时，视为建筑需要供暖，不给出热可接受温度范围，故表格中为空缺项</div>
         
                
         </div>
    </div>
</div>  
</template>
<script>
export default {
      data(){
        return {
          tableTitle: {},
          tableData: {},
          option:false,
          leftTable:[{city:"哈尔滨",month:"室外月平均温度",m1:" ",m2:" ",m3:" ",m4:"7.7",m5:"14.2",m6:"20",m7:"22.9",m8:"21",m9:"14.7",m10:"5.2",m11:" ",m12:" "},
          {city:"哈尔滨",month:"舒适上限",m1:" ",m2:" ",m3:" ",m4:"24.8",m5:"26.3",m6:"27.6",m7:"28.3",m8:"27.9",m9:"26.4",m10:"24.2",m11:" ",m12:" "},
          {city:"哈尔滨",month:"舒适下限",m1:" ",m2:" ",m3:" ",m4:"13.6",m5:"15.0",m6:"16.2",m7:"16.8",m8:"16.4",m9:"15.1",m10:"13.1",m11:" ",m12:" "},
          {city:"上海",month:"室外月平均温度",m1:"4.5",m2:"6.3",m3:"9.9",m4:"15.3",m5:"20.6",m6:"24.3",m7:"27.5",m8:"27",m9:"24.4",m10:"18.9",m11:"13.6",m12:"7.4"},
          {city:"上海",month:"舒适上限",m1:" 24.1",m2:"24.5 ",m3:"25.3 ",m4:"26.6",m5:"27.8",m6:"28.6",m7:"29.4",m8:"29.3",m9:"28.7",m10:"27.4",m11:"26.22 ",m12:"24.7 "},
          {city:"上海",month:"舒适下限",m1:"12.9",m2:" 13.3",m3:"14.1	 ",m4:" 15.2",m5:"16.3 ",m6:" ",m7:" 17.1",m8:"17.8 ",m9:"17.7 ",m10:"16.0 ",m11:"14.8 ",m12:"13.5 "},
          {city:"北京",month:"室外月平均温度",m1:" ",m2:" ",m3:"7.7 ",m4:"14.4 ",m5:"19.4 ",m6:"24.5 ",m7:"26.4 ",m8:"25.6 ",m9:" 20.4",m10:" 13",m11:" 5.4",m12:" "},
          {city:"北京",month:"舒适上限",m1:" ",m2:" ",m3:" 24.8",m4:" 26.3",m5:" 27.5",m6:"28.7 ",m7:"29.1 ",m8:" 28.9",m9:" 27.7",m10:" 26.0",m11:"24.3 ",m12:" "},
          {city:"北京",month:"舒适下限",m1:" ",m2:" ",m3:"13.6 ",m4:"15.0 ",m5:"16.1 ",m6:"17.1 ",m7:"17.5 ",m8:"17.4 ",m9:" 16.3",m10:" 14.7",m11:" 13.1",m12:" "},
          {city:"广州",month:"室外月平均温度",m1:"13.9 ",m2:"14.2 ",m3:"18.3 ",m4:"22.4 ",m5:"26.1 ",m6:"27.2 ",m7:"28.8 ",m8:"28 ",m9:"27.4 ",m10:"24.4 ",m11:"20.2 ",m12:"15.5 "},
          {city:"广州",month:"舒适上限",m1:" 26.2",m2:"26.3 ",m3:"27.2 ",m4:" 28.2",m5:" 29.1",m6:"29.3 ",m7:"29.7 ",m8:" 29.5",m9:"29.4 ",m10:"28.7 ",m11:" 27.7",m12:"16.2 "},
          {city:"广州",month:"舒适下限",m1:" 14.9",m2:"15.0 ",m3:" 15.8",m4:" 16.7",m5:"17.5 ",m6:"17.7 ",m7:" 18.1",m8:"17.9 ",m9:" 17.8",m10:"17.1 ",m11:" 16.2",m12:"15.2 "},
          {city:"西安",month:"室外月平均温度",m1:" ",m2:" ",m3:" 8.1",m4:" 15.3",m5:"20.9 ",m6:"24.7 ",m7:"26.7 ",m8:"26.6 ",m9:"20.3 ",m10:" 14.7",m11:"8.2 ",m12:" "},
          {city:"西安",month:"舒适上限",m1:" ",m2:" ",m3:"24.9 ",m4:"26.6 ",m5:" 27.9",m6:"28.7 ",m7:"29.2 ",m8:"29.2 ",m9:"27.7 ",m10:" 26.4",m11:"24.9",m12:" "},
          {city:"西安",month:"舒适下限",m1:" ",m2:" ",m3:"13.7 ",m4:"15.2 ",m5:"16.4 ",m6:"17.2 ",m7:" 17.6",m8:"17.6 ",m9:" 16.3",m10:" 15.1",m11:"13.7 ",m12:" "},
          {city:"大连",month:"室外月平均温度",m1:" ",m2:" ",m3:" ",m4:"10.9 ",m5:"16.1 ",m6:"20.5 ",m7:"23.1 ",m8:"24.6 ",m9:"20.7 ",m10:"14.3 ",m11:" 5.9",m12:" "},
          {city:"大连",month:"舒适上限",m1:" ",m2:" ",m3:" ",m4:"25.5 ",m5:"26.7 ",m6:"27.8",m7:"28.4 ",m8:" 28.7",m9:" 27.8",m10:"26.3 ",m11:" 24.4",m12:" "},
          {city:"大连",month:"舒适下限",m1:" ",m2:" ",m3:" ",m4:"14.3 ",m5:"15.4 ",m6:" 16.3",m7:" 16.8",m8:"17.2 ",m9:"16.3 ",m10:"15.0 ",m11:"13.2 ",m12:" "},
          {city:"吐鲁番",month:"室外月平均温度",m1:" ",m2:" ",m3:" 10.8",m4:"19.2 ",m5:" 25.7",m6:"30.1 ",m7:" 32.8",m8:" 30",m9:"23.6 ",m10:" 13.9",m11:" ",m12:" "},
          {city:"吐鲁番",month:"舒适上限",m1:" ",m2:" ",m3:" 25.5",m4:" 27.5",m5:" 29.0",m6:"30.0 ",m7:" 30.6",m8:" 30.0",m9:" 28.5",m10:" 26.2",m11:" ",m12:" "},
          {city:"吐鲁番",month:"舒适下限",m1:" ",m2:" ",m3:" 14.3",m4:" 16.0",m5:" 17.4",m6:" 18.3",m7:"18.9 ",m8:"18.3 ",m9:"17.0 ",m10:"14.9 ",m11:" ",m12:" "},
        ],
        bottomtable:[{label:" "}]
        
        }
    },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
    
    },
methods: {
  objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
}
 
</script>

<style>
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
 .el-table thead.is-group th{
   background: rgb(224, 224, 224);
 }


</style>