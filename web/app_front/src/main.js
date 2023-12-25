import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'

//引入minit-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/my-mint.css'//修改mint-ui的默认样式
Vue.use(MintUI)

import './assets/css/table.css'
import '../src/assets/css/theme-green/fonts/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill';
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'lib-flexible/flexible.js'
import './assets/css/reset.css'
import 'vue-better-slider/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';


Vue.use(ElementUI)

axios.defaults.withCredentials = true;
axios.defaults.baseURL = '/api'
Vue.use(VueAxios,axios);

Vue.config.productionTip = false;
Vue.component('v-chart', ECharts)
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
