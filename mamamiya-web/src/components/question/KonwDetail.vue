<template>
<div>
     <!-- {{queryques}} -->
    <div class="quesbox max-width margin-auto">
        <!-- 提问者信息 -->
        <div class="replybox margin-auto position-re">
            <div class="button">我要回答</div>
            
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
        <div class="reply margin-auto">

        </div>
       
    </div>   
</div>
</template>

<script>
export default {

    data() {
        return {
            queryques:'',
            reply:[]
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
    width: 1000px;
    border: 1px solid gainsboro;
    height: 230px;
    margin-bottom: 100px;
}
</style>

