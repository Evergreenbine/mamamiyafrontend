<template>
  <div id="bbspost" >
      <TopBar/>
      <p class="logo" >mamamiya论坛</p>
      <div class="logobox">
         <!-- <p>mamamiya论坛</p> -->
         <div class="search">
            <el-input placeholder="请输入贴子标题" v-model="title" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="goto"></el-button>
            </el-input>
         </div>
      </div>
      <div v-show="page == 1">
        <div class="mainbody  margin-auto d-flex " >
          <!-- 左侧圈子 -->
          <div class="mainleft">
              <div class="circle position-re" v-for="item in circle" :key="item.cid" @click="getPostList(item.cid)">
                  <img class="ava" :src="item.avator"/>
                  <p class="cname"> {{item.cname}}</p>
                  <p class="follownums">{{item.follownums}}人关注</p>
                 
              </div>
          </div>
           <!-- 整个圈子的右侧模板  -->
          <div class="mainright position-re " style="width:1200px">
         <!-- 右侧大模板 -->
          <div class=" circlepost position-ab" v-for="item in circle" :key="item.cid" style="width:1200px"
          v-show="cid == item.cid"
          >   
            <!-- 圈子具体信息 -->
              <div class="circleinfo">
                  <img class="cimg" :src="item.avator" alt="">
                  <p class="ccname">{{item.cname}}</p>
                  <p class="ccintro">{{item.introduce}}</p>
                  <p class="follow">{{item.follownums}}人关注</p>
                  <p class="follow2" @click="focus(item.cid)">{{ isfollow == 1 ?"已":"点击"}}关注</p>
                  <!-- {{item}} -->
              </div>
              <!-- 贴子-->
              <div class="postbox">
                <div class="post" v-for="item in cpost" :key="item.pid" @click="postDetail(item)" >
                   <router-link to="#" class="posttitle">{{item.title}}</router-link>
                   <router-link to="#" class="postauthor">发布人:{{item.author}}</router-link>
                   <router-link to="#" class="posttime">发布时间:{{item.time}}</router-link>
                </div>
              </div>
          </div>
          </div>
        </div>
     </div>

    <div v-show="page == 2">
       <div class="bigbox">
        <div v-for="(item,index) in cpost" :key="index">
           <p class="posttitle" @click="postDetail(item)"> {{item.title}}</p>
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
            // 页面变量
            page:1,
            // 圈子变量
            cid:1,
            // 关注变量
            isfollow:0,
            // 圈子列表
            circle:[],
            // 贴子列表
            cpost:[],
            title:''
        }
    },
    components:{
        TopBar
    },
    methods: {
        async goto(){
            this.page = 2
            // this.$router.push({
            //     path:'/bbs/post/search'
            // })
            const bbsaxios = this.$config.getAxiosInstance('bbs')
            let res = await bbsaxios({
                url:'/api/likeposttile',
                method:'get',
                params:{
                    title:this.title
                }
            })

            this.cpost = res.data
            
        },

        // 根据cid获取贴子列表
       async getPostList(cid){
        //    根据cid查询贴子列表
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

            // 根据cid 和 useraccount 查询是否关注

             let res2 = await bbsaxios({
                url:'/api/isfollow',
                method:'get',
                params:{
                    cid:cid,
                    useraccount:JSON.parse(localStorage.getItem("username"))
                }
            })
            this.isfollow = res2.data
        },
        // 查询贴子详细信息
        async postDetail(item){
           
            this.$router.push({path:'/bbs/detail',query:{
                cid:this.cid,
                pid:item.pid,
                useraccount:item.useraccount
            }})
            // console.log(res);
        },
        // 点击关注
        async focus(cid){
            // 获取当前的 用户账号
            let useraccount = JSON.parse(localStorage.getItem("username"))
            const bbsaxios = this.$config.getAxiosInstance('bbs')
            if(this.isfollow == 0){
                // 如果还没关注
                let res = await bbsaxios({
                    url:'/api/followcircle',
                    methods:'get',
                    params:{
                        cid:cid,
                        useraccount:useraccount
                    }
                })
                if(res.data == 1){
                    alert("关注成功")
                    this.isfollow  = 1
                    // 刷新关注人数
                    this.$router.go(0)
                }
            }else{
                // 如果已经关注
                let res = await bbsaxios({
                    url:'/api/nofollow',
                    methods:'get',
                    params:{
                        cid:cid,
                        useraccount:useraccount
                    }
                })
                if(res.data == 1){
                    alert("已取消关注")
                    this.isfollow  = 0
                    this.$router.go(0)
                }

            }

            // alert(useraccount)
        }
    },
    mounted(){
       
    },
    async created(){
        // 进入页面时默认是第一个圈子
       let cid = 1
       const bbsaxios = this.$config.getAxiosInstance('bbs')
    //    获取所有圈子
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
    cursor: pointer;
}
.logobox{
    position: relative;
    margin-top: 80px;
    height: 50px;
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
            // height: auto;
            // border: 1px solid blue;
            // 右侧圈子信息
            .circleinfo{
                width: inherit;
                height: 100px;
                border: 1px solid rgba(0, 132, 255, 0.411);
                margin-top: 5px;
                margin-bottom: 35px;
                position: absolute;
                .cimg{
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    left: 10px;
                    margin-top: 10px;
                }
                .ccname{
                     color:#979797;
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
                // 关注人数
                .follow{
                
                    width: 100px;
                    position: absolute;
                    left: 100px;
                    text-align: left;
                    bottom: -10px;
                    color:#979797;
                   
                }
                .follow2{
                    // border: 1px solid gainsboro;
                    width: 100px;
                    position: absolute;
                    left: 180px;
                    // text-align: left;
                    bottom: -10px;
                    color:white;
                    cursor: pointer;
                    background-color: rgba(255, 0, 0, 0.61);
                }
            }
            
            .postbox{
                top: 150px;
                    position: absolute;
                    width: inherit;
                     border: 1px solid rgba(0, 132, 255, 0.411);
                    // 贴子列表
                    .post{
                        
                        // position: ;
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
                            // color: gainsboro;
                            font-size: 5px;
                            line-height: 30px;
                        }
                        .posttime{
                            position: absolute;
                            right: 100px;
                            font-size: 5px;
                            line-height: 30px;
                        }

                    }
            }
            
            
        }
        
    }

    .bigbox{
        margin-top: 20px;
    }

}
</style>

