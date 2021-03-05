<template>
  <div>
      <div class="bigbigbox max-width margin-auto">

          <div class="maxbox max-width " >
              <div class="d-flex">
                <div class="goodbox " v-for="(item,index) in goodarr" :key="index">
                    <img :src="item.img" alt="">
                    <p class="price">价格:{{item.price}} </p>
                    <p class="gname">{{item.gname}}</p>
                    <div class="buy" @click="toShopCar(item)">加入购物车</div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            goodarr:[]
        }
    },
    methods:{
        toShopCar(item){
                    console.log(item);
                    // 拼接购物车item
                    var goods = {
                      gid:item.gid,
                      price:item.price,
                      count:0,
                      img:item.img,
                      rec:item.recommend,
                      store:item.store
                    }

                     console.log(goods);

                     // 丢到vuex
                     this.$store.commit('increase',goods)

                     // console.log(goods);
                     // // this.$store.commit('increase',item)
                     // console.log(this.shopcar);
        }
    },
    async created(){
          const axios = this.$config. getAxiosInstance('shop')
         let gname = this.$route.query.gname
         let bid = this.$route.query.bid
         console.log(bid);
         if(bid != undefined){
             let res = await axios({
                 url:'/api/likequerygood',
                 method:'get',
                 params:{
                     bid:bid
                 }
             })
             this.goodarr = res.data
         }
         console.log(this.goodarr);
       

    }
}
</script>

<style lang="scss" scoped>
.bigbigbox{
    .maxbox{
      
        height: 500px;
        // border: 1px solid gray;
        .goodbox{
            margin-left: 20px;
            width: 240px;
            height: 380px;
            border: 1px solid gainsboro;
            img{
               width: 200px;
               height: 230px;
               margin-top: 10px;
            }
            .price{
                margin-top: 20px;
                text-align: left;
                color: red;
                margin-left: 10px;
            }
            .gname{
                text-align: left;
                margin-left: 10px;
               
            }
            .buy{
                width: 100px;
                height: 30px;
                // border: 1px solid gainsboro;
                margin-left: 10px;
                line-height: 30px;
                background: red;
                color: white;
                cursor: pointer;
            }
        }
    }
}
</style>