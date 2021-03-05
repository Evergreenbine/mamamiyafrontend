<template>
<div>
     <!-- {{queryques}} -->
    <div class="quesbox max-width margin-auto">
        <!-- 提问者信息 -->
        <div class="replybox margin-auto position-re">
            <div class="button"><a href="#reply">  我要回答</a></div>
            
            <div class="userinfo">
                <img :src="queryques.avator" alt="">
                <div class="name">{{queryques.username}}</div>
            </div>
            <div class="quesinfo">
                <div class="title">{{queryques.title}}</div>
                <div class="content">
                    <b-textarea rows="5"  readonly :placeholder="queryques.content"/>
                </div>
                <div class="time">{{queryques.createtime}}</div>
            </div>
        </div>

        <div class="line max-width margin-auto">
            所有回复
        </div>

         <!-- 回复者答案 -->
        <div v-for="item in this.reply" :key="item.rid">
            <div class="replybox ttt margin-auto position-re">
               <div class="userinfo">
                   <img :src="item.avator" alt="">
                   <div class="name">{{item.username}}</div>
               </div>
               <div class="quesinfo">
                   <!-- <div class="title">{{queryques.title}}</div> -->
                   <div class="content">
                       <b-textarea rows="6"  readonly :placeholder="item.content"/>
                   </div>
                   <div class="time">{{item.createtime}}</div>
               </div>
            </div>
        </div>

        <!-- 回复 -->
        <div id="reply" class="reply margin-auto">
            <div class="replybox ttt margin-auto position-re">
               <div class="userinfo">
                   <img :src="this.user.avator" alt="">
                   <div class="name">{{this.user.username}}</div>
               </div>
               <div class="quesinfo">
                   <!-- <div class="title">{{queryques.title}}</div> -->
                   <div class="content">
                       <b-textarea type="textarea" rows="6"  placeholder="字数不多于150字哟" v-model="ccontent"/>
                   </div>
                    <el-button class="replybutton" @click="replyply">回复</el-button>
                   <!-- <div class="time">{{this.user.createtime}}</div> -->
               </div>
            </div>
        </div>
       
    </div>   
</div>
</template>

<script>
export default {

    data() {
        return {
            queryques:'',
            reply:[],
            user:'',
            replyinfo:{
               ruid:'',
               useraccount:'',
               content:'',
               qid:''
            },
            // 回复内容
            ccontent:''
        }
    },
    methods:{
        async replyply(){
            // alert(this.ccontent)
             const bbsaxios = this.$config.getAxiosInstance('bbs')
              let qid  = this.$route.query.qid
              let useraccount  = JSON.parse(localStorage.getItem("username"))
            //   随便判断一下就好了
             console.log(useraccount)
              if(useraccount == null){
                  alert("请先登录")
                  this.$router.push("/new/login")
              }

             // 插入回复
            this.replyinfo.qid = qid //回复哪一条
            this.replyinfo.useraccount = useraccount //谁回复
            this.replyinfo.ruid = this.queryques.useraccount //提问者
            this.replyinfo.content = this.ccontent
            let tag = await bbsaxios.post("/api/reply",this.replyinfo)
            if(tag.data == 1){
                this.$router.go(0)
                alert("回复成功")
            }
        }
    },
    async created(){
        
         let qid  = this.$route.query.qid
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let queryques = await bbsaxios.get(`/api/quesbyqid/${qid}`)
         this.queryques = queryques.data

        //  所有回复
        let reply = await bbsaxios.get(`/api/quesreply/${qid}`)
        this.reply = reply.data

        // 获取当前用户信息
        let useraccount  = JSON.parse(localStorage.getItem("username"))
        const useraxios = this.$config.getAxiosInstance('user')
        let user = await useraxios.get(`/api/user/${useraccount}`)
        this.user = user.data.result

        // console.log(this.user);
       
    }
}
</script>

<style lang="scss" scoped>
.replybox{
    margin-top: 50px;
    // margin-bottom: 100px;
    width: 1000px;
    border: 1px solid gainsboro;
    height: 230px;
    // 回复按钮
    .button{
        width: 120px;
        height: 38px;
        position: absolute;
        right: -1px;
        top: -38px;
        border: 1px solid gainsboro;
        line-height: 38px;
        border-bottom: none;
        color: rgb(175, 175, 175);
        cursor: pointer;
    }
    // 提问者信息
    .userinfo{
        width: 100px;
        height: 125px;
        position:absolute;
        // border: 1px solid gainsboro;
        top: 11px;
        left: 11px;
        img{
            width: 100px;
            height: 100px;
            border: 1px solid gainsboro;
        }
        .name{
            color: rgba(175, 174, 174, 0.979);
        }
    }
    // 问题信息
    .quesinfo{
        top: 11px;
        width: 830px;
        height: 209px;
        // border: 1px solid gainsboro;
        right: 20px;
        position: absolute;
        .title{
            width: 830px;
            height: 45px;
            border-bottom: 1px solid gainsboro;
            font-size: 25px;
            line-height: 45px;
            text-align: left;
        }
        .content{
            margin-top: 10px;
        }
        .time{
            position: absolute;
            right: 0px;
            bottom: -10px;
        }
    }

}
.line{
    height: 100px;
    line-height: 100px;
    text-align: left;
    font-size: 20px;
}
.replybox.ttt{
 margin-top: 5px;
}

// 回复
.reply{
     margin-top: 50px;
    // margin-bottom: 100px;
   
    // border: 1px solid gainsboro;
    
    margin-bottom: 100px;
}
.replybutton{
    position: absolute;
    height: 35px;
    bottom: 0px;
    right: 0px;
}
</style>

