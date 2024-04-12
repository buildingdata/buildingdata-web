<template>
    <div>
        <v-home></v-home>
        <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn">
          <router-link to="/AboutMe" style="text-decoration: none;">
           <p class="iconfont icon-fanhui"></p> 
           <!-- 返回 -->
             </router-link>
        </div>
        <div class="logo" style="font-size: 18px;">账户管理</div>
    </div>
        <div style="padding-top:50px"></div>
        <div class="container-3">
        
        <div style="width:100%;height:30px;text-align:center;font-size:16px;padding-top:5px">
            <div v-if='user.state'>已使用手机登录</div>
            <div v-else>未登录</div>
        </div>
        <el-card>
            <span style="font-size:16px;">
                手机号
            </span>
            <span style="font-size:16px;float:right">{{user.tel}}</span>
            <el-divider></el-divider>
            <span style="font-size:16px;">
                修改密码
            </span>
             <span style="font-size:20px;float:right;font-weight: 200;"><font color="#3ac5f0">></font></span>
        </el-card>
       
        <div style="width:100%;height:30px;text-align:center;font-size:16px;padding-top:5px">
            <p>第三方账户绑定</p>
        </div>
        <el-card>
            <span style="font-size:16px">微信</span>
           <el-switch
           v-model="user.wechat"
           active-text="绑定"
           style="float:right"
           ></el-switch>
            <el-divider></el-divider>
            <span  style="font-size:16px">QQ</span>
            <el-switch
           v-model="user.qq"
           active-text="绑定"
           style="float:right"
           ></el-switch>
        </el-card>
       
       
    </div>
    </div>
</template>
<script>
import vHome from '../common/IndexHeader';
export default {
    data(){
        return{
        user:{}  
        }

    },
    components:{
        vHome
    },
    mounted(){
        this.user ={
            name:'Tom',
            tel:'12345678910',
            qq:false,
            wechat:true,
            password:'',
            state:true
        }
    },
    methods:{
    }
      
}
</script>
<style scoped>
.container-3{
   max-width: 100%;
     height:763px;
     width: 10rem;
     margin-top:5px;
     background-color: rgb(248, 247, 247); 
     box-shadow: 1px 1px 1px #ccc;
      margin: 0 auto;
      position: relative;
      
    /* padding: 2px; */
     /* border: 1px solid #ddd; */
 }
 .header .logo {
    /* float: left; */
    width: 100%;
    line-height: 55px;
    text-align:center;
    
}
.collapse-btn {
    float: left;
    /* padding: 0 21px; */
    padding-left:10px;
    cursor: pointer;
    line-height: 40px;
    text-decoration: none;
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
</style>