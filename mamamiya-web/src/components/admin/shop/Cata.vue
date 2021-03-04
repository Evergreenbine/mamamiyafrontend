<template>
  <div class="createshop">
    <div class="item d-flex">
      <p v-show="page == 0" @click="gradetwo" class="navitem">新建二级分类</p>
      <p v-show="page == 1" @click="gradethree" class="navitem">新建三级分类</p>
      <p v-show="page != 0" class="button" @click="page--" >返回</p>
     
    </div>
      

      <div v-show="page == 0">
          <div class="item d-flex">
            <p class="tagname">新建一级分类</p>
            <el-input v-model="goodcata.gname"></el-input>
          </div>  
         
      </div>

      <div v-show="page == 1">
        <div class="item d-flex">
          <p class="tagname">新建二级分类</p>
          <el-input  v-model="goodcata.gname" ></el-input>
        </div>  
     
        <div class="item d-flex">
            <p class="tagname">请选择一级分类</p>  
            <el-select v-model="goodcata.parrentid" placeholder="请选择" @change="selectage">
                <el-option
                  v-for="item in goodcataarr"
                  :key="item.gcid"
                  :label="item.gname"
                  :value="item.gcid">
                </el-option>
            </el-select>
        </div> 
      </div>
      <div v-show="page == 2">
        <div class="item d-flex">
          <p class="tagname">新建三级分类</p>
           <el-input  v-model="goodcata.gname" ></el-input>
        </div>  
     

     <!-- 奶粉品牌要排除的 -->
        <div class="item d-flex">
            <p class="tagname">请选择二级分类</p>  
            <el-select v-model="goodcata.parrentid" placeholder="请选择" @change="selectage">
                <el-option
                  v-for="item in goodcataarr"
                  :key="item.gcid"
                  :label="item.gname"
                  :value="item.gcid">
                </el-option>
            </el-select>
        </div> 
      </div>

      <div class="item d-flex">
            <el-button type="success" @click="savegood">保存分类</el-button>
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

    //页面变量
    page:0,
    goodcata:{
      gname:'',
      parrentid:0,
      isparrent:1,
      grade:1
    },
    goodcataarr:[],
      
};
  },
  methods: {
    async savegood(){
        const axios = this.$config.getAxiosInstance("shop");
        let res = await axios.post('/api/creategoodcata',this.goodcata)
        if(res.data == 1){
          alert("新建分类成功")

        }
    },
    // 新建二级分类
    async gradetwo(){
      this.page = 1
      // 初始化默认值,
      this.goodcata.grade = 2
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios.get('/api/getgoodcata',{
         params:{
           grade:1
         }
       });
       this.goodcataarr = res.data
    },
    // 新建三级分类
    async gradethree(){
      this.page = 2
      this.goodcata.grade = 3
      this.goodcata.isparrent = 0
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios.get('/api/getgoodcata',{
         params:{
           grade:2
         }
       });
       this.goodcataarr = res.data
    }
  },
  async created() {
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios.get('/api/getgoodcata',{
         params:{
           grade:1
         }
       });
       this.goodcataarr = res.data
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

  .navitem{
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
      border-bottom:1px solid #409EFF;
  }
  .button{
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-bottom:1px solid #409EFF;
    margin-left: 20px;
  }
</style>