<template>
  <div>
      <h1 class="tttile">{{konwpost.title}}</h1>
      <div v-html="konwpost.content">{{konwpost.content}}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            konwpost:{

            }
        }
    },
    async created(){
         let kid = this.$route.query.kid
         let isfree =this.$route.query.isfree
        //  alert(kid)
         const bbsaxios = this.$config.getAxiosInstance('bbs')

         //  查看是否是直接跳过来的
        let resp = await bbsaxios({
               url:"/api/konws/isfree",
               methods:"get",
               params:{
                   kid:kid,
                   useraccount:JSON.parse(localStorage.getItem("username"))
               }
        })

        if(resp.data == 1 || isfree){
            // 返回文章内容
            let res = await bbsaxios.get(`/api/konw/${kid}`)
            this.konwpost= res.data
            console.log(res);
        }else{
            this.$router.push({
                path:'/ques/konwIndex'
            })
        }

      


        
    }
}
</script>

<style lang="scss" scoped>
.tttile{
    margin-top: 20px;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
</style>