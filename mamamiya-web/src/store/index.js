import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: "",
            password: "",
            token: ''
        },

    },
    mutations: {
        /* 将user改成token*/
        login(state, playload) {
            console.log("playload is " + playload);
            console.log(playload);
            let username = state.user.username = playload.username;
            let password = state.user.password = playload.password;
            let token = state.user.token = playload.token;
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("token", token);
        }
    },
    actions: {},
    modules: {}
})