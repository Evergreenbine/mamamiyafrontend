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
             <div class="age">{{age[speicialgood.age]}}</div>
             <div class="stage">{{stage[speicialgood.stage]}}</div>
             <el-button class="button" type="primary" @click="toShopCar(speicialgood)">加入购物车</el-button>
             <div></div>
         </div>
     </div>

     <div class="goodcomment max-width margin-auto" >
         <div class="commentbox" v-for="(item,index) in gcomment" :key="index">
             <div class="userbox">
                    <img :src="item.avator" alt="" class="av">
                    <p class="name">{{item.username}}</p>
             </div>
             <div class="commentbox">
                 <b-textarea rows="3"  readonly :placeholder="item.content"/>
                 <p class="time">{{item.createtime}}</p>
             </div>
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
            age:[
                
                 "0 - 6 个月"
              ,
                 
                 "6 - 12 个月"
              ,
                 
                 "12 - 24 个月"
              ,
                 
                 "24 - 36 个月"
              ],
               stage:[
          "1段",
          "2段",
          "3段",
          "4段",
          "5段",
      ],
    //  商品评论数组 
      gcomment:[]
        }
    },
    watch:{
        $router:function(val,oldval){
            alert(val)
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
        },
        goto(item){
                this.$router.push({
                    path:`/shop/milkbrand?bid=${item.bid}&gid=${item.gid}`
                })
                // 刷新一下就行了哈哈
                this.$router.go(0)
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

        let speicialgood = await axios.get(`/api/specificgood/${gid}`)
      
        console.log(speicialgood);
        this.speicialgood = speicialgood.data

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
        // 查询商品评论
        let respp= await axios({
            url:'/api/comment',
            method:'get',
            params:{
                gid:gid
            }
        })
        this.gcomment = respp.data


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
    margin-top: 30px;
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
    border-bottom: 1px solid gainsboro;
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
.goodcomment{
  
    height: auto;
    border-bottom: 1px solid gainsboro;
    .commentbox{
        width: inherit;
        height: 130px;
        position: relative;
        // border: 1px solid gainsboro;
        .userbox{
            position: absolute;
            width: 120px;
            height: 130px;
            // border: 1px solid yellow;
            left: 40px;
            .av{
                width: 82px;
                height: 82px;
                margin-top: 10px;
            }
            .name{
                margin-top: 6px;
                color: rgb(143, 143, 143);
            }
        }
        .commentbox{
            width: 900px;
            // height: 105px;
            position: absolute;
            right: 30px;
            top: 10px;
        }
        .time{
            position: absolute;
            color: rgb(143, 143, 143);
            right: 0;
        }

    }
}
</style>