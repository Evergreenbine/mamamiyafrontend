<template>
  <div>

    <!-- 支付提示框 -->

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="gotobuy">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 顶部导航栏 -->
     <div class="quescata max-width">
          <div class="quesitem" v-for="(item,index) in konwcata" :key="index"> <a href="#one"> {{item.kname}}</a></div>
      </div>
  
    <!-- 哈哈魔鬼，就这样我就搞顶一个首页 -->
    
    <div v-for="(item,index) in konwcata" :key="index">
        <div id="one"  class="max-width margin-auto konwbox position-re" :class="{activecc:org==index}">
            <p class="logo">{{item.kname}}</p>
            <p class="more" @click="moreshow(index)" >{{moretag}}</p>

            <div class="content d-flex  fd-row flex-wrap" style="margin-top: 31px">
                <!-- 每个title -->
                <div v-for="item in konwmap.get(item.kcid)" :key="item.kid" class="titleitem" >
                     <div  @click="togoto(item)" :class="{notfree : item.isfree == 0}">
                        {{item.title}}
                     </div>
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
            konwcata:[],
            konwmap:'',
          
           
            // 控制变量
            org:0,
            moretag:"更多>>>",
            dialogVisible: false
          
        }
    },
    methods:{
        
        moreshow(id){

          this.org = this.org == 0 ? id : 0
          this.moretag = this.moretag == "更多>>>" ?"收起<<<":"更多>>>"
        },
        // 判断是否免费
        async togoto(item){
           
            // 获取账户名

           
            // 这个判断是否免费必须请求后端的，因为有些文章虽然收费，但有些用户是买了的
           const bbsaxios = this.$config.getAxiosInstance('bbs')
           let res = await bbsaxios({
               url:"/api/konws/isfree",
               methods:"get",
               params:{
                   kid:item.kid,
                   useraccount:JSON.parse(localStorage.getItem("username"))
               }
                })
              
             //    付过费的或者本身就是免费的，就可以跳转
                if(res.data == 1 || item.isfree == 1){
                    this.$router.push({path:'/ques/konw',query:{
                          kid:item.kid,
                          isfree:item.isfree
                    }})
                }else{
                    // this.gotobuy(item)
                    this.$router.push({path:"/ques/konw/pay",query:{
                       kid:item.kid,
                       price:item.price
                    }})

                     //    提示去付费
                    //  this.dialogVisible = true;
                }
        },
        gotobuy(item){
            alert(item.kid)
        },
        handleClose(done) {
       
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }
    },
    async created() {
         const bbsaxios = this.$config.getAxiosInstance('bbs')

        // 查询知识分类
        let res = await bbsaxios.get('/api/konwcata')
        this.konwcata = res.data
      
        let konwmap = new Map()

        for(var i = 0;i< this.konwcata.length;i++){
           let cata = this.konwcata[i].kcid
           let res = await bbsaxios.get(`/api/konws/${cata}`)
           konwmap.set(cata,res.data)
        }

        this.konwmap = konwmap
        
    },

}
</script>

<style lang="scss" scoped>
// 顶部栏
 .quescata{
    //  border: 1px solid green;
     display: flex;
     .quesitem{
         width: 220px;
        //  border: 1px solid gainsboro;
         height: 40px;
         line-height: 40px;
         background-color:  #20c997;
         color: ghostwhite;
         border-right: 1px solid ghostwhite;
     }
     a{
         text-decoration: none;
         color: #fff;
     }
}


.konwbox{
    margin-top: 25px;
    border: 2px solid #20c997;
    height: 350px;

    .logo{
        width: 150px;
        position: absolute;
        font-size: 25px;
        font-weight: 500;
        color: #20c997;;
        top: -20px;
        left: 10px;
        background-color: #fff;
        text-align: center;
    }
    .titleitem{
        margin-left: 32px;
        cursor: pointer;
        text-align: left;
        width: 500px;
        height: 35px;
        // border: 1px solid gainsboro;
        overflow: auto;
    }
    .more{
        position: absolute;
        right: 10px;
        font-size: 15px;
        color: rgb(194, 194, 194);
        cursor: pointer;
    }
}
.activecc{
    height:auto;
}
.notfree{
    color: red;
}
</style>