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
           <p class="tagname">尿裤分类</p> 
           <el-select v-model="item.cata" placeholder="请选择" >
              <el-option
                 v-for="cataitem in cata"
                 :key="cataitem.cid"
                 :label="cataitem.cname"
                 :value="cataitem.cid">
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
        <p class="tagname">尺码</p>  
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
          {sid:0,sname:"s码"},
          {sid:1,sname:"m码"},
          {sid:2,sname:"l码"},
          {sid:3,sname:"xl码"},
          {sid:4,sname:"xxl码"},
      ],  
      cata:[
          { cid:0,cname:"婴儿尿裤"},{cid:1,cname:"拉拉裤"},{cid:2,cname:"婴儿纸尿片"}
      ],
      brandarr:[], 
      age:[{
          aid:0,
          value:"0 - 3 个月"
      },{
          aid:1,
          value:"3 - 6 个月"
      },{
          aid:2,
          value:"6 - 9 个月"
      },{
          aid:3,
          value:"9 - 12 个月"
      }],
        itemsarr:[]
      }
  },
  methods:{
    async updateitem(item){
      console.log(item);
      const axios = this.$config. getAxiosInstance('admin')
      let res = await axios.post('/api/ugood',item)
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
       let res = await axios({url:'/api/milk',params:{gcid:2}});
     
      console.log(res);
      this.itemsarr = res.data.result

      
       let resp =  await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:2,
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

