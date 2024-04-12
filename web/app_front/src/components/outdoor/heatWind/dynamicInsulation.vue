<template>
  <div >
        <!-- 表格信息显示 -->
        <div class="container-2">
           <p id="typename">围护结构动态保温设计室外计算参数</p>
              <div v-if="option==false">
               <el-empty description="暂无此站点数据"></el-empty>
            </div>
            <!-- 显示所选城镇的海拔经纬度等信息 -->  

         <!-- 不同气候区室内温度设计 -->
         <div style="padding:10px 15px 25px 15px" v-if="option">
             <p>最小值</p>
            <el-table
                :data="tableData"
                  :cell-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
            :row-style="{color: 'black',fontSize:'14px',textAlign:'center'}"
                border
                height="400"
                style="width: 100%">
                <el-table-column
                fixed
                 sortable
                prop="time"
                label="时间"
                width="80">
                </el-table-column>
                <el-table-column
                prop="lDhpcot"
                label="冬季室外计算温度(°C)"
                width="120">
                </el-table-column>
                <el-table-column
                label="采暖期太阳辐射强度I(W/m²)">
                    <el-table-column
                    prop="lDhpsriH"
                    label="水平"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="lDhpsriE"
                    label="东向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="lDhpsriS"
                    label="南向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="lDhpsriW"
                    label="西向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="lDhpsriN"
                    label="北向"
                    width="80">
                    </el-table-column>
                </el-table-column>
               
            </el-table>
            <p>不保证日为5天</p>
            <el-table
                :data="tableData"
                border
                height="400"
                style="width: 100%">
                <el-table-column
                fixed
                 sortable
                prop="time"
                label="时间"
                width="80">
                </el-table-column>
                <el-table-column
                prop="fDhpcot"
                label="冬季室外计算温度(°C)"
                width="120">
                </el-table-column>
                <el-table-column
                label="采暖期太阳辐射强度I(W/m²)">
                    <el-table-column
                    prop="fDhpsriH"
                    label="水平"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="fDhpsriE"
                    label="东向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="fDhpsriS"
                    label="南向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="fDhpsriW"
                    label="西向"
                    width="80">
                    </el-table-column>
                     <el-table-column
                    prop="fDhpsriN"
                    label="北向"
                    width="80">
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
    var url4 = "/building/outdoorparm/getocpedid?id=" + this.stationId ;
    this.axios.get(url4).then(function(res){
       that.tableData  = res.data.ocpedidInfoList
       console.log(res.data)
       //通过给option赋值决定获取数据后再渲染表格
       if(that.tableData.length==0)
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