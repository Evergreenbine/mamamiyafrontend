<template>
  <div id="userinfoma" class="max-width margin-auto">
    <div class="indextag">
      <div class="tag" @click="backindex"> 首页</div>
      <div class="tag" @click="pid =1"> 个人中心</div>
      <div class="tag" @click="pid =2"> 编辑资料</div>
    </div>
    <div class="infobox position-re" v-show="pid == 1">
      <div class="ingoimg position-ab">
        {{this.pid}}
         <img class="inoimga" :src=this.url alt="">
      </div>
      <div class="detailinfo">
        <p>昵称</p>
         <div class="accountnam margin-auto"></div>
         <p>用户账号</p>
         <div class="address margin-auto"></div>
         <p>收货地址</p>
         <div class="address margin-auto"></div>
      </div>
    </div>
    <div class="infobox position-re" v-show="pid == 2">
      {{this.pid}}
      <div class="ingoimg position-ab">
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="detailinfo">
        <p>昵称</p>
         <div class="accountnam margin-auto"></div>
         <p>用户账号</p>
         <div class="address margin-auto"></div>
         <p>收货地址</p>
         <div class="address margin-auto"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"user",
    data() {
      return { 
        // 控制变量
        pid:1,
        imageUrl: 'https://gw.alicdn.com/img/bao/uploaded/i1/3096670448/O1CN01Ax9Jfl1FBDuTsjYYe_!!3096670448.jpg_300x300.jpg'
        

      }
    },
    methods: {
      backindex(){
        this.$router.push("/")
      },
      // 上传头像
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
       console.log(axios);
     
    }
  
}
</script>

<style lang="scss" scoped>
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
  width: 450px;
  height: 55px;
  border: 1px solid green;
}
.address{
  margin-top: 20px;
   width: 450px;
  height: 55px;
  border: 1px solid green;
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
</style>

