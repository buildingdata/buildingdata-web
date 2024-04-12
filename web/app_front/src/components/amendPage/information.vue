<template>
<div style="content"> 
  <v-home></v-home>
  <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
          <router-link to="/main" style="text-decoration: none;">
           <p class="iconfont icon-fanhui"></p> 
           <!-- 返回 -->
             </router-link>
        </div>
        <div class="logo" style="font-size: 18px;">通知消息</div>
    </div>
  <div style="padding-top:20px"></div>
  <div style="height:700px"></div>

  <footer class="footer">
    <div style="width:10rem;" v-if="optionValue">
      <nav style="width:100%;display:flex;height:60px">
        
       
      </nav>
    </div>
    <div style="width:10rem;" v-else>
      <nav style="width:100%;display:flex;height:60px">
        
      </nav>
    </div>
  </footer>
</div>
</template>
<script>
import vHome from '../common/Home';
export default {
   data() {
          return {
       optionValue:true,
  }
  } ,
  components: {
      vHome
    },
methods:{
     handleReturn() {
      this.$router.back();
    },
    Base(){
      this.optionValue = true
    },
    Online(){
       this.optionValue = false
    }
}
}

</script>
<style scoped>
* {
        margin: 0;
        padding: 0;
        font-size: 16px;
    }
.header {
    position: fixed;
    box-sizing: border-box;
    width: 10rem;
    height: 50px;
    font-size: 16px;
    color: #fff;
    background-color: #3ac5f0;
}
.collapse-btn {
    float: left;
    /* padding: 0 21px; */
    padding-left:10px;
    cursor: pointer;
    line-height: 40px;
    text-decoration: none;
}
.header .logo {
    /* float: left; */
    width: 100%;
    line-height: 55px;
    text-align:center
}
.content{
  width:10rem;
  height: 100%;
 
}
.footer{
  max-width: 10rem;
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        z-index: 3;
        background: rgb(240, 239, 239);
        border-color: rgb(207, 206, 206);
        border-style: solid;
        border-top-width: thin;
        border-top-color: rgb(190, 190, 190);

}
.dl{
  display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
   
}

</style>