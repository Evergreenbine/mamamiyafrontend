<template>
  <div>
    <div class="bigbigbox max-width margin-auto">
        <h4>{{order.orname}}</h4>
        <div class="orderbox">
            <div class="head">
                <p class="orid">订单编号:{{order.orderid}}</p>
                <p class="time">创建时间:{{order.createtime}}</p>
                <!-- <p class="state">{{order.state}}</p> -->
            </div>
            <div class="goodbox" v-for="(item,index) in orderdetail" :key="index">
                <img :src="item.img" alt="">
                <p class="gname">商品名:{{item.gname}}</p>
                <p class="gnums">数量:{{item.nums}}</p>
                <p class="gprice">商品价格：{{item.price}}</p>
            </div>
        </div>
    </div>
    <div class="otherinfo max-width margin-auto">
        <div class="rightbox">
          <p class="position-ab tomount">总金额:{{order.totalmount}}</p>
          <p class="position-ab tonums">总数量:{{order.totalnums}}</p>
          <p class="position-ab paymoney">支付金额:{{order.monney}}</p>
          <p class="position-ab payman">支付人:{{order.username}}</p>
          <p class="position-ab address">收获地址:{{order.address}}</p>
          <div class="position-ab okbutton" @click="updatestate">确认</div>
        </div>
    </div>
    <!-- {{orderdetail}} -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            order:'',
            orderdetail:[]
        }
    },
    methods:{
        async updatestate(){
        //    如果支付成功，则将状态改为代发货
            if(this.order.state  == 2){
                  const axios = this.$config.getAxiosInstance('shop')
                  let res = await axios({
                      url:'/api/updateorder',
                      method:'get',
                      params:{
                          orderid:this.order.orderid,
                          state:3
                      }
                  })

            }
            this.$router.push("/shop/orderall")
        }
    },
 async created(){
        // 查询支付情况
        let orderid = this.$route.query.orderid
        // console.log(orderid);
        const axios = this.$config.getAxiosInstance('shop')
        let res = await axios({
            url:'/api/lookorder',
            method:'get',
            params:{
                orderid:orderid
            }})
        console.log("tamd ");
        console.log(res.data);
        this.order = res.data.orderinfo
        this.orderdetail = res.data.orderdetail
 },
 async checkpurchaseinfo(){

 }
}
</script>

<style lang="scss" scoped>
.bigbigbox{
    // border:1px solid gainsboro;
    height: auto;
    border-bottom: 1px solid gainsboro;
    // margin-bottom: 500px;
    h4{
        color: red;
    }
    .orderbox{
        width: inherit;
        height: auto;
        // border: 1px solid black;
    
        .head{
            width: inherit;
            height: 40px;
            position: relative;
            .orid{
                position: absolute;
                left: 0;
                color: gray;
            }
            .time{
                color: gray;
                position: absolute;
                left: 0;
                top: 20px;
            }
            margin-bottom: 10px;
          
        }

        .goodbox{
            width: inherit;
            height: 100px;
            border: 1px solid gainsboro;
            border-bottom: none;
            position: relative;
            img{
                position: absolute;
                width: 82px;
                height: 82px;
                left: 10px;
            }
            .gname{
                color: gray;
                position: absolute;
                left: 120px;
                top: 8px;
            }
            .gnums{
                position:absolute;
                left:120px;
                top: 30px;
                color: gray;
            }
            .gprice{
             position: absolute;
             left: 120px;
             top:50px;
             color:gray;
            }
        }
    }
    
}
.otherinfo{
    margin-top: 10px;
    height: 130px;
    margin-bottom: 100px;
    // border: 1px solid gainsboro;
    position: relative;
    .rightbox{
        width: 300px;
        height: inherit;
        // border: 1px solid black;
        right: 0;
        position: absolute;
        .tomount{
           color: gray; 
        }
        .tonums{
            color: gray;
            top:20px
        }
        .paymoney{
            top: 40px;
            color: red;
        }
        .payman{
            color: gray;
            top: 60px;
        }
        .address{
            top: 80px;
            color: gray;
        }
        .okbutton{
            position: absolute;
            width: 100px;
            height: 35px;
            line-height: 35px;
            color: white;
            top: 120px;
            border: 1px solid red;
            background-color: red;
            cursor: pointer;
        }
    }

}
</style>