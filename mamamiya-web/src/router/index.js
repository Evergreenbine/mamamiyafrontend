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
const LittleShopTem = () =>
    import ('../components/shop/LittleShopTem')
const BrandTemplate = () =>
    import ('../components/shop/BrandTemplate')
const User = () =>
    import ('../components/user/User')
const MilkSelect = () =>
    import ('../components/shop/catagory/MilkSelect')
const ShopCar = () =>
    import ('../components/shop/ShopCar')
const Test = () =>
    import ('../components/FullTextEditor')
const QuesIndex = () =>
    import (
        '../components/question/QuesIndex'
    )
const BBSpost = () =>
    import ('../components/bbs/BBSpost')

const BBSIndex = () =>
    import (
        '../components/bbs/BBSIndex'
    )
const BBsDetail = () =>
    import (
        '../components/bbs/BBSPostDetail'
    )
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
        children: [{
                path: '/shop/index',
                redirect: '/shop/index/tem',
                component: ShopTemplate,
                children: [
                    { path: '/shop/morebrand', component: BrandTemplate },
                    { path: '/shop/index/tem', component: LittleShopTem }
                ]
            },
            { path: '/shop/milk', component: MilkSelect },
            { path: '/shop/shopcar', component: ShopCar }
        ]
    }, {
        path: '/user',
        component: User,

    }, {
        path: '/questest',
        component: Test
    }, {
        path: '/ques',
        component: QuesIndex
    },
    // 论坛首页
    {
        path: '/bbsindex',
        component: BBSIndex,
        hidden: true
    },
    {
        path: '/bbs/post',
        component: BBSpost

    }, {
        path: '/bbs/detail',
        component: BBsDetail
    },
    // 管理员
    {
        path: '/admin',
        redirect: '/admin/login',
        component: () =>
            import ('../components/admin/AdminLoginIndex'),

        children: [{
                path: '/admin/login',
                component: () =>
                    import ('../components/admin/AdminLogin'),
            },
            {
                path: '/admin/register',
                component: () =>
                    import ('../components/admin/AdminRegister')
            }
        ]
    }, {
        path: '/admin/shop',
        component: () =>
            import ('../components/admin/shop/ShopAdmin'),
        children: [{
            path: '/admin/shop/create',
            component: () =>
                import ('../components/admin/shop/ShopCreate')
        }, {
            path: '/admin/shop/list',
            component: () =>
                import ('../components/admin/shop/ShopList')
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router