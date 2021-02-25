<template>
  <div>
      <h1 class="tttile">
          {{konwpost.title}}
          
      </h1>
      <div v-html="konwpost.content" class="contentbox max-width margin-auto">{{konwpost.content}}</div>
       <h6  :class="{ach6:isuse == 1 }"  @click="gooduse">有用({{looknums}})</h6>
  </div>
</template>

<script>
export default {
    data() {
        return {
            konwpost:{

            },
            isuse:0,
            looknums:0
        }
    },
    methods:{
        async gooduse(){
              const bbsaxios = this.$config.getAxiosInstance('bbs')
             let res = await bbsaxios({
                  url:'/api/thinkuse',
                  method:'get',
                  params:{
                      useraccount:JSON.parse(localStorage.getItem("username")),
                      kid:this.$route.query.kid
                  }
              })
              if(res.data == 1){
                //   alert("认为有用成功")
                this.$router.go(0)
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
            // 插入浏览记录表

            let resp = await bbsaxios.get(`/api/lookup/${kid}`)

            // 返回文章内容
            let res = await bbsaxios.get(`/api/konw/${kid}`)
            this.konwpost= res.data
            console.log(res);
        }else{
            this.$router.push({
                path:'/ques/konwIndex'
            })
        }

        // 查看该浏览用户认为这文章是否有用
        let resa = await bbsaxios({
                  url:'/api/isuse',
                  method:'get',
                  params:{
                      useraccount:JSON.parse(localStorage.getItem("username")),
                      kid:this.$route.query.kid
                  }
        })
        this.isuse = resa.data.isuse
        this.looknums = resa.data.count
        console.log(resa);
      


        
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
.contentbox{
    margin-bottom: 100px;
    border-bottom: 1px sol gainsboro;
}
h6{
    width: inherit;
    text-align: right;
    margin-bottom: 100px;
    cursor: pointer;
}
.ach6{
    color: red;
}
</style>