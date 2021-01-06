import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     user:{
       username:"",
       password:""
     }
  },
  mutations: {
    /* 将user改成token*/
    login(state,payload){
       let username = state.user.username = payload.username;
       let password = state.user.password = payload.password;
       localStorage.setItem("username",username);
       localStorage.setItem("password",password);

    }
  },
  actions: {
  },
  modules: {
  }
})
