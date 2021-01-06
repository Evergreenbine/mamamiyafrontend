import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const Login = ()=> import('../components/login/Login')
const SubLogin = ()=> import('../components/login/SubLogin')
const Register = () => import('../components/login/Register')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/new',
    name: 'Login',
    component:Login,
    children:[
      {path:'/new/register',component:Register},
      {path:'/new/login',component:SubLogin}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
