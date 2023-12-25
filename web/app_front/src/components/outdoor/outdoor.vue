<template>
<div> 
    <div class="content">
        <v-head></v-head>
        <div class="top">
            <router-link to="/index" slot="left" style="text-decoration: none;">
            <p class="iconfont icon-fanhui" style="color:white"></p> 
            </router-link>
             <p class="logo" style="">建筑节能设计室外参数</p>
        </div>      
        <div>
             <v-selInfo @transfer ="getinfo" :form="selected"></v-selInfo>
        </div>
   </div>
   <div style="margin-top:7.8rem">
        <div v-if="selected==='建筑热工'">
             <div v-if="param==='自然通风设计室外计算参数'">
                <vNatural :form='data'></vNatural>
            </div>
            <div v-else-if="param==='建筑遮阳设计室外计算参数'">
                <vCoverSun :form='data'></vCoverSun>
            </div>
             <div v-else-if="param==='围护结构稳态保温防潮设计室外计算参数'">
                 <vMoisture :form='data'></vMoisture>
            </div>
             <div v-else-if="param==='围护结构隔热设计室外计算参数'">
                 <vHeat :form='data'></vHeat>
            </div>
            <div v-else-if="param==='围护结构动态保温设计室外计算参数'">
                 <VDynamic :form='data'></VDynamic>
            </div>
             <div v-else>
                 <vHeatMoisture :form='data'></vHeatMoisture>
            </div>
        </div>
        <div v-else>
            <ocpMulgrpc :form='data'></ocpMulgrpc>
        </div>
    </div>
     <div >
        <mt-tabbar  fixed v-model="selected" class="footer"> 
        <mt-tab-item id="建筑热工">
            <img slot="icon" src="../../assets/image/建筑建材 (1).png">
        建筑热工
        </mt-tab-item>
        <mt-tab-item id="供暖空调"  @click="hotSupport()">
            <!-- <div @click="DiffBuild()"> -->
            <img slot="icon" src="../../assets/image/供暖 (1).png" >
             供暖空调
        </mt-tab-item> 
        </mt-tabbar>
     </div>
      
</div>
</template>
<script>
	import vHead from '../common/IndexHeader';
import vSelInfo from './stationSelect.vue';
import vNatural from './heatWind/naturalVentilat.vue'
import ocpMulgrpc from './thermalDesign/multipleRate.vue'
import vMoisture from './heatWind/moistureProof.vue'
import vHeat from './heatWind/heatInsulation.vue'
import VDynamic from './heatWind/dynamicInsulation.vue'
import vCoverSun from './heatWind/coverSun.vue'
import vHeatMoisture from './heatWind/heatMoisture.vue'
	export default {
		data(){
			return {
				 optionValue:true,
                  data:{},
                  selected:'建筑热工',
                   param:''
			}
		},
        components: {
      vHead,vSelInfo,ocpMulgrpc,vNatural,vMoisture,vHeat,VDynamic,vCoverSun,vHeatMoisture
    },
		computed:{
		
		},
		created(){
		
		},
		methods:{
           
            hotSupport(){
                this.getinfo()
            },
            getinfo(data){
            console.log("参数变化",data)
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
</style>