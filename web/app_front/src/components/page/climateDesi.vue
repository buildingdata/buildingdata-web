<template>
<div> 
    <div class="content">
        <v-head></v-head>
        <div class="top">
            <router-link to="/index" slot="left" style="text-decoration: none;">
            <p class="iconfont icon-fanhui" style="color:white"></p> 
            </router-link>
             <p class="logo" style="">建筑气候设计数据</p>
        </div>   
   </div>
   <!-- 选择城市，参数等 -->
   <div style="margin-top:1.4rem">
        <div >
            <el-card>
            <basicClimateHead></basicClimateHead>
            </el-card>
        </div>

    </div>
</div>
</template>
<script>
import vHead from '../common/IndexHeader';
import basicClimateHead from '../page/climateSelect'
	export default {
		data(){
			return {
				 optionValue:true,
                 selected:"基本气候",
                 data:{}
			}
		},
        components: {
      vHead,basicClimateHead
    },
		computed:{
		
		},
		created(){
		
		},
	methods:{
        DiffClimate(){ 
            if( this.optionValue==true)
            this.optionValue = false
            else  this.optionValue=true
			}, 
    getinfo(data){
    this.data =data
    console.log("参数发生变化",data)
             }   	 
	
    }
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
    bottom: 0rem;
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
		height: 1.4rem;
		background-color: rgb(248, 248, 248);
		overflow: hidden;
        z-index: 100;
}
</style>