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
    },
    // 登录
    {
        path: '/new',
        redirect: '/new/login',
        name: 'LoginIndex',
        component: LoginIndex,
        children: [
            { path: '/new/register', component: Register },
            { path: '/new/login', component: Login }
        ]
    },
    // 商城
    {
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
            {
                path: '/shop/search',
                component: () =>
                    import ('../components/shop/ShopSearch')
            },
            { path: '/shop/milk', component: MilkSelect },
            { path: '/shop/shopcar', component: ShopCar },
            {
                path: '/shop/orderdetail',
                component: () =>
                    import ("../components/shop/OrderInfo")
            },
            {
                path: '/shop/orderall',
                component: () =>
                    import ("../components/shop/AllOrder")
            },
            {
                path: '/shop/diapers',
                component: () =>
                    import ('../components/shop/catagory/DiapersSelect')
            },
            {
                path: '/shop/feeding',
                component: () =>
                    import ('../components/shop/catagory/FeedingSelect')
            },
            {
                path: '/shop/food',
                component: () =>
                    import ('../components/shop/catagory/FoodSelect')
            },
            {
                path: '/shop/milkbrand',
                component: () =>
                    import ('../components/shop/catagory/MilkBrand')
            },
            {
                path: '/shop/diapersbrand',
                component: () =>
                    import ('../components/shop/catagory/DiapersBrand')
            },
            {
                path: '/shop/feedingbrand',
                component: () =>
                    import ('../components/shop/catagory/FeedingBrand ')
            },
            {
                path: '/shop/foodbrand',
                component: () =>
                    import ('../components/shop/catagory/FoodBrand')
            }
        ]
    },
    {
        path: '/echarts',
        component: () =>
            import ('../components/Echarts')
    },
    {
        path: '/testviedo',
        component: () =>
            import ('../components/Videodemo')
    },
    {
        path: '/user',
        component: User,
        children: [{
                path: '/user/other',
                component: () =>
                    import ('../components/user/OtherDetail')

            }, {
                path: '/user/myreplyto',
                component: () =>
                    import ('../components/user/MyReplyTo')
            }, {
                path: '/user/myreplypost',
                component: () =>
                    import ('../components/user/MyReplyPost')

            },
            {
                path: '/user/replymepost',
                component: () =>
                    import ('../components/user/ReplyMePost')
            },
            {
                path: '/user/replymefloor',
                component: () =>
                    import ('../components/user/Replymefloor')
            },
            {
                path: '/user/myfollowcircle',
                component: () =>
                    import ('../components/user/MyFollowCircle')
            }
        ]

    },
    {
        path: '/questest',
        component: Test
    },
    // 知识付费
    {
        path: '/ques',
        redirect: '/ques/konwIndex',
        component: QuesIndex,
        children: [{
                path: '/ques/search',
                component: () =>
                    import ('../components/question/SearchResult')
            },
            {
                path: '/ques/konw',
                component: () =>
                    import ('../components/question/Knowlege')
            }, {
                path: '/ques/konwIndex',
                component: () =>
                    import ('../components/question/KnowlegeIndex')
            }, {
                path: '/ques/konw/pay',
                component: () =>
                    import ('../components/question/KonwPay')
            },
            // 提问首页
            {
                path: '/ques/konw/index',
                component: () =>
                    import ('../components/question/KnowIndex')
            },
            // 问题详情
            {
                path: '/ques/konw/index/detail',
                component: () =>
                    import ('../components/question/KonwDetail')
            }
        ]
    },
    // 资讯首页
    {
        path: '/bbsindex',
        component: BBSIndex

    },
    {
        path: '/infodetail',
        component: () =>
            import ('../components/bbs/InfoDetail')
    },
    {
        path: '/bbs/post',
        component: BBSpost,
        children: [{
            path: '/bbs/post/search',
            component: () =>
                import ('../components/bbs/SearchDetail')
        }]

    }, {
        path: '/bbs/detail',
        component: BBsDetail
    },
    // 提问首页
    // {
    //     path: '/konw/index',
    //     component: () =>
    //         import ('../components/question/KnowIndex')
    // },
    // 管理员登录
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
    },
    // 商城管理员
    {
        path: '/admin/shop',
        component: () =>
            import ('../components/admin/shop/ShopAdmin'),
        children: [{
                path: '/admin/shop/cata',
                component: () =>
                    import ('../components/admin/shop/Cata')
            },
            {
                path: '/admin/shop/milkcreate',
                component: () =>
                    import ('../components/admin/shop/ShopCreate')
            }, {
                path: '/admin/shop/diaperscreate',
                component: () =>
                    import ('../components/admin/shop/DiapersCreate')
            },
            {
                path: '/admin/shop/feedingcreate',
                component: () =>
                    import ('../components/admin/shop/FeedingCreate')
            },
            {
                path: '/admin/shop/foodcreate',
                component: () =>
                    import ('../components/admin/shop/FoodCreate')
            },
            {
                path: '/admin/shop/feedinglist',
                component: () =>
                    import ('../components/admin/shop/FeedingList')
            },
            {
                path: '/admin/shop/foodlist',
                component: () =>
                    import ('../components/admin/shop/FoodList')
            },

            {
                path: '/admin/shop/list',
                component: () =>
                    import ('../components/admin/shop/ShopList')
            },

            {
                path: '/admin/shop/diaperslist',
                component: () =>
                    import ('../components/admin/shop/DiapersList')
            },
            {
                path: '/admin/shop/brand',
                component: () =>
                    import ('../components/admin/shop/BrandCreate')
            },
            {
                path: '/admin/shop/dataview',
                component: () =>
                    import ('../components/admin/shop/DataCount')
            },
            {
                path: '/admin/shop/order',
                component: () =>
                    import ('../components/admin/shop/AdminAllOrder')
            }
        ]
    },
    // 主要管理员
    {
        path: '/admin/main',
        component: () =>
            import ('../components/admin/mainadmin/MainAdmin'),
        children: [

            {
                path: '/admin/main/circle',
                component: () =>
                    import ('../components/admin/mainadmin/BBsAdmin')
            },
            {
                path: '/admin/main/konw',
                component: () =>
                    import ('../components/admin/mainadmin/KonwAdmin'),
                children: [{
                    path: '/admin/main/konw/Search',
                    component: () =>
                        import ('../components/admin/mainadmin/SearchResult')
                }]
            },
            {
                path: '/admin/main/user',
                component: () =>
                    import ('../components/admin/mainadmin/UserAdmin')
            }, {
                path: '/admin/main/news',
                component: () =>
                    import ('../components/admin/mainadmin/News')
            }, {
                path: '/admin/main/ques',
                component: () =>
                    import ('../components/admin/mainadmin/QuesAdmin')
            }



        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router