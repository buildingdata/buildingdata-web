<template>
	<div class="index-header">
		<!-- <div class="top"> -->
			<!-- <i class="iconfont"></i> -->
			<!-- <router-link to="/user">
				<i class="iconfont icon-wode">建筑节能</i>
			</router-link> -->
		<!-- </div> -->
		<!-- <div class="nav">
			<router-link to="/recommend" class="nav-item">推荐</router-link>
			<router-link to="/singerlist" class="nav-item">歌手</router-link>
			<router-link to="/toplists" class="nav-item">排行榜</router-link>
			<router-link to="/search" class="nav-item">搜索</router-link>
		</div> -->
	</div>
</template>
<script>
	export default {
		methods:{
			goTo(){
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
	    background-color: #3ac5f0;
	}
	.music-logo{
		/* width: 90px; */
		height: 25px;
        text-align: center;
     margin-right: 3.7rem;
     font-size: 18px;
		background-size: cover;
	}
	.top .iconfont{
		font-size: 22px;
		color: #fff;
        text-align: center;
	}
	/* .nav{
		display: flex;
		height: 40px;
		line-height: 40px;
	}
	.nav-item{
		flex-grow: 1;
		text-align: center;
		color: #666;
	}
	.router-link-active{
		color: #31c27c;
		border-bottom: 2px solid #31c27c;
	} */
</style>