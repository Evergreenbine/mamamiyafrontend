<template>
  <div>
      <!-- 顶部导航栏 -->
      <div class="bigbox max-width margin-auto d-flex flex-wrap">
        <div class="qcataitem " v-for="(item,index) in this.quescata" :key="index" @click="gotototo(item,index)">
            <router-link :to="'#one'">{{item.qname}}</router-link>
        </div>
      </div>

      <!-- 问题列表 -->
      <div class="bigbigbox max-width" >
          <!-- 第一页 -->
          <div id="one" v-show="this.showindex == 0" class="max-width catalist">
              <div v-for="(item,index) in this.res" :key="index">
                    <div class="boxes max-width position-re">
                        <div class="btitle">
                            <router-link :to="{path:'/ques/konw/index/detail',query:{qid:item.qid}}">{{item.title}}</router-link></div>
                        <div class="bauthor">{{item.username}}</div>
                        <div class="btime">{{item.createtime}}</div>
                    </div>
             </div>
          </div>
          <!-- 第二页 -->
          <div id="two" v-show="this.showindex == 1" class="max-width catalist">
                <div v-for="(item,index) in this.res" :key="index">
                    <div class="boxes max-width position-re">
                        <div class="btitle"><router-link :to="'/'">{{item.title}}</router-link></div>
                        <div class="bauthor">{{item.username}}</div>
                        <div class="btime">{{item.createtime}}</div>
                    </div>
                </div>
          </div>
         <!-- 第三页 -->
          <div id="two" v-show="this.showindex == 2" class="max-width catalist">
              
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 控制页面显示的变量
            showindex:0,
            quescata:'',
            res:''
        }
    },
    methods:{
        async gotototo(item,index){
            this.showindex = index

            const bbsaxios = this.$config.getAxiosInstance('bbs')
            let quescata = await bbsaxios.get("/api/ques/all")
            this.quescata = quescata.data

            let qcid = item.qcid;
            let queryques = await bbsaxios.get(`/api/ques/${qcid}`)

            this.res = queryques.data


        }
    },
    async created(){
        const bbsaxios = this.$config.getAxiosInstance('bbs')
        let quescata = await bbsaxios.get("/api/ques/all")
        this.quescata = quescata.data

        let qcid = 1;
        let queryques = await bbsaxios.get(`/api/ques/${qcid}`)

        this.res = queryques.data
    }
}
</script>

<style lang="scss" scoped>
.bigbox{
    margin-top: 20px;
    // height: 150px;
    // border: 1px solid greenyellow;
}
.qcataitem{
    width: 220px;
    height: 40px;
    background-color: rgba(65, 201, 144, 0.747);
    border-right: 1px solid ghostwhite;
    line-height: 45px;
    border-bottom: 1px solid snow;
    line-height: 40px;
    color: white;
    a{
        color: white;
    }
}
.bigbigbox{
    margin-top: 20px;
    height: 500px;
    border: 1px gainsboro solid;
}
.catalist{
    height: 500px;
}
.boxes{
    height: 30px;
    border-bottom: 1px solid gainsboro;
    .btitle{
        position: absolute;
        left: 10px;
        line-height: 30px;
    }
    .btime{
        color: gainsboro;
        right: 100px;
        line-height: 30px;
        position: absolute;
    }
    .bauthor{
        position: absolute;
        right: 10px;
        line-height: 30px;
        color: gainsboro;
    }
}
</style>