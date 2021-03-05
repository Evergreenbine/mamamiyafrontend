<template>
  <div>
      <div class="bigbox max-width margin-auto">
          <div class="barnav">
            <div class="barnavitem" :class="{avbar:page == 0}" @click="nopay(0,-1)">全部订单</div>
            <div class="barnavitem" :class="{avbar:page == 1}" @click="nopay(1,1)">未支付</div>
            <div class="barnavitem" :class="{avbar:page == 2}" @click="nopay(2,3)">待发货</div>
            <div class="barnavitem" :class="{avbar:page == 3}" @click="page = 3">待收货</div>
            <div class="barnavitem" :class="{avbar:page == 4}" @click="nopay(4,7)">交易完成</div>
          </div>
      </div>
    <!-- 外面导航对应的大框 -->
      <div v-for="(item,i) in 5" :key="i" v-show="page == i" class="bigbigbox max-width margin-auto" >
          <!-- 里面的订单框 -->
          <div class="orderbox" v-for="(oditem,j) in od" :key="j">
              <!-- 订单信息 -->
              <div class="orderinfo">
                  <p class="orderid">订单编号:{{oditem.orderid}}</p>
                  <p class="ostate">{{oditem.orname}}</p>
                  <p class="ctime">创建时间:{{oditem.createtime}}</p>
              </div>
              <!-- 订单详情信息 -->
              <div class="odditem" v-for="(odditem,k) in odd[j]" :key="k">
                  <img :src="odditem.img" alt="">
                  <p class="recommond">{{odditem.recommend}}</p>
                  <p class="gname">{{odditem.gname}}</p>
                  <p class="price">单价:{{odditem.price}}元</p>
                  <p class="nums">数量:{{odditem.nums}}</p>
                  
              </div>
              <!-- 买家 （2->3已支付， 3->4待发货， 4->5已发货） ->   5->8确认收货 -> 6关闭 -->
              <!-- 商家 2 3  确认发货 -> 4   8 -> 同意退货  -->
              <div class="tailinfo">
                  <p class="address">收货地址:{{oditem.address}}</p>
                  <p class="totalmount">总价:{{oditem.totalmount}}元</p>
                  <p class="paymoney">{{oditem.paymoney != null ? "实际支付:"+oditem.paymoney+"元":"实际支付:0元" }}</p>
                  <div class="cancel" @click="cancelorder(oditem)" v-show="oditem.state == 8">同意退货</div>
                  <div class="okbutton" @click="updatestate(4,oditem)" v-show="oditem.state == 3 || oditem.state == 2">发货</div>
                  
              </div>
          </div>

      </div>

      
  </div>
</template>

<script>
export default {
 data() {
     return {
        //  页面变量
        page:0,
        // 用户变量
        useraccount:'',
        // 订单变量
        od:[],
        odd:[]
     }
 },
 methods: {
    //  继续支付
     async continuepay(order){

             const axios = this.$config.getAxiosInstance('shop')
             let res = await axios({
                 url:'/api/continuepay',
                 method:'post',
                 data:{
                     order:order
                 },
                 params:{
                     order:order,
                     useraccount:this.useraccount
                 }
             })

             if(res.data == 1){
                 aler("支付成功")
                 this.$router.go(0)
             }else{
                 alert("支付失败")
             }
            //  alert(res.data)
         
     },
     async cancelorder(order){
          const axios = this.$config.getAxiosInstance('shop')
            let res = await axios({
                url:'/api/cancelorder',
                method:'get',
                params:{
                    orderid:order.orderid,
                }
            })
     },
    //  更新订单状态
      async updatestate(expected,order){
        //    如果支付成功，则将状态改为代发货
           
            const axios = this.$config.getAxiosInstance('shop')
            let res = await axios({
                url:'/api/updateorder',
                method:'get',
                params:{
                    orderid:order.orderid,
                    state:expected
                }
            })

            
            this.$router.go(0)
        },
    async checkall(){
         this.page = 0
         const axios = this.$config.getAxiosInstance('shop')
         let res = await axios({
             url:'/api/allorder',
             method:'get',
             params:{
                 useraccount:this.useraccount
             }
         })
         this.od = res.data.od;
         this.odd  = res.data.odd
     },
    //  未支付
    async nopay(pagenums,expect){
        if(expect == -1){
            expect = null
        }
        this.page = pagenums
        const axios = this.$config.getAxiosInstance('shop')
         let res = await axios({
             url:'/api/allorder',
             method:'get',
             params:{
                 useraccount:this.useraccount,
                 state:expect
             }
         })
         this.od = res.data.od;
         this.odd  = res.data.odd
    }
 },
 created(){
    // let useraccount = JSON.parse(localStorage.getItem("username"))
    // if(useraccount == null){
    //     this.$router.push("/new/login")
    // }
    // this.useraccount = useraccount
    this.checkall()

 }
}
</script>

<style lang="scss" scoped>
.barnav{
    width: inherit;
    height: 30px;
    .barnavitem{
        width: 100px;
        height: 30px;
        float: left;
        cursor: pointer;
    }
    .avbar{
        border-bottom: 1px solid gainsboro;
    }
    margin-bottom: 20px;

}

.bigbigbox{
    clear: both;
    // border: 1px solid gainsboro;
    height: auto;
    margin-bottom: 100px;

    // 订单信息盒子
    .orderbox{
        width: 1100px;
        height: auto;
        border: 1px solid gainsboro;
        margin-bottom: 10px;
    // 顶部信息盒子
        .orderinfo{
            width: inherit;
            height: 50px;
            position: relative;
            .orderid{
                position: absolute;
                left: 0;
                color:gray;
            }
            .ostate{
                position: absolute;
                right: 10px;
                color: red;
            }
            .ctime{
                position: absolute;
                left: 0;
                color: gray;
                top: 20px;
            }


        }
        // 订单详情信息
        .odditem{
            width: inherit;
            height: 100px;
            border-top: 1px solid gainsboro;
            
            position: relative;
            img{
                position: absolute;
                width: 82px;
                height: 82px;
                left: 9px;
                top: 9px;
            }
            .price{
                position: absolute;
                right: 10px;
                color: red;
                top: 9px;
            }
            .recommond{
                position: absolute;
                left: 100px;
                top: 9px;
                color: gray;
            }
            .gname{
                position: absolute;
                left: 100px;
                top: 30px;
                color: gray;
            }
            .nums{
                 position: absolute;
                left: 100px;
                top: 50px;
                color: gray;
            }
        }

        // 尾部信息
        .tailinfo{
            width: inherit;
            height: 100px;
            border-top: 1px solid gainsboro;
            position: relative;
            .address{
                position: absolute;
                top: 9px;
                color: gray;
                left: 10px;
            }
            .totalmount{
                position: absolute;
                right: 0;
                color: gray;
                right: 10px;
            }
            .paymoney{
                position: absolute;
                right: 0;
                color: gray;
                right: 10px;
                top: 30px;
            }
            .okbutton{
            position: absolute;
            width: 100px;
            height: 35px;
            line-height: 35px;
            color: white;
            top: 60px;
            right: 10px;
            border: 1px solid red;
            background-color: red;
            cursor: pointer;
        
        }
        .cancel{
             position: absolute;
            width: 100px;
            height: 35px;
            line-height: 35px;
            color: white;
            top: 60px;
            right: 130px;
            border: 1px solid red;
            background-color: red;
            cursor: pointer;
        }
            
        }
    }
}
</style>