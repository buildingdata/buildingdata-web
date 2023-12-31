import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function getCity(){
  let defaultCity = "西安";
  if(localStorage.getItem("city")){
    defaultCity = localStorage.getItem("city")
  }
  return defaultCity
}
export default new Vuex.Store({
  state: {
    city:getCity()
  },
  mutations: {
    changeCity(state,city){
      state.city = city
    }
  },
  actions: {
    changeCity(ctx,city){
      ctx.commit("changeCity",city)
      localStorage.setItem("city",city)
    }
  },
  modules: {
  }
})
