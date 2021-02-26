<template>
<div>
    
   <div class="navhha">
       <!-- 将cid设置为-1 是为了去除新建圈子的默认值 -->
       <div class="navbut" :class="{navbutact : page == 0 || page == 2}" @click="()=>{page = 0,cid = -1}">{{cid == -1 ? "新建":"编辑"}}圈子</div>
       <div class="navbut" :class="{navbutact : page == 1}" @click="seeallcircle">圈子列表</div>
       <div class="navbut" :class="{navbutact : page == 3}" @click="seeallcircle">查看贴子</div>
       
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
      <div v-for="(item,index) in circlearr" :key="index">
          <div class="itembox">
            <div class="itemname">   {{item.cname}}</div> 
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


</div>
</template>
<script>
export default {
  props: {
    id: ""
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
     circlearr:[]
        
     
    };
  },
  methods: {
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