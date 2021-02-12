<template>
   <div class="highnav">
      <div class="goo" @click="index('')">mamamiya</div>
      <div v-for="item in this.headerbar" :key="item.tid" @click="index(item.tid)">
          {{item.tname}}
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
              headerbar:[{tid:'shop',
                        tname:'商城'},{
                        tid:'bbsindex' ,
                        tname:'论坛'   
                        },{
                        tid:'',
                        tname:"资讯"        
                        }]
        }
    },
    methods:{
         index(id){
            this.$router.push(`/${id}`)
        }
    }

}
</script>

<style lang="scss" scoped>
  .highnav{
        
        height: 35px;
        // border: 1px solid gold;
        background-color: rgb(247, 244, 244);
        .goo{
            width: 400px;
        }
        div{
            margin: 0;
            width: 200px;
            height: 35px;
            float: left;
            text-decoration: none;
            line-height: 35px;
            font-size: 15px;
            color: rgb(179, 179, 179);
            cursor: pointer;
        }
    }
</style>