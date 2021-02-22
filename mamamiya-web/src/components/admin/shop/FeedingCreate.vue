<template>
  <div class="createshop">

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
      <!-- 分类 -->
       <div class="item d-flex">
        <p class="tagname">用品分类</p> 
        <el-select v-model="cata.cname" placeholder="请选择" @change="selectcata">
            <el-option
              v-for="item in cata"
              :key="item.value"
              :label="item.cname"
              :value="item.cid">
            </el-option>
         </el-select>
      </div>  
      <!-- 品牌 -->
     <div class="item d-flex">
        <p class="tagname">品牌</p> 
        <el-select v-model="brandarr.bname" placeholder="请选择" @change="selectbrand">
            <el-option
              v-for="item in this.brandarr"
              :key="item.value"
              :label="item.bname"
              :value="item.bid">
            </el-option>
         </el-select>
      </div>  
      <!-- 年龄 -->
      <div class="item d-flex">
        <p class="tagname">适用年龄</p>  
        <el-select v-model="age.value" placeholder="请选择" @change="selectage">
            <el-option
              v-for="item in this.age"
              :key="item.aid"
              :label="item.value"
              :value="item.aid">
            </el-option>
         </el-select>
      </div>  
      <!-- 阶段 -->
      <div class="item d-flex">
        <p class="tagname">适用人群</p>  
        <el-select v-model="stage.sname" placeholder="请选择" @change="selectstage">
            <el-option
              v-for="item in stage"
              :key="item.value"
              :label="item.sname"
              :value="item.sid">
            </el-option>
         </el-select>
      </div>  
      <div class="item d-flex">
        <p class="tagname">商品名</p><el-input v-model="good.gname" ></el-input>
      </div>  
      <div class="item d-flex">
        <p class="tagname">价格</p><el-input v-model="good.price" ></el-input>
      </div>  
      <div class="item d-flex">
        <p class="tagname">库存</p><el-input v-model="good.store" ></el-input>
      </div>  
      <div class="item d-flex">
        <p class="tagname">推荐语</p><el-input v-model="good.recommend" ></el-input>
      </div>  
       <div class="item d-flex">
        <p class="tagname">商品分类</p>  
        <el-select v-model="good.gcid" placeholder="请选择" @change="selectage">
            <el-option
              v-for="item in goodcata"
              :key="item.gcid"
              :label="item.gname"
              :value="item.gcid">
            </el-option>
         </el-select>
      </div> 
    
      <div class="item d-flex">
         <el-button type="success" @click="savegood">保存</el-button>
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
      goodcata:'',
      stage:[
          {sid:0,sname:"新生儿"},
          {sid:1,sname:"幼儿"},
          {sid:2,sname:"通用"},
        
      ],  
      cata:[
          { cid:0,cname:"口水巾/三角巾"}
          ,{cid:1,cname:"叉/勺/筷"}
          ,{cid:2,cname:"碗/碟/盘"}
          ,{cid:3,cname:"奶嘴咬咬乐"}
          ,{cid:4,cname:"耳勺"}
     
      ],
      brandarr:[], 
      age:[{
          aid:0,
          value:"0 - 6 个月"
      },{
          aid:1,
          value:"7 - 12 个月"
      },{
          aid:2,
          value:"1 - 3 岁"
      },{
          aid:3,
          value:"3 - 6 岁"
      }],   
      good:{
        gname:"伊利",
        price:246.00,
        store:100,
        createtime:'',
        recommend:"这奶粉真不错",
        rate:0,
        cata:0,
        stage:1,
        age:6,
        bid:0,
        img:"",
        gcid:''
    }
};
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.good.img = res.url
        // this.saveinfo()
    },
    selectcata(cid){
        this.good.cata = cid
    },
    selectstage(sid){
        this.good.stage = sid
    },
    selectbrand(bid){
        console.log(bid);
        this.good.bid = bid
    },
    selectage(aid){
        this.good.age = aid
    },
    async savegood(){
        console.log(this.good);
        const axios = this.$config.getAxiosInstance("admin");
        let res = await axios.post('/api/good',this.good)
        if(res.data == 1){
          alert("新建成功")
        }else{
          alert("新建失败")
        }
        console.log(res);
    }
  },
  async created() {
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:3,
           limit:0
         }
         });
      // 查询纸尿裤的牌子
       this.brandarr = res.data.resp

      //  查询商品的分类
      let resp = await axios.get('/api/goodcata')
      this.goodcata = resp.data
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