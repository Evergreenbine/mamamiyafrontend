import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
const LoginIndex = () =>
    import ('../components/login/LoginIndex')
const Login = () =>
    import ('../components/login/Login')
const Register = () =>
    import ('../components/login/Register')
const ShopIndex = () =>
    import ('../components/shop/ShopIndex')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/new',
    redirect: '/new/login',
    name: 'LoginIndex',

    component: LoginIndex,
    children: [
        { path: '/new/register', component: Register },
        { path: '/new/login', component: Login }
    ]
}, {
    path: '/shop',
    component: ShopIndex
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router