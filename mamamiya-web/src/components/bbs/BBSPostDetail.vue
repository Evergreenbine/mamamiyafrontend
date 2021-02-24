<template>
  <div>
      <TopBar/>
      <BBsHeader/>
      <div class="d-flex fd-rows">
          <!-- 左边栏 -->
      <div class="leftbar">
          <p>最多回复</p>
          <div class="postbox">
              <div></div>
          </div>
      </div>
      <!-- 中间 -->
      <div class="margin-auto">
        <!-- 贴子详情 -->
           <div class="middle max-width margin-auto position-re" >
          <!-- 顶部栏部分 -->
          <div class="headerinfo position-ab">
               <div class="opbutton"><router-link :to="'/user'">发帖</router-link></div>
               <div class="opbutton"><a href="#fulltext"> 回帖</a></div>
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

        <div :id="index+1" v-for="(item,index) in replypost" :key="index"  class="replypost  margin-auto">
            <div class="userinfo">
                <img class="userimg" :src="item.avator" alt="">
                <p>{{item.username}}</p>
                 <div class="floornums">第{{index+1}}楼</div>
            </div>
            <div class="postcontent">
                <div class="title">
                    <!-- {{item.ruid}} -->
                    <!-- 回复->第{{item.floor}}楼的{{item.rname}} -->
                    <div class="buttn" @click="replythis(item,index)"><a href="#fulltext"> 回复本楼</a></div>
                </div>
                <div>
                   <div class="floorreply" v-show="item.floor != ''&&item.floor != null">
                       <a class="huifu" :href="`#${item.floor}`" v-show="item.floor != ''&&item.floor != null">回复{{item.floor}}楼的{{item.rname}}</a>
                       <p v-html="item.rcontent"></p>
                   </div>
                    <div class="content" v-html="item.content">{{item.content}}</div>
                   
                </div>
            </div>
         
        </div>


        <!-- 富文本编辑器 -->
           <div id="fulltext" class="publishbox margin-auto">
               <div class="huifushui">{{current == ''?'':`回复${current}`}}</div>
                <full-text-editor id="full" @func="savecontent"/>
                <div class="replybtn" @click="replypostmethod">回复贴子</div>
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
            // 这是楼主的信息
            user:{
                avator:'',
                username:'',
                useraccount:''
            },
            // 这个好像有点冗余，但不管它了
            res:'',
            // 这是最开始进这个页面接受查询到的帖子的回复的数组
            replypost:[], //这是一个数组
            // 这个是构造回帖的数据模型
            replypost2:{
                ruid: '',
                useraccount: JSON.parse(localStorage.getItem("username")),
                content:'' ,
                pid:'',
                // 这是假如你回复层主所需要携带的信息
                rcontent:'',
                floor:'',
                rname:''
            },
            // 记录当前回复谁
            current:'',
            // 这个测试用的
            content:''
        }
    },
    methods:{
        // 回复层主
        async replythis(user,index){
            // 回复当前的是谁？
            this.current = user.username
            // alert(user.content)
            // 获取贴子id
            let pid = this.$route.query.pid
            

            // 赋值一下
            this.replypost2.ruid = user.useraccount
            this.replypost2.pid =pid
            // 如果是回复楼层的,添加层主的额外信息
            this.replypost2.rcontent = user.content
            this.replypost2.floor = index+1
            this.replypost2.rname = user.username
         

            
        },
        // 接受富文本子组件内容的方法
        savecontent(content){
            this.replypost2.content = content
            console.log("回复帖子的"+this.content);
        },
        // 回复贴子的方法
        async replypostmethod(){
            const bbsaxios = this.$config.getAxiosInstance('bbs')
            console.log(this.replypost2);
            let res = await bbsaxios.post('/api/createReplyPost',this.replypost2)
            if(res.data == 1){
                alert("回帖子成功")
                this.$router.go(0)
            }
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
        // 查询楼主信息
         this.res = res.data.result[0]
         this.user.avator = this.res.avator
         this.user.username = this.res.username
         this.user.useraccount = useraccount
        // console.log(this.user.avator);
        // console.log(pid);
        // 构造默认的回复对象
        this.replypost2.ruid = useraccount
        this.replypost2.pid = pid

        // 查询所有回复帖子的
        let replypost = await bbsaxios.get(`/api/replypost/${pid}`)
        // 保存所有回复
        this.replypost = replypost.data
        console.log(this.replypost);
    }
}
</script>

<style lang="scss" scoped>
// 左边栏
.leftbar{
    // float: left;
    width: 250px;
    height: 1000px;
    border: 1px solid gainsboro;
    margin-top: 20px;
    margin-left: 20px
    ;
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
            .floornums{
                width:inherit;
                height: 20px;
                background-color: ghostwhite;

            }
        }
        .buttn{
            width: 120px;
            height: 30px;
            border: 1px solid gray;
            float: right;
            margin-top: 10px;
            margin-right: 10px;
            line-height: 30px;
            cursor: pointer;
        }
        .buttn:hover{
            background-color: gainsboro;
        }
        .postcontent{
            // background-color: antiquewhite;
            width: 698px;
            height: 300px;
            .title{
                height: 50px;
                border-bottom: 1px solid gainsboro;
            }
            .content{
                 overflow-x: auto;
            }
        }
        .floorreply{
            width:698px ;
            height: 80px;
            background-color: gainsboro;
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
    width: 250px;
    height: 1000px;
    // border: 1px solid gray;
   
}


</style>

