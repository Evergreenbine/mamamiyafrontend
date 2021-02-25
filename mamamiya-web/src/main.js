import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './styles.scss'
// import http from './http'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { StringUtils, LoginIntecepter } from './utils'
import { config } from './http'
import { ip } from './ip'


// import './assets/iconfont/iconfont.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'


// 引入echarts
import echarts from 'echarts'




Vue.use(VueQuillEditor)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$config = new config()
Vue.prototype.$strutil = new StringUtils()
Vue.prototype.$lointe = new LoginIntecepter()
Vue.prototype.$ip = new ip()
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')