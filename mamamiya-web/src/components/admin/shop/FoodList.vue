<template>
  <div>
    <div v-for="(item,index) in this.itemsarr" :key="index" style="margin-bottom:10px" >
      <div class="gitem d-flex " @click="getImageTypeIndex(index)">
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"

          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="item.img" :src="item.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="rightbox d-flex flex-wrap" >
         <div class="item d-flex"><p class="tagname">价格</p><el-input v-model="item.price" class="input2"></el-input></div>
         <div class="item d-flex"><p class="tagname">推荐语</p><el-input v-model="item.recommend" class="input2"></el-input></div>
         <div class="item d-flex"><p class="tagname">库存</p><el-input v-model="item.store" class="input2"></el-input></div>
         <div class="item d-flex"><p class="tagname">商品名</p><el-input v-model="item.gname" class="input2"></el-input></div>
        
        <!-- 分类 -->
        <div class="item d-flex">
           <p class="tagname">食品分类</p> 
           <el-select v-model="item.cata" placeholder="请选择" >
              <el-option
                 v-for="cataitem in cata"
                 :key="cataitem.cata"
                 :label="cataitem.cname"
                 :value="cataitem.cata">
              </el-option>
          </el-select>
        </div> 
         <!-- 品牌 -->
        <div class="item d-flex">
        <p class="tagname">品牌</p> 
        <el-select v-model="item.bid" placeholder="请选择" >
            <el-option
              v-for="branditem in brandarr"
              :key="branditem.value"
              :label="branditem.bname"
              :value="branditem.bid">
            </el-option>
         </el-select>
        </div>  
       <!-- 年龄 -->
      <div class="item d-flex">
        <p class="tagname">年龄段</p>  
        <el-select v-model="item.age" placeholder="请选择" >
            <el-option
              v-for="ageitem in age"
              :key="ageitem.aid"
              :label="ageitem.value"
              :value="ageitem.aid">
            </el-option>
         </el-select>
      </div>
       <!-- 尺码 -->
      <div class="item d-flex">
        <p class="tagname">产地</p>  
        <el-select v-model="item.stage" placeholder="请选择">
            <el-option
              v-for="stageitem in stage"
              :key="stageitem.value"
              :label="stageitem.sname"
              :value="stageitem.sid">
            </el-option>
         </el-select>
      </div> 
      <el-button type="success"  class="savebutton" @click="updateitem(item)">保存修改</el-button>
      <el-button type="danger"  class="savebutton" @click="dele(item.gid)">删除</el-button>
     
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
        // 获取当前的图片的index
        imgindex:0,
        brandarr:[], 
       stage:[
          {sid:0,sname:"国产"},
          {sid:1,sname:"进口"},
      ],  
      cata:[
          { cid:0,cname:"宝宝零食"}
          ,{cid:1,cname:"面条/粥"}
          ,{cid:2,cname:"果泥/果汁"}
          ,{cid:3,cname:"休闲零食"}
          ,{cid:5,cname:"饼干蛋糕"}
          ,{cid:6,cname:"糖果巧克力"}
          ,{cid:7,cname:"牛奶乳品"}
          ,{cid:8,cname:"钙铁锌/维生素"}
          ,{cid:9,cname:"清火/开胃"}
          ,{cid:10,cname:"益生菌/初乳"}
     
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
          value:"3岁以上"
      }],
        itemsarr:[]
      }
  },
  methods:{
    async updateitem(item){
      console.log(item);
      const axios = this.$config. getAxiosInstance('admin')
      let res = await axios.post('/api/ugood',item)
      if(res.data == 1){
        alert("修改成功")
      }
      console.log(res); 
    },
    async dele(gid){
      const axios = this.$config. getAxiosInstance('admin')
      console.log(gid);
      let res = await axios.get(`/api/demilk/${gid}`)
      window.location.reload();
      console.log(res);
      // console.log(res); 
    },
    handleAvatarSuccess(res, file) {
        // alert(res.url)
        // alert(this.imgindex);
        // 改变相应item的img
        this.itemsarr[this.imgindex].img = res.url
        // this.saveinfo()
    },
    // 获取修改图片的坐标
    getImageTypeIndex(index){
      // alert(index)
      this.imgindex = index
      // alert(this.imgindex);
    }
   
  },
  async created(){
      const axios = this.$config. getAxiosInstance('shop')
       let res = await axios({url:'/api/milk',params:{gcid:4}});
     
      console.log(res);
      this.itemsarr = res.data.result

      
       let resp =  await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:4,
           limit:0
         }
         });
       console.log(resp);
       this.brandarr = resp.data.resp
   }
  
}
</script>

<style lang="scss" scoped>
.gitem{
  width: inherit;
  // height: 100px;
  img{
    width:220px ;
    height:220px ;
  }
  .tagname{
    line-height: 40px;
    width: 100px;
  }
  input2{
    height: 20px;
  }
}
.savebutton{
  width: 100px;
  height: 45px;
  margin-left: 10px;
}
</style>

