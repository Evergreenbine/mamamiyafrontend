<template>
  <div id="shop" class="max-width margin-auto">
      <div class="left">
          <p>热门品牌</p>
          <div class="brandbigbox">
               <div class="brandbox" v-for="item in brandarr" :key="item" >
                   <img :src="item.img" alt="" @click="tosearch(item.bid)">
               </div>
          </div>
         
         
      </div>
      <div class="rightbox">
          <p class="okk">知识导读</p>
       <div class="right">
           
             <div v-for="item in konwarr" :key="item.kid">
                <p class="title" @click="togoto(item)"> {{ item.title }}</p>
             </div>
          </div>
      <div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
    name:'shop',
    data() {
        return {
            brandarr:[],
            konwarr:[]
        }
    },
    
    async created() {
       const axios = this.$config.getAxiosInstance('shop')
       let res = await axios.get('/api/sellgoodbrandindex')
       this.brandarr = res.data

       const saxios = this.$config.getAxiosInstance("bbs")
       let resa = await saxios.get("/api/queryIndexKonw")
       this.konwarr = resa.data

    },
    methods:{
        tosearch(bid){
            // alert(bid)
        this.$router.push({path:'/shop/search',query:{
        bid:bid
      }})
    },
        async togoto(item){
           
            // 获取账户名

           
            // 这个判断是否免费必须请求后端的，因为有些文章虽然收费，但有些用户是买了的
           const bbsaxios = this.$config.getAxiosInstance('bbs')
           let res = await bbsaxios({
               url:"/api/konws/isfree",
               methods:"get",
               params:{
                   kid:item.kid,
                   useraccount:JSON.parse(localStorage.getItem("username"))
               }
                })
              
             //    付过费的或者本身就是免费的，就可以跳转
                if(res.data == 1 || item.isfree == 1){
                    this.$router.push({path:'/ques/konw',query:{
                          kid:item.kid,
                          isfree:item.isfree
                    }})
                }else{
                    // this.gotobuy(item)
                    this.$router.push({path:"/ques/konw/pay",query:{
                       kid:item.kid,
                       price:item.price
                    }})

                     //    提示去付费
                    //  this.dialogVisible = true;
                }
        }
    }
   
}
</script>

<style lang="scss" scoped>

#shop{
    margin-top: 20px;
    height: 300px;
    // border: 1px solid blue;
    margin-bottom: 200px;
   
    .left{
        float: left;
        width: 400px;
        height: inherit;
        border: 1px solid rgba(0, 162, 255, 0.247);
        p{  
            margin: 0;
            padding: 0;
            margin-top: 5px;
            color: pink;
            font-size: 25px;

        }
        .brandbigbox{
             display: flex;
             flex-wrap: wrap;
            .brandbox{
                width: 120px;
                height: 52px;
                // border: 1px solid gainsboro;
                margin-top: 9px;
                margin-left: 9px;
                cursor: pointer;
                img{
                    width: 118px;
                    height: 50px;
                }
            }
        }
      
    }
    .okk{
       
        color: gainsboro;
    }
    .right{
        float: right;
        width: 700px;
        height: inherit;
        // border: 1px solid gainsboro;
         display: flex;
           flex-wrap: wrap;
            flex-direction: row;
        .title{
            width: 320px;
            height: 30px;
            // border: 1px solid gray;
            margin-left: 20px;
           overflow: hidden;
            cursor: pointer;
        }
        .title:hover{
            color: rgba(0, 162, 255, 0.247);
        }
    }
}
</style>