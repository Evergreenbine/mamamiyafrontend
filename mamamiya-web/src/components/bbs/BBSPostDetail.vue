<template>
  <div>
      <TopBar/>
      <BBsHeader/>
      <div class="d-flex fd-rows">
          <!-- 左边栏 -->
      <div class="leftbar">
      </div>
      <!-- 中间 -->
      <div class="margin-auto">
        <!-- 贴子详情 -->
           <div class="middle max-width margin-auto position-re" >
          <!-- 顶部栏部分 -->
          <div class="headerinfo position-ab">
               <div class="opbutton">发帖</div>
               <div class="opbutton" @click="this.$router.push({path:'/user'})">回帖</div>
          </div>
          <!-- 头像部分 -->
          <div class="leftbody ">
              <img class="avatorimg" :src=this.user.avator />
              <p class="username">{{this.user.username}}</p>
          </div>
          <!-- 右边盒子 -->
          <div class="rightbody">
            <div class="posttitle" ><h2>{{this.res.title}}</h2></div>
            <div class="contentbox" >
                <div class="postcontent" v-html="this.res.content">
                    {{this.res.content}}
                </div>
            </div>
          </div>

           </div>

        <!-- 回复 -->

        <div v-for="(item,index) in 5" :key="index"  class="replypost  margin-auto">
            <div class="userinfo">
                <img class="userimg" src="" alt="">
                <p>骨川小夫</p>
            </div>
            <div class="postcontent">
                <div class="title">
                    <!-- nihao  -->
                </div>
            </div>
         
        </div>


        <!-- 富文本编辑器 -->
           <div class="publishbox margin-auto">
               <div class="huifushui">回复{{user.username}}</div>
                <full-text-editor id="full"/>
                <div class="replybtn">回复贴子</div>
           </div>
         
      </div>
     
      <!-- 右边护栏 -->
      <div class="rightbar"></div>
      </div>
  </div>
</template>

<script>
import FullTextEditor from '../FullTextEditor.vue'
import TopBar from '../TopBar'
import BBsHeader from './header/BBSHeader'
export default {
    data() {
        return {
            user:{
                avator:'',
                username:'',
            },
            res:''
        }
    },
    components:{
        BBsHeader,TopBar,
        FullTextEditor
    },
   async created(){
       let pid = this.$route.query.pid
       let cid = this.$route.query.cid
       let useraccount = this.$route.query.useraccount
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
             url:'/api/posts',
             method:'get',
             params:{
                 cid:cid,
                 pid:pid,
                 useraccount:useraccount
                //  useraccount:JSON.parse(localStorage.getItem('username'))
             }
         })
    
         this.res = res.data.result[0]
         this.user.avator = this.res.avator
         this.user.username = this.res.username
        console.log(this.user.avator);
    }
}
</script>

<style lang="scss" scoped>
// 左边栏
.leftbar{
    // float: left;
    width: 150px;
    height: 1000px;
    // border: 1px solid gray;
}

// 中间大框
    .middle{
        margin-top: 20px;
        width: 900px;
        border: 1px solid gainsboro;
        height: 600px;
        // 顶部信息
        .headerinfo{
            position: absolute;
            right: 0;
            width: 699px;
            height: 50px;
            border-bottom: 1px solid gainsboro;
            
            .opbutton{
                float: right;
                width: 120px;
                height: 40px;
                margin-top: 5px;
                border: 1px solid gray;
                line-height: 40px;
                margin-right: 10px;
                
            }

            .opbutton:hover{
                float: right;
                width: 120px;
                height: 40px;
                margin-top: 5px;
                border: 1px solid gray;
                line-height: 40px;
                margin-right: 10px;
                color: white;
                background-color: gray;
                cursor: pointer;
            }
        }
        // 左边信息
        .leftbody{
            // position: absolute;
            width: 200px;
            top: 50px;
            height: inherit;
            .avatorimg{
                // position: absolute;
                margin-top: 10px;
                width: 182px;
                height: 182px;
                top: 10px;
                left: 9px;
            }
            border-right: 1px solid gainsboro;
            


        }
        // 右边信息
        .rightbody{
            position: absolute;
            width: 699px;
            right: 0px;
            top: 50px;
            .posttitle{
                height: 50px;
                // line-height: 50px;
                width: 698px;
                border-bottom: 1px solid gainsboro;
                h2{
                    line-height: 50px;
                }
            }
            .contentbox{
                // border: 1px solid gold;
                width: 650px;
                margin: auto;
                height: 500px;
                overflow-x: auto;
            }

        }

       
    }
    .replypost{
        margin-top: 10px;
        width: 900px;
        height: 300px;
        border: 1px solid gainsboro;
        display: flex;
        .userinfo{
            width: 200px;
            height: 300px;
            border-right: 1px solid gainsboro;
            .userimg{
                width: 182px;
                height: 182px;
                margin-top: 10px;
            }
        }
        .postcontent{
            // background-color: antiquewhite;
            width: 698px;
            height: 300px;
            .title{
                height: 50px;
                border-bottom: 1px solid gainsboro;
            }
            
        }
    }
    // 富文本编辑器
    .publishbox{
        // border: 1px solid gainsboro;
        width: 900px;
        position: absolute;
        margin-top: 20px;
        margin-bottom: 500px;

        #full{
            margin-bottom: 20px;
        }
        .replybtn{
            position: absolute;
            width: 200px;
            height: 35px;
            border: 1px solid ;
            line-height: 35px;
            cursor: pointer;
            right: 0px;
            margin-bottom: 200px;
        }
        .replybtn:hover{
            background-color: black;
            color: white;
        }
        
    }
    .huifushui{
        position: absolute;
        width: 200px;
        height: 24px;
        border: 1px solid gainsboro;
        line-height: 24px;
        color: rgb(161, 161, 161);
        border-bottom: none;
    }

// 右边栏
.rightbar{
    // float: right;
     width: 150px;
    height: 1000px;
    // border: 1px solid gray;
   
}


</style>

