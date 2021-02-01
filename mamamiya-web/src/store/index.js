import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // var car = JSON.parse(localStorage.getItem('shopcar') || '[]')
export default new Vuex.Store({
    state: {
        user: {
            username: "",
            password: "",
            token: '',

        },
        // 昨晚就卡在这，现在才知道每次加载vuex 就会new一次草
        shopcar: JSON.parse(localStorage.getItem('shopcar') || '[]')
            // 必须是从本地缓存中拿,而不是创建car,不然前面存的car会被覆盖
            // shopset: localStorage.getItem("shopset")
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
        },
        increase(state, goods) {
            // console.log(goods);
            // 判断是否有重复的商品标志
            // alert(goods.store)
            // 将item数量+1 或 也可以直接将count设置为1也行
            goods.count++;
            var flag = false;

            state.shopcar.some(item => {
                if (item.id == goods.id) {
                    // 赋值给购物车里的item
                    item.count += parseInt(goods.count)
                    flag = true
                    return true
                }
            })

            if (!flag) {
                state.shopcar.push(goods)
            }
            console.log(state.shopcar);
            localStorage.setItem('shopcar', JSON.stringify(state.shopcar))
        }
        /** 购物车 */
        /** 遇到的难题 
         *  即好像每次进入一个组件页面,vuex里的shopset都会重新创建一个，这就导致我去其他组件拿的时候，又是拿到一个新的的set
         *  导致我无法拿到前面已经添加的购物车数量
         * 
         *  解决办法：
         *      将set存到本地缓存中去,第一如果没有则创建shopset存到本地缓存中去
         *      如果存在则拿出来用
         *     
         */
        // increase(state, playload) {
        //     // 假如是第一次操作购物车，这时本地缓存里没有则创建
        //     let shopset = this.state.shopset
        //         // console.log(shopset);
        //         // 商品的数量++
        //     let item = playload;
        //     item.count++;

        //     // 第一次创建
        //     if ("" == shopset || null == shopset) {
        //         let shop2 = new Set()
        //         shop2.add(item)
        //         let arr = Array.from(shop2)
        //         localStorage.setItem("shopset", JSON.stringify(arr))
        //     } else {
        //         let arr2 = JSON.parse(shopset)
        //         console.log(arr2);
        //         let shop3 = new Set(arr2)
        //         shop3.add(item)
        //         arr2 = Array.from(shop3)
        //         localStorage.setItem("shopset", JSON.stringify(arr2))
        //     }
        // // console.log(shopset);
        // if (' ' === shopset || null == shopset || "" === shopset) {
        //     console.log("if 块");
        //     // 第一次创建购物车
        //     let shopset = new Set()
        //     shopset.add(item)
        //     let arr = Array.from(shopset)
        //     localStorage.setItem("shopset", JSON.stringify(arr))
        // } else {
        //     console.log("else 块");
        //     let shop2 = localStorage.getItem("shopset")
        //         // console.log(shop2);
        //         // console.log(shopset instanceof string);
        //     let arr = JSON.parse(shop2)
        //     console.log(arr);
        //     let shopset3 = new Set(arr)
        //         // console.log(shopset);
        //     shopset3.add(item)
        //     localStorage.setItem("shopset", JSON.stringify(Array.from(shopset3)))

        // }

        // let arr = Array.from(shopset)
        // let shopsetstr = JSON.stringify(arr)
        // localStorage.setItem("shopcar", shopsetstr)
        // console.log(JSON.parse(shopsetstr));
        // localStorage.setItem('shopset', this.state.shopset)
        // console.log(this.state.shopset);

        // }
    },
    actions: {},
    modules: {}
})