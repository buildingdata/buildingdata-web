<template>
<div>
     
     <v-head></v-head>
     <div class="top">
             <p class="logo" style="">绿色建筑节能平台</p>
	 </div>
    <el-card class="box-card">
        
        <el-col :span="12" style="float:left;margin:0px 0 15px">
        <img src="../../assets/image/IMG_3299.jpg" width="50px" height="50px"> 
        </el-col>
        <el-col :span="12" style="margin:10px 0 10px">
        <p style="float:right;font-size:0.5rem;margin-right:20%">绿建</p>
         </el-col>
      <!--   <span style="padding-right:15px;"><font color="#3ac5f0">完善信息></font></span> -->
    </el-card>
    <el-card>
        <el-col :span="12" ><div style="float:left;margin:0px 0 15px;font-size:0.4rem;">账户管理</div> </el-col>
        <el-col :span="12" ><div style="float:right;font-size:0.4rem;" @click="manage()">更多<i class="el-icon-arrow-right"></i></div></el-col>
    </el-card>
    <el-card>
         <el-col :span="12" ><div style="float:left;margin:0px 0 15px;font-size:0.4rem;">关于我们</div> </el-col>
        <el-col :span="12" ><div style="float:right;font-size:0.4rem;">更多<i class="el-icon-arrow-right"></i></div></el-col>
    </el-card>
     <!-- footer -->
		<mt-tabbar  fixed v-model="selected" class="footer"> 
			<mt-tab-item id="首页">
				<img slot="icon" src="../../assets/img/首页 (1).png" @click="index()">
			首页
			</mt-tab-item>
			<mt-tab-item id="我的" >
				<!-- <div @click="DiffBuild()"> -->
				<img slot="icon" src="../../assets/img/我的.png" @click="AboutMe()">
				我的
			</mt-tab-item> 
        </mt-tabbar>
</div>
</template>
<script>
	import vHead from '../common/IndexHeader';
	export default {
		data(){
			return {
				selected:"我的",
			}
		},
        components: {
      vHead
    },
		computed:{
		
		},
		created(){
		
		},
		methods:{
			index(){
			this.$router.push('/index')
			},
			AboutMe(){
			this.$router.push('/aboutMe')
			},
            manage(){
             this.$router.push('/managerUser')
    }
        }
				  
		 
	}

</script>
<style scoped>
	
    .top{
		display: flex;
		align-items: center;
		justify-content: space-between;		
		padding: 0 10px; 
		height: 44px;
		font-size: 0.5rem;
	    background-color: #3ac5f0;
	}
    .top .logo {
    /* float: left; */
    width: 100%;
    line-height: 55px;
    text-align:center;
    font-size: 0.5rem;color:white
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

ul li {
        list-style: none;
        float: left;
        width: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: rgba(250, 249, 249, 0.8);
        font-size: 20px;
    }
    .banner {
        max-width: 10rem;
        margin: 0 auto;
        position: relative;
        margin-top: 30px;
    
    }
    .banner img {
        width: 100%;
        height: 260px;
        display: block;
        
    }
    
    .current {
        color: #ff6700;
    }

.container-3{
   max-width: 100%;
     height:180px;
     width: 10rem;
     margin-top:5px;
     background-color: white; 
     box-shadow: 1px 1px 1px #ccc;
      margin: 0 auto;
      position: relative;
      
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }
 .container-1{
   max-width: 100%;
     height:60px;
     width: 10rem;
     margin-top:5px;
     background-color: white; 
     box-shadow: 1px 1px 1px #ccc;
      margin: 0 auto;
      position: relative;
      
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }
.container-2{
   max-width: 100%;
     height:500px;
     width: 10rem;
     margin-top:5px;
     background-color: white; 
     box-shadow: 1px 1px 1px #ccc;
      margin: 0 auto;
      position: relative;
      
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }
.info-class{
   /* background-color:#9eeee2; */
   width: 3.2rem;
   height:40px;
    margin-top: 15px;
    background-color:rgb(132, 243, 188);
     box-shadow: 1px 2px 3px #ccc;
}
.dl{
  display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
</style>