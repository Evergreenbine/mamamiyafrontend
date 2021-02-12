<template>
  <div id="bbspost" >
      <TopBar/>
      <div class="mainbody  margin-auto d-flex ">
          <div class="mainleft">
              <div class="circle" v-for="item in circle" :key="item.cid" @click="getPostList(item.cid)">
                  {{item.cname}}
              </div>
          </div>
          <div class="mainright position-re " style="width:1200px">
          <!-- 整个圈子的右侧模板  -->
          <div class=" circlepost position-ab" v-for="item in circle" :key="item.cid" style="width:1200px"
          v-show="cid == item.cid"
          >
              <div class="circleinfo">{{item}}</div>
              <div class="post" v-for="item in cpost" :key="item.pid" @click="postDetail(item)" >
                 <router-link to="#" class="posttitle">{{item.title}}</router-link>
                 <router-link to="#" class="postauthor">{{item.author}}</router-link>
              </div>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import TopBar from '../TopBar'
export default {

    data() {
        return {
            // 圈子变量
            cid:'',
            circle:[],
            cpost:[]
        }
    },
    components:{
        TopBar
    },
    methods: {
       async getPostList(cid){
            this.cid = cid
            const bbsaxios = this.$config.getAxiosInstance('bbs')
            let res = await bbsaxios({
                url:'/api/posts',
                method:'get',
                params:{
                    cid:cid
                }
            })
            
            // console.log(res);
            this.cpost = res.data.result
        },
        async postDetail(item){
           
            this.$router.push({path:'/bbs/detail',query:{
                cid:this.cid,
                pid:item.pid,
                useraccount:item.useraccount
            }})
            console.log(res);
        }
    },
    async created(){
       let cid = this.cid = this.$route.query.cid
       const bbsaxios = this.$config.getAxiosInstance('bbs')
       let resp = await bbsaxios.get('/api/circle')
       let result = resp.data.result
       this.circle = result

       this.getPostList(cid)
    }

}
</script>

<style lang="scss" scoped>
.mainbody{
    // border: 1px solid greenyellow;
    height: 500pxs;
    .mainleft{
        width: 200px;
        .circle{
            height: 72px;
            border: 1px solid blue;
            cursor: pointer;
        }
    }
    .mainright{
        width: 1000px;
        margin-left: 70px;
        .circlepost{
            .circleinfo{
                width: inherit;
                height: 80px;
                // border: 1px solid greenyellow;
                margin-bottom: 35px;
            }
            .post{
                position: relative;
                height: 30px;
                // border: 1px solid yellow;
                width: inherit;
                .posttitle{
                    line-height: 30px;
                    position: absolute;
                    left: 10px;
                // float: left;
                }
                .postauthor{
                    position: absolute;
                    right: 10px;
                    color: gainsboro;
                    font-size: 5px;
                    line-height: 30px;
                }
                
            }
            
        }
        
    }

}
</style>

