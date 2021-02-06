<template>
  <div id="userinfoma" class="max-width margin-auto">
    <div class="indextag">
      <div class="tag" @click="backindex"> 首页</div>
      <div class="tag" @click="pid =1" :class="{tagctive:pid == 1}"> 个人中心</div>
      <div class="tag" @click="pid =2" :class="{tagctive:pid == 2}"> 编辑资料</div>
      <div class="tag" @click="pid =3" :class="{tagctive:pid == 3}"> 发布帖子</div>
    </div>
    <!-- 第一页 -->
   <div class="infobox position-re" v-show="pid == 1">
  
      <div class="ingoimg position-ab">
      
          <img class="avatar-uploader inoimga avatar" v-if="user.avator" :src="user.avator" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     
      </div>
      <div class="detailinfo">
        <p>昵称</p>
        <b-form-input  readonly v-model="user.username" :placeholder="user.username == '' ? '请输入用户名':user.username" class="accountnam margin-auto"></b-form-input>
        <!-- <el-input v-model="user.username" class="accountnam margin-auto"></el-input> -->
        <p>用户账号</p>
        <b-form-input  readonly :placeholder="user.useraccount == '' ? '请输入用户账号':user.useraccount" class="address margin-auto"></b-form-input>
        <!-- 这里修改了,要把它本地缓存删了，重新登录才行，现在测试暂时不修改 -->
        <p>用户密码</p>
        <b-form-input  readonly v-model="user.password" :placeholder="user.password == '' ? '请输入密码':user.password" class="address margin-auto"></b-form-input>
        <P>收货地址</P>
        <b-form-input  readonly v-model="user.address" :placeholder="user.address == '' ? '请输入收获地址':user.address" class="address margin-auto"></b-form-input>
      
      </div>
    </div>
    <!-- 第二页 -->
    <div class="infobox position-re" v-show="pid == 2">
  
      <div class="ingoimg position-ab">
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="user.avator" :src="user.avator" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="detailinfo">
        <p>昵称</p>
        <b-form-input @blur="saveinfo" v-model="user.username" :placeholder="user.username == '' ? '请输入用户名':user.username" class="accountnam margin-auto"></b-form-input>
        <!-- <el-input v-model="user.username" class="accountnam margin-auto"></el-input> -->
        <p>用户账号</p>
        <b-form-input  readonly :placeholder="user.useraccount == '' ? '请输入用户账号':user.useraccount" class="address margin-auto"></b-form-input>
        <!-- 这里修改了,要把它本地缓存删了，重新登录才行，现在测试暂时不修改 -->
        <p>用户密码</p>
        <b-form-input @blur="saveinfo" v-model="user.password" :placeholder="user.password == '' ? '请输入密码':user.password" class="address margin-auto"></b-form-input>
        <P>收货地址</P>
        <b-form-input @blur="saveinfo" v-model="user.address" :placeholder="user.address == '' ? '请输入收获地址':user.address" class="address margin-auto"></b-form-input>
     
      </div>
    </div>
    <!-- 第3页 -->
    <div class="infobox position-re" v-show="pid == 3">
      <div class="postcontent">
        <div class="titlebox d-flex" >
          <p class="titleword">标题</p>
          <el-input v-model="post.content" placeholder="请输入标题" style="margin-right:10px"></el-input>
           <!-- this.circle.canme 怎么就不行咧？ -->
           <el-select v-model="circle.cname" slot="prepend" placeholder="请选择圈子" >
             <el-option :label="item.cname" :value="item.cid" v-for="(item,index) in this.circle" :key="index">
             </el-option>
         
           </el-select>

        </div>
        
        <FullTextEditor/>

         <b-button variant="outline-primary" class="publish">发布</b-button>
      </div>
     
    </div>
  </div>
</template>

<script>
import FullTextEditor from '../FullTextEditor'

export default {
    name:"user",
    data() {
      return { 
        // 控制变量
        pid:3,
        user:{
          username:'',
          useraccount:'',
          password:'',
          address:'',
          avator: ''
        },
        post:{
          title:'',
          content:'',
          author:this.username,
          time:new Date(),
          useraccount:this.useraccount,
          cid:''
        },
        circle:[]
  
      }
    },
    components:{
      FullTextEditor
    },
    methods: {
      async saveinfo(){
        // alert("hah")
       const axios = this.$config.getAxiosInstance('user')
       let resp = await axios.post('/api/user',this.user)
       
      },
      backindex(){
        this.$router.push("/")
      },
      // 上传头像
       handleAvatarSuccess(res, file) {
        this.user.avator = res.url
        this.saveinfo()
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    async created() {
       
       const axios = this.$config.getAxiosInstance('user')
       let resp = await axios.get('/api/user/1170559835')
       let result =resp.data.result;
       this.user.username = result.username
       this.user.password = result.password
       this.user.useraccount = result.useraccount
       this.user.avator = result.avator
       this.user.address = result.address

       const bbsaxios = this.$config.getAxiosInstance('bbs')
       let resp2 = await bbsaxios.get('/api/circle')
       let result2 = resp2.data.result
       this.circle = result2
       console.log(result2);
     
    }
  
}
</script>

<style lang="scss" scoped>
// 第一第二页
#userinfoma{
  // border: 1px solid gainsboro;
  height: 500px;
  margin-top: 100px;
  position: relative;
}
.indextag{
  float: left;;
  width: 83px;
  height: inherit;
  // border: solid gold 1px;
}
.infobox{
  position: absolute;
  width: 1015px;
  height: inherit;
  border: solid gainsboro 1px;
  right: 0px;
}
.ingoimg{
  left: 50px;
  top: 50px;
  width: 178px;
  height: 178px;
  // border: 1px solid blueviolet;
}
.inoimga{
  width: 178px;
  height: 178px;
  // border: 1px salmon solid;
  box-shadow: 1px silver;
}
.detailinfo{
  top: 50px;
  right: 120px;
  position: absolute;
  width: 550px;
  height: 500px;
  
  // border: 1px solid gold; 
}
.accountnam{
  margin-top: 10px;
  width: 500px;
  height: 45px;
  // border: 1px solid green;
  margin-bottom: 10px;
}
.address{
  margin-top: 10px;
  width: 500px;
  height: 45px;
   margin-bottom: 10px;
  // border: 1px solid green;
}
.tag{
  cursor: pointer;
  margin-top: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 85px;
  height: 45px;
  border: 1px solid gainsboro;
  border-right: none;
  line-height: 45px;
  

}
.tagctive{
 background-color: rgb(218, 216, 216);
}
p{
  margin: 0;
  padding: 0;
  margin-top: 3px;
}
// 编辑头像
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
// 第三页
  .bbcard{
    width: 500px;
  }
  .postcontent{
    position: absolute;
    // border: 1px solid gold;
    left: 157.5px;
    height: 500px;
  }
  .titleword{
    width: 80px;
    line-height: 40px;
  }
  .titlebox{
    margin-top: 10px;
  }
  .publish{
    position: absolute;
    bottom: 8px;
    right: 0px;
    width: 200px;
  }
</style>

