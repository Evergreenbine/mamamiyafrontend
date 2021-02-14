<template>
  <div>
      <!-- 准备怀孕 -->
    <div id="one" class="max-width margin-auto konwbox position-re" :class="{activecc:org==1}">
        <p class="logo">准备怀孕</p>
        <p class="more" @click="moreshow(1)" >{{moretag}}</p>
        <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
            <div v-for="item in this.res" :key="item.kid" class="titleitem" >
                 <div><router-link :to="{path:'/ques/konw',query:{
                     kid:item.kid
                 }}" >{{item.title}}</router-link></div>
            </div>
        </div>     
    </div>
    <!-- 怀孕期 -->
    <div id="2" class="max-width margin-auto konwbox position-re" :class="{activecc:org==2}">
        <p class="logo">怀孕期</p>
         <p class="more" @click="moreshow(2)" >{{moretag}}</p>
        <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
            <div v-for="item in this.res" :key="item.kid" class="titleitem" >
                 <div><router-link :to="{path:'/ques/konw',query:{
                     kid:item.kid
                 }}" >{{item.title}}</router-link></div>
            </div>
        </div>     
    </div>
    <!-- 分娩必读 -->
    <div id="3" class="max-width margin-auto konwbox position-re" :class="{activecc:org==3}">
        <p class="logo">分娩必读</p>
       <p class="more" @click="moreshow(3)" >{{moretag}}</p>
        <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
            <div v-for="item in this.res" :key="item.kid" class="titleitem" >
                 <div><router-link :to="{path:'/ques/konw',query:{
                     kid:item.kid
                 }}" >{{item.title}}</router-link></div>
            </div>
        </div>     
    </div>
    <!-- 婴幼儿期 -->
    <div id="4" class="max-width margin-auto konwbox position-re" :class="{activecc:org==4}">
        <p class="logo">婴幼儿期</p>
       <p class="more" @click="moreshow(4)" >{{moretag}}</p>
        <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
            <div v-for="item in this.res" :key="item.kid" class="titleitem" >
                 <div><router-link :to="{path:'/ques/konw',query:{
                     kid:item.kid
                 }}" >{{item.title}}</router-link></div>
            </div>
        </div>     
    </div>
    <!-- 幼儿期 -->
    <div id="5" class="max-width margin-auto konwbox position-re" :class="{activecc:org==5}">
        <p class="logo">幼儿期</p>
        <p class="more" @click="moreshow(5)" >{{moretag}}</p>
        <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
            <div v-for="item in this.res" :key="item.kid" class="titleitem" >
                 <div><router-link :to="{path:'/ques/konw',query:{
                     kid:item.kid
                 }}" >{{item.title}}</router-link></div>
            </div>
        </div>     
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            res:'',
            // 控制变量
            org:0,
            moretag:"更多>>>"
        }
    },
    methods:{
        moreshow(id){

          this.org = this.org == 0 ? id : 0
          this.moretag = this.moretag == "更多>>>" ?"收起<<<":"更多>>>"
        }
    },
    async created() {
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios.get('/api/konws/0')
         this.res = res.data
    },

}
</script>

<style lang="scss" scoped>
.konwbox{
    margin-top: 25px;
    border: 2px solid #20c997;
    height: 350px;

    .logo{
        width: 150px;
        position: absolute;
        font-size: 25px;
        font-weight: 500;
        color: #20c997;;
        top: -20px;
        left: 10px;
        background-color: #fff;
        text-align: center;
    }
    .titleitem{
        margin-left: 32px;
        cursor: pointer;
        text-align: left;
        width: 500px;
        height: 35px;
        // border: 1px solid gainsboro;
        overflow: auto;
    }
    .more{
        position: absolute;
        right: 10px;
        font-size: 15px;
        color: rgb(194, 194, 194);
        cursor: pointer;
    }
}
.activecc{
    height:auto;
}
</style>