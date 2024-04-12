<template>
  <div >
    <div class="container-1">
        <div class="grid-content " style="padding-top:0.2rem">
            <div class="station-content" style="display:inline-block; padding-left:0.5rem">站点省份:
               <select id="pronvince"  v-model="provinceSelect" @change="selectFn($event)"  class="handle-select ">
                  <option v-for="item in province" v-bind:value='item'  v-text="item" :key="item" style="font-size:16px"></option> 
              </select>
            </div>
            <div class="station-content"  style="display:inline-block;padding-left:0.6rem">城市:
                <select id="city"  v-model="city"  class="handle-select" @change="selectCity($event)">
                <option v-for="item in citys" v-bind:value='item'  v-text="item" :key="item" style="font-size:16px" ></option>
                </select>
            </div>      
        </div>
        <div v-if="paramShow">
           <div class="station-content" style="display:inline-block; padding-left:0.5rem">参数类型:
               <select id="param"  v-model="paramSelect" @change="selectParam($event)" class="handle-select ">
                  <option v-for="item in params" v-bind:value='item'  v-text="item" :key="item" style="font-size:16px"></option> 
              </select>
            </div> 
        </div>
    </div>
   
     <div class="container-3">
      <div style="padding-top:15px;">
        <span  style=" padding:15px; display:inline-block;" class="info-class" >经度:
          <label id="label1">{{tableTitle.longitude}}</label>
        </span>
        <span class="info-class"  style="margin-left:0.8rem;padding:15px; display:inline-block;">海拔:
          <label id="label2">{{tableTitle.altitude}}</label>    
        </span>  
      </div>
      <div style="padding-top:15px;">
        <span class="info-class1" style=" padding:15px; display:inline-block;">纬度:
          <label id="label3">{{tableTitle.latitude}}</label>
        </span>
        <span class="info-class1"  style="margin-left:0.8rem;padding:15px; display:inline-block;">气候区:
          <label id="label4">{{tableTitle.climates}}</label>    
        </span>  
      </div>
    </div>
 </div>
</template>
<script>
export default {
      data(){
        return {
          citys:[],
          city: '北京',
          info: [],
          tableTitle: {},
          tableWind: {},
          provinceSelect: '北京',
          province:[],
          params:["自然通风设计室外计算参数","建筑遮阳设计室外计算参数","围护结构稳态保温防潮设计室外计算参数",
          "围护结构隔热设计室外计算参数","围护结构动态保温设计室外计算参数","围护结构热湿耦合计算室外计算参数"],
          paramSelect:'自然通风设计室外计算参数',
          option:false,
          stationId:'54511',
          climates:'1A',
          altitude:'3.4',
          longitude:'116.47',
          latitude:'39.8',
          paramShow:true,
          classShow:false
          }
    },
     props:{
       form:{

       }
   },
   watch: {
    form(newval, val) {
      console.log(newval)
      if(newval=="建筑热工")
     {
       this.params=  ["自然通风设计室外计算参数","建筑遮阳设计室外计算参数","围护结构稳态保温防潮设计室外计算参数",
          "围护结构隔热设计室外计算参数","围护结构动态保温设计室外计算参数","围护结构热湿耦合计算室外计算参数"]
       this.paramShow  = true
     }else{
        this.paramShow  = false
     } 
    },
     paramSelect(newval,val){
      
        this.city="北京"
        var that = this;
        this.provinceSelect = "北京"
        var pro = this.provinceSelect
        var url = "/building/selectcity/getcitys?province="+pro;
        this.axios.get(url).then(function(res){
      that.citys = res.data.cityList
      }).catch((error)=>{
        console.log(error);
      })
        
        console.log("参数发生变化",newval)
      }
    },
    components:{
    },
      //初始化页面省份，城市，等信息
     created (){
     //获取所有省份
      var that = this;

      //获取所有的省份，初始化省份列表信息
     var url = "/building/selectcity/getprovince";
        this.axios.get(url).then(function(res){
        that.province = res.data.provinceList
      }).catch((error)=>{
        console.log(error);
      })

      //初始化城市列表信息
       var url3 = "/building/selectcity/getcitys?province="+'北京';
       this.axios.get(url3).then(function(res){ 
       that.citys = res.data.cityList
      }).catch((error)=>{
        console.log(error);
      })

      //获取海拔、经纬度等站点信息
     var url1 = "/building/selectcity/getstationinfo?stationid="+this.stationId;
     this.axios.get(url1).then(function(res){
       that.tableTitle = res.data.stationinfo

       that.tableTitle.longitude = parseFloat( that.tableTitle.longitude).toFixed(2)
       that.tableTitle.latitude =parseFloat ( that.tableTitle.latitude).toFixed(2)
       that.tableTitle.altitude = parseFloat( that.tableTitle.altitude).toFixed(2)
         that.latitude=that.tableTitle.latitude.toFixed(2),
         that.altitudes=that.tableTitle.altitude.toFixed(2),
         that.longitude=that.tableTitle.longitude.toFixed(2),
         that.climates = that.tableTitle.climates
      
      }).catch((error)=>{
        console.log(error);
      }) 

       that.setInfo()
    },
methods: {
  //省份切换
   selectFn(e){
    var that = this;
    var pro = this.provinceSelect
     var url = "/building/selectcity/getcitys?province="+pro;
       this.axios.get(url).then(function(res){
        
          that.citys = res.data.cityList
      }).catch((error)=>{
        console.log(error);
      })
   } ,
   //城市切换
   selectCity(e){
   var that = this;
    //获取切换省份后的城市信息
    var city = this.city
     var url = "/building/selectcity/getstations?city="+city;
       this.axios.get(url).then(function(res){
       
          that.info = res.data.stationList
          that.stationId = res.data.stationList[0]
          that.getCityAltitude(that.stationId)
           
      }).catch((error)=>{
        console.log(error);
      })
     
   },
   selectParam(){
     this.setInfo()
   },
    getCityAltitude(id){
      var that = this
       //获取海拔、经纬度等站点信息
     var url1 = "/building/selectcity/getstationinfo?stationid="+id;
     this.axios.get(url1).then(function(res){
       that.tabletitle = res.data.stationinfo
      
         that.latitude=res.data.stationinfo.latitude.toFixed(2),
         that.altitude=res.data.stationinfo.altitude.toFixed(2),
        
         that.longitude=res.data.stationinfo.longitude.toFixed(2),
         that.climates = res.data.stationinfo.climates
         //向父组件传递参数
         that.setInfo()
         //修改海拔等信息
         document.getElementById('label1').innerHTML =parseFloat(that.longitude).toFixed(2) 
        document.getElementById('label2').innerText = parseFloat(that.altitude).toFixed(2)
        document.getElementById('label3').innerHTML = parseFloat(that.latitude).toFixed(2)
          document.getElementById('label4').innerHTML = res.data.stationinfo.climates
          
    
      }).catch((error)=>{
        console.log(error);
      }) 
    },
    
   setInfo(){
     console.log(this.altitude)
   
     var data ={
       province:this.provinceSelect,
       city: this.city,
       climates: this.climates,
      stationid:this.stationId,
      param:this.paramSelect,
     }
      
     this.$emit('transfer',data)
   
    //  console.log(this.province)
    //  this.$emit('transfer',this.city)
    //  this.$emit('transfer',this.climates)
   }
    }
}
 
 
</script>

<style scoped>
*{
    font-size: 14px; 
 
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
 .container-1{
     width:100%;
     height:100px;
     /* margin-top:40px; */
     background-color: white;
     box-shadow: 1px 1px 1px #ccc;
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }
 .active{
   height:70px; 
 }
 .container-3{
     width:100%;
     height:150px;
     margin-top:10px;
     background-color: white;
     box-shadow: 1px 1px 1px #ccc;
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }

.info-class{
   /* background-color:#9eeee2; */
   width: 3.2rem;
   height:20px;
   font-weight:bold;
   margin-left: 20px;
    background-color:rgb(219, 216, 216);
    text-align: center;
    display:inline-block;
     box-shadow: 1px 2px 3px #ccc;
}
.info-class1{
   /* background-color:#9eeee2; */
   width: 3.2rem;
   height:20px;
   font-weight:bold;
   margin-left: 20px;
    background-color:rgb(248, 247, 247);
    text-align: center;
    display:inline-block;
     box-shadow: 1px 2px 3px #ccc;
}
</style>