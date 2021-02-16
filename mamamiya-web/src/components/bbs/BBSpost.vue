<template>
  <div id="bbspost" >
      <TopBar/>
      <p class="logo">mamamiya论坛</p>
      <div class="logobox">
         <!-- <p>mamamiya论坛</p> -->
         <div class="search"></div>
         </div>
      <div class="mainbody  margin-auto d-flex ">
          <div class="mainleft">
              <div class="circle position-re" v-for="item in circle" :key="item.cid" @click="getPostList(item.cid)">
                  <img class="ava" :src="item.avator"/>
                  <p class="cname"> {{item.cname}}</p>
                  <p class="follownums">{{item.follownums}}人关注</p>
                 
              </div>
          </div>
          <div class="mainright position-re " style="width:1200px">
          <!-- 整个圈子的右侧模板  -->
          <div class=" circlepost position-ab" v-for="item in circle" :key="item.cid" style="width:1200px"
          v-show="cid == item.cid"
          >   
            <!-- 圈子具体信息 -->
              <div class="circleinfo">
                  <img class="cimg" :src="item.avator" alt="">
                  <p class="ccname">{{item.cname}}</p>
                  <p class="ccintro">{{item.introduce}}</p>
                  <p class="follow">{{item.follownums}}人关注</p>
                  <p class="follow2">{{item.follownums}}人关注</p>
                  <!-- {{item}} -->
              </div>
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
.logo{
    font-size: 40px;
    position: absolute;
    left: 20px;
    margin-top: 10px;
    color: rgba(0, 132, 255, 0.411);
}
.logobox{
    position: relative;
    margin-top: 80px;
    height: 43px;
    background-color:rgba(0, 132, 255, 0.411);
    p{
        position: absolute;
    }
    .search{
        position: absolute;
        width: 500px;
        height: 33px;
        background-color: white;
        right: 20px;
        top: 5px;
    }
}
.mainbody{
    // border: 1px solid greenyellow;
    height: 500pxs;
    // 左侧圈子
    .mainleft{
        width: 200px;
        .circle{
            margin-top: 5px;
            margin-left: 10px;
            height: 72px;
            // border: 1px solid blue;
            border-bottom: 1px solid gainsboro;
            cursor: pointer;
            .ava{
                position: absolute;
                width: 62px;
                height: 62px;
                margin-top: 5px;
                left: 3px;
            }
            .cname{
                position: absolute;
                // border: 1px solid gainsboro;
                width: 100px;
                right: 15px;
                margin-top: 5px;
                color: rgb(151, 151, 151);
            }
            .follownums{
                position: absolute;
                right: 15px;
                bottom: 0px;
                width: 100px;
                color: rgb(151, 151, 151);
            }
            
            
        }
    }
    // 右侧
    .mainright{
        width: 1000px;
        margin-left: 70px;
        .circlepost{
            // 右侧圈子信息
            .circleinfo{
                width: inherit;
                height: 100px;
                border: 1px solid rgba(0, 132, 255, 0.411);
                margin-top: 5px;
                margin-bottom: 35px;
                .cimg{
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    left: 10px;
                    margin-top: 10px;
                }
                .ccname{
                    // border: 1px solid ghostwhite;
                    margin-top: 5px;
                    // position: absolute;
                    // left: 90px ;
                }
                .ccintro{
                    // width: 1000px;
                    top: 40px;
                    // border: 1px solid gainsboro;
                    position: absolute;
                    left: 100px;
                    text-align: left;
                     color:#979797;
                     margin-bottom: 10px;
                }
                .follow{
                    display: inline;
                    width: 100px;
                    // position: absolute;
                    // left: 100px;
                    text-align: left;
                    // bottom: 25px;
                    color:#979797;
                    // border: 1px solid gainsboro;
                    margin-left: 100px;
                    margin-top: 40px;
                }
                .follow2{
                    width: 100px;
                    // position: absolute;
                    // left: 100px;
                    text-align: left;
                    // bottom: 25px;
                    color:#979797;
                    // border: 1px solid gainsboro;
                    margin-left: 200px;
                    margin-top: 40px;
                }
            }
            

            // 贴子列表
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

