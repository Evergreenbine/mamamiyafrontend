<template>
  <div class="createshop">
       <div class="item d-flex">
        <p class="tagname">品牌图片</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="brand.img" :src="brand.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div> 
      <div class="item d-flex">
        
        <p class="tagname">品牌名</p><el-input ></el-input>
      </div>  
      <div class="item d-flex">
         <el-button type="success" @click="savegood">保存</el-button>
      </div>  
  </div>
</template>
<script>
export default {
  data() {
    return {
       brand:{
         
       }
    };
  },
  methods: {
    
    async savegood(){
        
        const axios = this.$config.getAxiosInstance("admin");
        let res = await axios.post('/api/good')
        console.log(res);
    }
  },
  async created() {
       
  }
};
</script>
<style lang="scss" scoped>
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