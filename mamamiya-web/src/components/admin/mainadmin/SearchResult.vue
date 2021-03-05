<template>
  <div class="bigbox max-width">
     
      <div v-for="item in article" :key="item.kid" >
         <a href="javascript:void(0);" @click="togoto(item)" v-show="cata == 1"> {{item.title}}</a>
         <a href="javascript:void(0);"  v-show="cata == 2"> {{item.title}}</a>
      </div>

      <div>
          <div v-html="konwpost.content"></div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            article:[],
            cata:1,
            konwpost:''
        }
    },
    methods:{
     async  togoto(item){
           const bbsaxisos = this.$config.getAxiosInstance('bbs')
          let kid = item.kid
          let res = await bbsaxisos.get(`/api/konw/${kid}`)
          this.konwpost= res.data
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