<template>
  <div class="bigbox max-width">
     
      <div v-for="item in article" :key="item.kid" >
         <a href="javascript:void(0);" @click="togoto(item)" v-show="cata == 1"> {{item.title}}</a>
         <a href="javascript:void(0);"  v-show="cata == 2"> {{item.title}}</a>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            article:[],
            cata:1
        }
    },
    methods:{
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
    },


    async created(){
        let title = this.$route.query.title
        let cata = this.$route.query.cata
        this.cata = cata
        const axisos = this.$config.getAxiosInstance('bbs')
        let res = await axisos({
            url:'/api/likequery',
            params:{
                title:title,
                cata:cata
            }
        })
        this.article = res.data
       
    }

}
</script>

<style lang="scss" scoped>
.bigbox{
    border-top: 1px solid gray;
}
</style>