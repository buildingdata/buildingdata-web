<template>
<div> 
    <div class="content">
    <v-head></v-head>
        <div class="top">
            <router-link to="/index" slot="left" style="text-decoration: none;">
            <p class="iconfont icon-fanhui" style="color:white"></p> 
            </router-link>
             <p class="logo" style="">建筑节能设计室内参数</p>
        </div>      
    <div>
        <v-selInfo @transfer ="getinfo" :form="selected"></v-selInfo>
    </div>
   </div>
   <div style="margin-top:7.8rem">
        <div v-if="selected==='建筑热工'">
             <div v-if="param==='非供暖房间保温设计室内计算参数'">
                <vUnWarm :from="data"></vUnWarm>
            </div>
            <div v-else-if="param==='非空调房间隔热设计室内计算参数'">
                <vUnHeatAir :from="data"></vUnHeatAir>
            </div>
            <div v-else-if="param==='供暖房间保温设计室内计算参数'">
                <vWarm :from="data"></vWarm>
            </div>
            <div v-else-if="param==='空调房间隔热设计室内计算参数'">
              <vInsulation :from="data"></vInsulation>
            </div>
            <div v-else>
               <vHeatAir :from="data"></vHeatAir>
            </div>
        </div>
        <div v-else>
            <vHVAC></vHVAC>
        </div>
       
    </div>  
    <div >
        <mt-tabbar fixed class="footer" v-model="selected"> 
        <mt-tab-item id="建筑热工" @click="DiffBuild()">
            <img slot="icon" src="../../assets/image/室内温度 (1).png" >
             建筑热工
        </mt-tab-item>
         <mt-tab-item id="暖通空调">
            <img slot="icon" src="../../assets/image/供暖 (1).png" >
        暖通空调
        </mt-tab-item> 
        
        </mt-tabbar>
    </div>
   
</div>
</template>
<script>
import vHead from '../common/IndexHeader';
import vSelInfo from './stationSelect.vue';


import vHeatAir from './thermalDesign/heaAirCondition.vue'
import vUnHeatAir from './thermalDesign/unHeaAirCondition.vue'
import vWarm from './thermalDesign/enclosureWarm.vue'
import vInsulation from './thermalDesign/heatInsulation.vue'
import vUnWarm from './thermalDesign/unwarm.vue'


import vHVAC from './HVAC.vue'
	export default {
		data(){
			return {
				 optionValue:true,
                 selected:"建筑热工",
                 data:{},
                 param:''
			}
		},
        components: {
      vHead,vSelInfo,
      vHeatAir,vUnHeatAir,vWarm,vInsulation,vHVAC,vUnWarm
    },
		computed:{
		
		},
		created(){
		
		},
		methods:{
            DiffBuild(){
            this.getinfo()
            },
             getinfo(data){
            this.data =data
            this.param = data.param
             }
			},    
		 
	
    }
</script>
<style scoped>
 .top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 10px;
        font-size: 0.5rem;
	    background-color: #3ac5f0;
        z-index: 100;
        
	}
.top .logo {
    /* float: left; */
    width: 100%;
    line-height: 55px;
    text-align:center;
    font-size: 0.5rem;color:white
}
.contain-1{
    position: fixed;
}
.footer{
    z-index: 100;
    display: flex;
    bottom: -5px;
    position: fixed;
    background: white;
    border-style: solid;
    border-top-width: thin;
    border-top-color: rgb(190, 190, 190);
}
.content{
    position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 7.8rem;
		background-color: rgb(248, 248, 248);
		overflow: hidden;
        z-index: 100;
}
</style>