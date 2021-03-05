<template>
  <div class="createshop">
    <div class="item d-flex">
      <p v-show="page == 0" @click="gradetwo" class="navitem">新建二级分类</p>
      <p v-show="page == 1" @click="gradethree" class="navitem">新建商品</p>
      <p v-show="page != 0" class="button" @click="()=>{
         page--
         this.good.parrentid = 0
         this.good.grade =1
        }" >返回</p>
     
    </div>
      

      <div v-show="page == 0">
          <div class="item d-flex">
            <p class="tagname">新建一级分类</p>
            <el-input v-model="goodcata.gname"></el-input>
          </div>  
         
      </div>

      <div v-show="page == 1">

          <div class="item d-flex">
            <p class="tagname">请选择一级分类</p>  
            <el-select v-model="goodcata.parrentid" placeholder="请选择" @change="recordgid" >
                <el-option
                  v-for="item in goodcataarr"
                  :key="item.gcid"
                  :label="item.gname"
                  :value="item.gcid">
                </el-option>
            </el-select>
          </div>

        <div class="item d-flex" >
        <p @click="gshow =1">添加分类</p>
        </div>

        <div v-show="gshow == 1">
        <div class="item d-flex" >
          <p class="tagname">新建二级分类</p>
          <el-input  v-model="goodcata.gname" ></el-input>
        </div>  
         <div class="item d-flex">
            <el-button type="success" @click="savegood" v-show="page != 2">保存分类</el-button>
         </div>
         </div>
    
        
      </div>
      <div v-show="page == 2">


         <div class="item d-flex">
            <p class="tagname">请选择二级分类</p>  
            <el-select v-model="goodcata.parrentid" placeholder="请选择" >
                <el-option
                  v-for="item in goodcataarr"
                  :key="item.gcid"
                  :label="item.gname"
                  :value="item.gcid">
                </el-option>
            </el-select>
        </div> 
       <div class="item d-flex">
        <p class="tagname">商品图片</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="good.img" :src="good.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>  
     
      <!-- 品牌 -->
     <div class="item d-flex">
        <p class="tagname">品牌</p> 
        <el-select v-model="brandarr.bname" placeholder="请选择"  >
            <el-option
              v-for="item in this.brandarr"
              :key="item.value"
              :label="item.bname"
              :value="item.bid">
            </el-option>
         </el-select>
      </div>  
    
      <div class="item d-flex">
        <p class="tagname">商品名</p><el-input v-model="good.gname" ></el-input>
      </div>  
     
      <div class="item d-flex">
        <p class="tagname">推荐语</p><el-input v-model="good.recommend" ></el-input>
      </div>  
     
      <div class="item d-flex">
         <el-button type="success" @click="savegood">保存</el-button>
      </div>   
     

     <!-- 奶粉品牌要排除的 -->
       
      </div>

     
    
     
  </div>
</template>
<script>
export default {
 
  data() {
    return {
    
      // 分类显示
      gshow:0,

    //页面变量
    page:0,
    // 商品
    good:{
      gcid:'',
      gname:'',
      img:'',
      sku:'',
      recommend:'',
    },
    brandarr:[],
    goodcata:{
      gname:'',
      parrentid:0,
      isparrent:1,
      grade:1
    },
    goodcataarr:[],
    // 记录一级分类,用于查询品牌
    gcid:''

      
};
  },
  methods: {
    recordgid(){
      this.gcid = this.goodcata.parrentid
      // alert(this.gcid)
    },
    async checkbrand(){
      const axios = this.$config. getAxiosInstance('shop');
      let res = await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:this.gcid,
           limit:0
         }
         });
      this.brandarr=  res.data.resp
    },
     handleAvatarSuccess(res, file) {
        this.good.img = res.url
        // this.saveinfo()
    },
    // 保存分类
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
      // 查询一级分类
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios.get('/api/getgoodcata',{
         params:{
           grade:1
         }
       });
       this.goodcataarr = res.data
    },
    // 新建商品
    async gradethree(){
      this.page = 2
      this.goodcata.grade = 3
      this.goodcata.isparrent = 0
       const axios = this.$config. getAxiosInstance('shop')
      //  查询二级分类
       let res = await axios.get('/api/getgoodcata',{
         params:{
           grade:2
         }
       });
       this.goodcataarr = res.data
       this.checkbrand()
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