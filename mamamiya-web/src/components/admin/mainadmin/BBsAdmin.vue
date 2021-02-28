<template>
<div>
    
   <div class="navhha">
       <!-- 将cid设置为-1 是为了去除新建圈子的默认值 -->
       <div class="navbut" :class="{navbutact : page == 0 || page == 2}" @click="()=>{page = 0,cid = -1}">{{cid == -1 ? "新建":"编辑"}}圈子</div>
       <div class="navbut" :class="{navbutact : page == 1}" @click="seeallcircle">圈子列表</div>
       <div class="navbut" :class="{navbutact : page == 3}" @click="page = 3" v-show="page == 3 ">查看贴子列表</div>
       <div class="navbut" :class="{navbutact : page == 4}" @click="page = 4" v-show="page == 4" >正在编辑贴子</div>
       <div class="navbut" :class="{navbutact : page == 5}" @click="page = 5"  >论坛数据统计</div>
       
   </div> 
   <!-- 第一页 -->
  <div class="createshop" v-show="page == 0">
      <div class="item d-flex">
        <p class="tagname">圈子头像</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="circle.avator" :src="circle.avator" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>  
     
      <div class="item d-flex">
        <p class="tagname">圈子名</p><el-input v-model="circle.cname" ></el-input>
      </div>  
      <div class="item d-flex">
        <p class="tagname">推荐语</p><el-input v-model="circle.introduce" ></el-input>
      </div>  
     
      <div class="item d-flex">
         <el-button type="success" @click="savecircle">保存</el-button>
      </div>  
   </div>
    <!-- 第二页 -->
    <div class="createshop" v-show="page == 1">
      <div v-for="(item,index) in circlearr"  :key="index">
          <div class="itembox">
            <div class="itemname" @click="lookpost(item)">   {{item.cname}}</div> 
            <div class="btnn" @click="editor(item.cid)">编辑</div>
            <div class="btnnn" @click="dele(item.cid)" >删除</div>
          </div>
      </div>
   </div>

   <!-- 第三页 编辑圈子 -->
   <div class="createshop" v-show="page == 2">
      <div class="item d-flex">
        <p class="tagname">圈子头像</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="circle.avator" :src="circle.avator" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>  
     
      <div class="item d-flex">
        <p class="tagname">圈子名</p><el-input v-model="circle.cname" ></el-input>
      </div>  
      <div class="item d-flex">
        <p class="tagname">推荐语</p><el-input v-model="circle.introduce" ></el-input>
      </div>  
     
      <div class="item d-flex">
         <el-button type="success" @click="savecircle">保存</el-button>
      </div>  
 
   </div>

 <!-- 查看贴子列表 -->
  <div class="createshop" v-show="page == 3">
    <div v-for="(item,index) in cpost"  :key="index">
          <div class="itembox">
            <div class="itemname" @click="editpost(item)" >   {{item.title}}</div> 
            <div class="btnn" @click="editor(item.cid)">编辑</div>
            <div class="btnnn" @click="dele(item.cid)" >删除</div>
          </div>
      </div>
  </div>

  <!-- 编辑具体贴子 -->
  <div class="createshop" v-show="page == 4">
    <!-- 贴子标题 -->
   <div class="item d-flex">
       <p :style="{width:'120px'}">贴子标题</p>
        <el-input  v-model="post.title"></el-input>
    </div>
    <!-- 圈子分类 -->
        <div class="item d-flex">
          <p :style="{width:'120px'}">选择圈子</p>
          <el-select v-model="post.cid" slot="prepend" placeholder="请选择分类" >
             <el-option :label="item.cname" :value="item.cid" v-for="item in circlearr " :key="item.cid" >
             </el-option>
           </el-select>
        </div>
         <div  class="item d-flex">
           <p :style="{width:'120px'}">审核状态</p>
            <input type="checkbox" :style="{cursor:'pointer'}"  @click="ispasss(post.pass)" v-model="post.pass">
         </div>
        <!-- 贴子内容 -->
        <div class="item d-flex">
            <p :style="{width:'120px'}">贴子内容</p>
            <UFullTextEditor v-bind:parrentcontent="post.content" v-on:func="savecontent"/>
         </div>
         <div class="item d-flex">
           
         </div>
         <div class="item d-flex">   
           <el-button type="success" @click="publish">更新</el-button>
        </div>  
    
  </div>
  
 <!-- 论坛数据统计 -->
 
</div>
</template>
<script>
import UFullTextEditor from '../../UpdateFullTextEditor'
export default {
  props: {
    id: ""
  },
  components:{
    UFullTextEditor
  },
  data() {
    return {
        // 页面变量
        page:0,
        // 当前编辑的圈子变量
        cid:-1,
     
     circle:{
         cname:'',
         introduce:'',
         avator:''
     },
     circlearr:[],
     cpost:[],
    //  正在编辑的贴子
    post:'',
    // 记录当前编辑的贴子的审核状态，因为watch监控不到内部属性的变化
    ispass:0
        
     
    };
  },
  methods: {
    // 发布贴子的方法
    async publish(){
        // alert(this.user.username)
        // alert(this.post.author)
        this.post.author = this.user.username
        this.post.useraccount = this.user.useraccount
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
           url:'/api/post',
           method:'post',
           data:this.post,
           params:{
            //  postcircle:this.content
           }
         })
         if(res.data == 1){
           alert("发布帖子成功")
         }
        
      },
    ispasss(pass){
      // alert(pass)
      if(pass == 1){
        alert("贴子已经审核，无法修改")
        this.post.pass = 1
      }
    },
    // 保存更新的贴子
    savecontent(content){
      this.post.content = content
    },
    // 编辑贴子
    editpost(item){
      this.page = 4
      this.post = item
    },
    async lookpost(item){
        const bbsaxios = this.$config.getAxiosInstance('bbs')
        let res = await bbsaxios({
                url:'/api/posts',
                method:'get',
                params:{
                    cid:item.cid
                }
            })

        this.cpost = res.data.result
        this.page =  3

    },
    handleAvatarSuccess(res, file) {
        this.circle.avator = res.url
        // this.saveinfo()
    },
    // 保存圈子
    async savecircle(){
      const bbsaxios = this.$config.getAxiosInstance('bbs')
      let res = await bbsaxios.post('/api/circle/create',this.circle)
      if(res == 1 ){
          alert("创建成功")
      }
    },
    // 查看所有圈子
    async seeallcircle(){
       this.page = 1
       const bbsaxios = this.$config.getAxiosInstance('bbs')
       let resp = await bbsaxios.get('/api/circle')
       let result = resp.data.result
       this.circlearr = result

    },
    // 编辑特定圈子
    editor(cid){
    //    因为列出来所有圈子了，只要从这个数组找出来就行了

        //改变 新建圈子标题
        this.cid = cid

       for(var j = 0;j<this.circlearr.length;j++){
           if(this.circlearr[j].cid == cid){
               this.circle = this.circlearr[j]
           }
       }
       this.page = 2
    },
    async dele(cid){
        // 先删除圈子对应的贴子

        // 再删除圈子
        const bbsaxios = this.$config.getAxiosInstance('bbs')
        let resp = await bbsaxios({
            url:'/api/deleteitem',
            methods:"get",
            params:{
                cid:cid
            }
        })
        if(resp.data == 1){
            alert("删除成功")
            this.seeallcircle()
        }else{
            alert("删除失败")
        }
    //    this.page =1
      
    //    this.$router.go(0)
    
    }
    
  },
  async created() {
       
  }
};
</script>
<style lang="scss" scoped>

.navhha{
 height: 35px;
 display: flex;
 .navbut{
     width: 120px;
     margin-right: 20px;
     color: #409EFF;
     cursor: pointer;
 }
 .navbutact{
     border-bottom: 2px solid gainsboro;
 }
}
.itembox{
    border-bottom: 1px solid gainsboro;
    height: 30px;
    color: #409EFF;
    position: relative;
    .itemname{
      cursor: pointer;
        position: absolute;
        left: 10px;
    }
    .btnn{
        position: absolute;
        right: 50px;
        cursor: pointer;

    }
    .btnnn{
        position: absolute;
        right: 0;
        cursor: pointer;
    }
}




.createshop{

}
.tagname{
    width: 200px;
    line-height: 40px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>