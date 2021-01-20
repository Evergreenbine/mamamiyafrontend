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
const ShopTemplate = () =>
    import ('../components/shop/ShopTemplate')
const BrandTemplate = () =>
    import ('../components/shop/BrandTemplate')
const User = () =>
    import ('../components/user/User')
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
    redirect: '/shop/index',
    component: ShopIndex,
    children: [
        { path: '/shop/index', component: ShopTemplate },
        { path: '/shop/morebrand', component: BrandTemplate }
    ]
}, {
    path: '/user',
    component: User
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router