<template>
  <div id="bbs">
      <ToBar/>
       <h2 class="logo"> mamamiya资源区</h2>
       <div class="search"></div>
      <!-- 首页 -->
    <div class="newsbox max-width margin-auto"  v-show="pageid == 1">
        
          <div class="newsboxleft">
                <div class="box" v-for="item in res" :key="item.icid">
                    <!-- 报告解读里面的盒子 -->
                    <div class="tagbox">
                        <p class="tagname">{{item[0].tagname}}</p>
                    </div>
                   
                    <!-- 它下面的盒子 -->
                    <div class="bottombox">
                        <p class="ttt" v-for="(item2,index) in item.slice(0,5)"  :key="index">
                          <a href="javascript:void(0)" @click="infodetail(item2)">{{item2.title}}</a>
                        </p>
                    </div>
                </div>   
          </div>
          <div class="newboxright max-width">

          </div>
          
    </div>
  
  
   <div class="resource max-width margin-auto" v-show="pageid == 1"></div>
  </div>
</template>

<script>
import ToBar from '../TopBar'
export default {
    data() {
        return {
            
            // 发布按钮控制变量
            fabuid:0,
            //页面控制变量
            pageid:1,
            // 这是查看的第一页资讯
            curnew:'',
            // 查询所有资讯的
            res:[],
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

            }
        }
    },
    methods:{

        infodetail(item){    

           this.$router.push({
               path:'/infodetail',
               query:{
                   infoid:item.infoid
               }
           })
           
          
        },

        async publishinforeply(){
              const bbsaxios = this.$config.getAxiosInstance('bbs')
            //   this.info.useraccount = this.user.useraccount
              this.info.useraccount = this.user.useraccount
              console.log(this.info);
            //   this.info.infoid = this.infoid 进来时已经记录
              let res = await bbsaxios.post("/api/createreply",this.info)
              
              if(res.data =  1){
                  alert("发布回复成功")
                //   this.$router.go(0)
                 
              }
        },
        async replyothers(item,index){
            // 获取a标签跳转到回复内容，a标签隐藏了
           let ooop = document.getElementById("oooop")
           ooop.click()
            // 会复层主的内容
           this.info.rcontent = item.content
            
            // 构造info
           this.info.infoid= item.infoid
           this.info.ruid = item.useraccount
           this.info.floor = index+1
           
        
            

        }
    },
    components:{
      ToBar
    },
    async created(){
      

        const bbsaxios = this.$config.getAxiosInstance('bbs')
        let res = await bbsaxios.get("/api/getAllNews")
        this.res = res.data

        // 查询发布者信息
        const usersaxios = this.$config.getAxiosInstance('user')
        let useraccount = JSON.parse(localStorage.getItem("username"))
        let user = await usersaxios.get(`/api/user/${useraccount}`)
        this.user = user.data.result

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
        width: inherit;
        height: 130px;
        position: relative;
        // border: 1px solid gainsboro;
        .userbox{
            position: absolute;
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
        .commentbox{
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

    }
// 将a标签隐藏起来
#oooop{
    visibility: hidden;
}

}
</style>