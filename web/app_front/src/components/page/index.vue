<template>
<div class="content">
	<v-head></v-head>
     <div class="top">
             <p class="logo" style="">绿色建筑节能平台</p>
	 </div>
     
	 <div class="recommend">
		<div class="slider">
			<mt-swipe>
				<mt-swipe-item v-for="item in slider" :key="item">
					<img :src="item">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		
		<el-card>
    	<div class="radio-list">
			<ul>
				<li v-for="(item,index) in provideList">
					<div class="media-img" @click="select(item.id)">
                        <figure>
                            <img :src="item.picUrl">
						    <i class="radio-play"  v-show="provideList.length"></i>
                            <figcaption>{{item.Name}}</figcaption>
                        </figure>	
					</div>
					<div class="media-text">
						<p>{{item.Ftitle}}</p>
					</div>
				</li>
			</ul> 
		</div>
		</el-card>
		<div style="height:20px;width:100%;font-size:0.4rem;padding:15px 0 5px 10px;"><i style="color:#3ac5f0;margin-right:5px" class="el-icon-bell"></i>建筑节能资讯</div>
		<div style="background:white;height:250px;margin-top:10px;">
			
		</div>
	</div>
</div>
</template>
<script>
	import vHead from '../common/IndexHeader';
	export default {
		data(){
			return {
				selected:"首页",
				slider:[],
				provideList:[
                    {
                    Name:"建筑气候设计",
                    picUrl: require("../../assets/image/7_5建筑设计.jpg"),
                    id:1
                },{
                    Name:"室内参数",
                    picUrl: require("../../assets/image/gis-jz-节能建筑.jpg"),
                    id:2
                },{
                    Name:"室外参数",
                    picUrl: require("../../assets/image/建筑业.jpg"),
                    id:3
                }
                ],
               slider:[
                require("../../assets/img/bieshu-011.jpg"),
                require("../../assets/img/bieshu-008.jpg"),
                require("../../assets/img/1png.png")
          ],
		 
			}
		},
        components: {
      vHead
    },
		computed:{
		
		},
		watch:{
		selected(newval,val){
			if(newval==="首页"){
			    this.$router.push('/index')
			}else{
				this.$router.push('/aboutMe')
			}
		}
		},
		created(){
		
		},
		methods:{
        select(index){
				
                console.log(index);
                   if(index==1){
						this.$router.push('/climateDesi');}
                    else if(index==2) {this.$router.push('/indoorDesi');}
					
                  else if(index==3) {this.$router.push('/outdoorDesi');} 
				  else{
					  this.$router.push('/meteoro');
				  }
						
			},
		
        }
				  
		 
	}

</script>
<style scoped>
	ul{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	li{
		width: 30%;
	}
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
	.recommend{
		/*background-color: #f4f4f4;*/
		margin-bottom: 80px;
		/* margin-top: 40px; */
	}
	.slider{
		width: 100%;
		height: 170px;
	}
	.slider a{
		display: block;
	}
	.slider img{
		width: 100%;	
		height: 170px;
	}
    .radio-list{
		/*background-color: #fff;*/
		height: auto;
		text-align: center;
        margin-top: 5px;
		margin-bottom:10px
	}
    .radio-list img{
		width: 55%;
		height: auto;
		/* border-radius: 50%; */
	}
    .media-img{
		position: relative;
		margin-top: 15px;
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
		height: 100%;
		background-color: rgb(255, 249, 249);
		overflow: hidden;
        z-index: 100;
}
</style>