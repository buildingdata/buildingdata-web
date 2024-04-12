import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);
export default new Router({
  routes: [
      {
        path:'/',
        redirect:'/index'
      },
         {
                 path: '/index',
                component: () => import('../components/page/index.vue'),
               
            },
            {
              path: '/indoorDesi',
             component: () => import( '../components/indoor/indoor.vue'),
             
          },
          {
          path: '/outdoorDesi',
         component: () => import( '../components/outdoor/outdoor.vue'),
        
          },
          {
              path: '/climateDesi',
            component: () => import( '../components/page/climateDesi.vue'),
            
          },
          {
            path: '/aboutMe',
          component: () => import( '../components/amendPage/aboute.vue'),
          
          },
          {
          path: '/managerUser',
        component: () => import( '../components/amendPage/manageUser.vue'),
          }
  ]
        });














// export default new Router({
//     routes: [
//             {
//                 path: '/main',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/index.vue'),
//                 meta: { title: '支持作者' }  
//             },
//             {
//                 path: '/about',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/about.vue'),
//                 meta: { title: '支持作者' } 
//             },
//             {
//                 path: '/climateDesi',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/detail/climateDesi.vue'),
//                 meta: { title: '支持作者' } ,
               
//                 },
//              {
//                 path: '/IndoorDesi',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/detail/IndoorDesi.vue'),
//                 meta: { title: '支持作者' } 
//              },
            
//             {
//                 path: '/OutdoorDesi',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/detail/OutdoorDesi.vue'),
//                 meta: { title: '支持作者' } 
//             },
//             {
//                 path: '/AboutMe',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/AboutMe.vue'),
//                 meta: { title: '支持作者' } 
//             },
//             ,
//             {
//                 path: '/Information',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/information.vue'),
//                 meta: { title: '支持作者' } 
//             } ,
//             {
//                 path: '/OutdoorHeat',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/heatBuild.vue'),
//                 meta: { title: '支持作者' } 
//             } ,
//             ,
//             {
//                 path: '/OutdoorAir',
//                 component: () => import(/* webpackChunkName: "donate" */ '../components/amendPage/HeatAirCond.vue'),
//                 meta: { title: '支持作者' } 
//             },
//             {
//                 path: '/index2',
//                 component: () => import('../components/amendPage/index2.vue')
//             } ,
//             {
//                 path: '/managerUser',
//                 component: () => import('../components/amendPage/manageUser.vue')
//             } 
             
//     ]
// });
