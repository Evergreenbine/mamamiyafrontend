<template>
  <div id="bbs">
      <ToBar/>
     
       <h2 class="logo"> mamamiya资源区</h2>
       <div class="search"></div>
       <!-- 查询具体资讯 -->
      <div class="newbox max-width margin-auto" >
          <h1>{{this.curnew.title}}</h1>
          <div v-html="this.curnew.content"></div>

        <!-- 评论盒子  -->
         <div class="goodcomment max-width margin-auto" >
         <div class="commentbox" v-for="(item,index) in lou" :key="index">
             <div class="userbox">
                    <img :src="item.avator" alt="" class="av">
                    <p class="name">{{item.username}}</p>
             </div>
             <div class="commentboxx">
                 <b-textarea rows="3" @focus="replyothers(item,index)" readonly :placeholder="item.content"/>
                 <a href="#huifu" id="oooop">hah</a>
                 <p class="time">{{item.createtime}}</p>
             </div>
             <!-- 回复我的 -->
             <div class="replymebox">
                 <!-- 通过外层index 获取对应的回复 -->
                 <div v-for="itemon in cen[index]" :key="itemon">
                     <div class="replyto">
                         <img class="kaka" :src="itemon.avator" alt="">
                          <!-- <b-textarea  rows="3" @focus="replyothers(itemon,index)" readonly :placeholder="itemon.content"/> -->
                         <p class="conte" @click="replyothers(itemon,index)">{{itemon.content}}</p>
                     </div>
                 </div>
                 
             </div>
         </div>
         
         </div>

        <!-- 发布评论 -->
         <div id="huifu" class="goodcomment max-width margin-auto" >
         <div class="commentbox">
             <div class="userbox">
                    <img :src="user.avator" alt="" class="av">
                    <p class="name">{{user.username}}</p>
             </div>
             <div class="commentboxx">
                 <b-textarea rows="3" v-model="info.content"  placeholder=""/>
             </div>
             <div>
                 <div class="fabu" @mouseover="()=>{
                    fabuid = 1 }" @mouseout="()=>{fabuid = 0}" @click="publishinforeply">{{ fabuid == 0?"发布":"发布?"}}</div>
             </div>
         </div>
        </div>      
    </div>
  
  </div>
</template>

<script>
import ToBar from '../TopBar'
export default {
    data() {
        return {
            
            // 发布按钮控制变量
            fabuid:0,
            // 这是查看的第一页资讯
            curnew:'',
            // 查询回复的
            replyarr:[],
            // 当前浏览者
            user:'',
            // 当前要发布的回复
            info:{
                useraccount:'',
                content:'',
                infoid:'',
                createtime:'',
                rcontent:'',
                floor:'',
                rname:'',
                ruid:''

            },
            lou:'',
            cen:''
        }
    },
    methods:{
        // 回复资讯的
        async publishinforeply(){
              const bbsaxios = this.$config.getAxiosInstance('bbs')
            // useraccount, infoid在create方法里初始化了,content双向绑定了,
              let res = await bbsaxios.post("/api/createreply",this.info)
              
              if(res.data =  1){
                  alert("发布回复成功")
                  this.$router.go(0)
                 
              }
        },
        async replyothers(item,index){
            if(item.ruid != undefined){
                
            }
            // 获取a标签跳转到回复内容，a标签隐藏了
           let ooop = document.getElementById("oooop")
           ooop.click()
            // 回复复层主说话的内容
           this.info.rcontent = item.content
            
            // 构造info
           this.info.infoid= item.infoid
           this.info.ruid = item.useraccount
            // 这个在这里没啥用的
           this.info.floor = index+1
        }
    },
    components:{
      ToBar
    },
    async created(){
        // 获取资讯id
        let infoid = this.$route.query.infoid
        // 将当前的要回复的info的id赋值一下
        this.info.infoid = infoid

        // 查询具体资讯
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
                url:"api/info",
                method:'get',
                params:{
                    infoid:infoid
                }
         })

        //  如果查询成功
            if(res.data.code == 1 ){
                //1. 插入记录表
                bbsaxios({
                    url:"/api/looknew",
                    method:'get',
                    params:{
                        infoid:infoid,
                        useraccount:JSON.parse(localStorage.getItem("username"))
                    }
                })
                //2.查询资讯的所有回复
                let resp = await bbsaxios({
                    url:'/api/getreplyinfo',
                    method:'get',
                    params:{
                        infoid:infoid,
                        curpage:1
                    }
                })
                // 3.将回复赋值给本页的回复数组
             
                this.lou = resp.data.lou
                this.cen = resp.data.cen
                console.log(this.replyarr);
                // 将资讯赋值给当前资讯
                this.curnew = res.data
                
            }
           

        // 查询发布者信息
        const usersaxios = this.$config.getAxiosInstance('user')
        let useraccount = JSON.parse(localStorage.getItem("username"))
        let user = await usersaxios.get(`/api/user/${useraccount}`)
        this.user = user.data.result
        // 如果要回复时，先初始化info的比较重要的信息
        this.info.useraccount = this.user.useraccount

    }
}
</script>

<style lang="scss" scoped>
.logo{
   text-align: left;
   margin-left: 100px;
   margin-top: 20px;
   color: #FF7484;
}
.search{
    margin-top: 30px;
    width: inherit;
    height: 50px;
    background-color: #FF7484;
}
// 资讯盒子
.newsbox{
    margin-top: 30px;
    height: auto;
    // border: 1px solid gainsboro;
    display: flex;
    .newsboxleft{
        width: 800px;
        height: auto;
        border: 1px solid gainsboro;
        display: flex;
        flex-wrap: wrap;
        
        .box{
            width: 320px;
            height: 300px;
            border: 1px solid gainsboro;
            margin: 35px;
            position: relative;
            .tagbox{
                width: 317px;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                color:#FF7484;
                // background-color:gainsboro;
            
               
            }
           
            .bottombox{
                width: inherit;
                height: 260px;
                // border: 1px solid greenyellow;
               .ttt{
                   width: 315px;
                   color: rgb(112, 110, 110);
                   overflow: hidden;
                   margin-top: 0px;
               }
               
            }
        }
       
    }
    .newboxright{
        width: 297px;
        height: 500px;
        border: 1px solid gold;
    }
}
// 资源盒子
.resource{
    margin-top: 80px;
    height: 500px;
    border: 1px solid gold;
    margin-bottom: 100px;
}
// 评论盒子
.goodcomment{
    height: 150px;
    height: auto;
    // border-bottom: 1px solid gainsboro;
    .commentbox{
        width: 1100px;
        height: auto;
        position: relative;
        // border: 1px solid gainsboro;
        .userbox{
            // position: absolute;
            width: 120px;
            height: 130px;
            // border: 1px solid yellow;
            left: 40px;
            .av{
                width: 82px;
                height: 82px;
                margin-top: 10px;
            }
            .name{
                margin-top: 6px;
                color: rgb(143, 143, 143);
            }
        }
        .commentboxx{
            width: 900px;
            // height: 105px;
            position: absolute;
            right: 30px;
            top: 10px;
        }
        .time{
            position: absolute;
            color: rgb(143, 143, 143);
            right: 0;
        }
        .fabu{
            width: 100px;
            height: 25px;
            color: white;
            background-color: orange;
            position: absolute;
            right: 30px;
            bottom: 0;
            line-height: 25px;
            cursor: pointer;
            
        }

    .replymebox{
        width: 1100px;
        height: auto;
        // border: 1px solid gainsboro;
        // position: absolute;
        right: 0;
        bottom: -10px;
        position: relative;
        .replyto{
            width: 1100px;
            height: 50px;
            // border: 1px solid gray;
            position: relative;
            .kaka{
                position: absolute;
                width: 40px;
                height: 40px;
                left: 70px;
                top: 5px;
            }
            .conte{
               position: absolute;
               left:130px ; 
            }
        }
    }



}
// 将a标签隐藏起来
#oooop{
    visibility: hidden;
}

}
</style>