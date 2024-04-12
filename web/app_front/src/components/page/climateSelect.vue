<template>
  <div >
      <div class="content">
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
            <div class="grid-content " style="padding-top:0.2rem">
                <div  style="display:inline-block; padding-left:0.5rem" class="station-content">参数类别:
                <select id="pronvince"  v-model="paramOption" class="handle-select ">
                    <option value="空气温度图" >空气温度图</option>
                <option value="空气湿度图">空气湿度图</option>
                <option value="太阳辐射图">太阳辐射图</option>
                <option value="风速图">风速图</option>
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

     <div style="margin-top:260px;"></div>
    <div style="height:auto;overflow-y: scroll;margin-bottom:50px" >
        <div v-if="paramOption ==='空气温度图'">
           <airTem :form='data'></airTem> 
        </div>
        <div v-if="paramOption ==='空气湿度图'">
            <airHumidy :form='data'></airHumidy>
        </div>
        <div v-if="paramOption ==='太阳辐射图'">
            <sunRadiation :form='data'></sunRadiation>
        </div>
        <div v-if="paramOption ==='风速图'">
          <wind :form='data'></wind>
        </div>
    </div>
 </div>
</template>
<script>
import airHumidy from '../ChartAndTable/airHumidy'
import airTem from '../ChartAndTable/airTem'
import sunRadiation from '../ChartAndTable/sunRadiation'
import wind from '../ChartAndTable/wind'
export default {
      data(){
        return {
          citys:[],
          city: '北京',
          info: [],
          tableTitle: {},
          tableWind: {},
          paramOption:'空气温度图',
          provinceSelect: '北京',
          province:[],
          data:{},
          option:false,
          climates:'1A',
          altitude:'3.4',
          longitude:'116.47',
          latitude:'39.8',
          stationId:'54511'
          
        }
    },
    components:{
       airHumidy ,airTem,sunRadiation,wind
    },
    watch:{
      paramOption(newval,val){
      
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
      //初始化页面省份，城市，等信息
     created (){
    
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
   var city = this.city
   var url = "/building/selectcity/getstations?city="+city;
   this.axios.get(url).then(function(res){
   that.info = res.data.stationList
   that.getCityAltitude(res.data.stationList[0])
   }).catch((error)=>{
     console.log(error);
  }) },
  //获取海拔、经纬度等站点信息
  getCityAltitude(id){
  var that = this
  that.stationId = id;
  var url1 = "/building/selectcity/getstationinfo?stationid="+id;
  this.axios.get(url1).then(function(res){
  that.tabletitle = res.data.stationinfo
  console.log(res.data)
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
    changeParam(){
    that.setInfo()
    },
   setInfo(){
     var data ={
       stationid:this.stationId,
       province:this.provinceSelect,
       city: this.city,
       climates: this.climates,
       param: this.paramOption,
       altitude:parseFloat(this.altitude).toFixed(2),
       logitude:parseFloat(this.longitude).toFixed(2),
       latitude:parseFloat(this.latitude).toFixed(2)
     }
     this.data = data;
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
.content{
    position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height:280px;
		background-color: rgb(248, 248, 248);
		overflow: hidden;
        z-index: 10;
        margin-top:40px;
}
</style>