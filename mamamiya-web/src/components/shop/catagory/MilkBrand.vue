<template>
  <div>
      <!-- {{speicialgood}} -->
     <div class="brandlogobox">
         <div class="midbox max-width margin-auto d-flex">
            <div class="brandlogo">{{this.bname}}</div>
         </div>
     </div>
     <div class="midbox2 max-width margin-auto d-flex">
         <div class="leftbox">
             <img class="goodsimg" :src="speicialgood.img" />
         </div>
         <div class="rightbox position-re">
             <div class="ttile">{{speicialgood.recommend}}</div>
             <div class="rate"></div>
             <div class="price position-ab">价格:{{speicialgood.price}}</div>
             <div class="cata">{{cataarr[speicialgood.cata]}}</div>
             <div class="age">{{age[speicialgood.age].value}}</div>
             <div class="stage">{{stage[speicialgood.stage].sname}}</div>
             <el-button class="button" type="primary" @click="toShopCar(speicialgood)">加入购物车</el-button>
             <div></div>
         </div>
     </div>
     <div class="max-width margin-auto morelogo">
        更多商品
     </div>
     <div class="midbox3 max-width margin-auto d-flex">
         <div class="shopitem position-re" v-for="(item,index) in bidshop" :key="index" @click="goto(item)">
             <img :src="item.img" alt="" class="shopimg">
             <p class="title">{{item.gname}}</p>
         </div>
     </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            bname:'',
            speicialgood:'',
            //根据bid查询所有商品
            bidshop:[],
            cataarr:['羊奶粉','婴幼儿奶粉','防腹泻奶粉'],
            age:[{
                aid:0,
                  value:"0 - 6 个月"
              },{
                  aid:1,
                  value:"6 - 12 个月"
              },{
                  aid:2,
                  value:"12 - 24 个月"
              },{
                  aid:3,
                  value:"24 - 36 个月"
              }],
               stage:[
          {sid:0,sname:"1段"},
          {sid:1,sname:"2段"},
          {sid:2,sname:"3段"},
          {sid:3,sname:"4段"},
          {sid:4,sname:"5段"},
      ],
        }
    },
    methods:{
        toShopCar(item){
                    console.log(item);
                    // 拼接购物车item
                    var goods = {
                      id:item.gid,
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
        },
        goto(item){
                this.$router.push({
                    path:'/shop/milkbrand',
                    query:{
                        bid:item.bid,
                        gid:item.gid
                    }
                })
            }
        },

    async created(){
        // 根据bid查询特定的品牌
         let bid = this.$route.query.bid
         const axios = this.$config. getAxiosInstance('shop')
         let res = await axios.get(`/api/brands/${bid}`)
         this.bname = res.data.bname
        
        // 根据gid查询特定的商品
        let gid = this.$route.query.gid

        let speicialgood = await axios({
            url:'/api/milk',
            method:'get',
            params:{
                gid:gid
            }
        })
        console.log(speicialgood);
        this.speicialgood = speicialgood.data.result[0]

        // 根据bid查询所有商品

        let bidshop= await axios({
            url:'/api/milk',
            method:'get',
            params:{
                bid:bid
            }
        })
        this.bidshop = bidshop.data.result
        //把当前的已经展示的gid商品给删了
        for(var j = 0;j<this.bidshop.length;j++){
            if(this.bidshop[j].gid == gid){
                this.bidshop.splice(j,1)
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.brandlogobox{
    width: inherit;
    height: 50px;
    background-color: pink;
    .midbox{
        
    }
    .brandlogo{
        font-size:30px;
        color: white;
    }
}
.midbox2{
    height: 500px;
    // border: 1px solid greenyellow;
}
.midbox3{
    cursor: pointer;
}
.leftbox{
    width: 350px;height: 350px;
    // border: 1px solid grey;
}
.rightbox{
    width: 750px;
    height: 350px;
    // border: 1px solid gainsboro;
    .price{
        text-align: left;
        left: 0;
    }
    .cata{
        position: absolute;
        top: 130px;
    }
    .button{
        position: absolute;
        bottom: 10px;
        right: 50px;       
    }
    .age{
        position: absolute;
        top:130px ;
        left: 100px;
    }
    .stage{
        position: absolute;
        top: 130px;
        left: 200px;
    }
}
.goodsimg{
    width: 350px;
    height: 350px;
}
// 標題
.ttile{
    width: 750px;
    height: 35px;
    font-size: 25px;
    text-align: left;
}
.price{
    width:200px;
    height: 35px;
    color: red;
    // border: 1px solid rebeccapurple;
    right: 0;
    font-size: 35px;
    position: absolute;
    top: 50px;
}
.rate{
    width: 200px;
    height: 35px;

}
.morelogo{
    height: 45px;
    // background-color: aqua;
    text-align: left;
    color: white;
    font-size: 23px;
    color: gold;
}
.shopitem{
    width: 240px;
    height: 300px;
    border: 1px solid gainsboro;
    margin-bottom: 20px;
    .shopimg{
        position: absolute;
        width: 220px;
        height: 220px;
        top: 10px;
        left: 10px;
    }
    .title{
        position: absolute;
        top: 250px;
        left: 10px;
    }
}
</style>