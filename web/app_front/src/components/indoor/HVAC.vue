<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">暖通空调设计用参数</p>
             
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" v-if="option">
            <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                 stripe
                 border
                 height="400"
                style="width: 100%">
                <el-table-column
                    prop="climates"
                    label="气候区属"
                    fixed
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="season"
                    label="季节"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="archType"
                    label="建筑类型"
                     width="100">
                </el-table-column>
                <el-table-column
                    prop="archLevel"
                    label="建筑级别"
                     width="100">
                </el-table-column>
                 <el-table-column
                    prop="tempRange"
                    label="温度范围（℃）"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="humiRange"
                    label="湿度（%）">
                </el-table-column>
                <el-table-column
                    prop="windSpeed"
                    label="风速（m/s）">
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
         
        }
    },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
      var that = this;
      //获取不同气候区室内温度设计表格数据
      var url4 = "/building/indoorparm/getIndoorDesignParam";
      this.axios.get(url4).then(function(res){
          console.log("暖通空调")
       that.tableData  = res.data.indoorDesign
       console.log(res.data)
       //通过给option赋值决定获取数据后再渲染表格
       that.option = true
      }).catch((error)=>{
        console.log(error);
      })
    },
methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1) {
          if (rowIndex % 4 === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if(columnIndex === 2){
           if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
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
    height:20px;
    padding:3px 7px 2px 7px;
    text-align: center;
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