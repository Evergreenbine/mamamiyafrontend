<template>
  <div>
    <div v-for="item in this.itemsarr" :key="item.gid" style="margin-bottom:10px">
      <div class="gitem d-flex ">
        <img :src="item.img" alt="#">
        <div class="rightbox d-flex flex-wrap" style="border:1px solid gray">
         <div><p class="tagname">品牌名</p><el-input v-model="item.bname" class="input2"></el-input></div>
         <div><p class="tagname">价格</p><el-input v-model="item.price" class="input2"></el-input></div>
         <div><p class="tagname">推荐语</p><el-input v-model="item.recommend" class="input2"></el-input></div>
         <div><p class="tagname">阶段</p><el-input v-model="item.stage" class="input2"></el-input></div>
        <!-- 分类 -->
        <div class="item d-flex">
           <p class="tagname">分类</p> 
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
              v-for="item in brandarr"
              :key="item.value"
              :label="item.bname"
              :value="item.bid">
            </el-option>
         </el-select>
        </div>  
       <!-- 年龄 -->
      <div class="item d-flex">
        <p class="tagname">年龄</p>  
        <el-select v-model="age.value" placeholder="请选择" @change="selectage">
            <el-option
              v-for="item in age"
              :key="item.aid"
              :label="item.value"
              :value="item.aid">
            </el-option>
         </el-select>
      </div>
       <!-- 阶段 -->
      <div class="item d-flex">
        <p class="tagname">阶段</p>  
        <el-select v-model="stage.sname" placeholder="请选择" @change="selectstage">
            <el-option
              v-for="item in stage"
              :key="item.value"
              :label="item.sname"
              :value="item.sid">
            </el-option>
         </el-select>
      </div> 
    
     
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return {
        brandarr:[], 
        stage:[
            {sid:0,sname:"1段"},
            {sid:1,sname:"2段"},
            {sid:2,sname:"3段"},
            {sid:3,sname:"4段"},
            {sid:4,sname:"5段"},
        ],  
        cata:[
             { cid:0,cname:"婴幼儿奶粉"},{cid:1,cname:"羊奶粉"},{cid:2,cname:"防腹泻奶粉"}
        ],
     
        age:[{
          aid:0,
          value:"0 - 6 个月"
        },{
          aid:1,
          value:"6 - 12 个月"
        },{
          aid:2,
          value:"12 - 24 个月"
        },{
          aid:3,
          value:"24 - 36 个月"
        }], 
        itemsarr:[]
      }
  },
  methods:{
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
  },
  async created(){
      const axios = this.$config. getAxiosInstance('shop')
      let res = await axios.get('/api/milks');
      console.log(res);
      this.itemsarr = res.data.result

      
       let resp = await axios.get('/api/brand/0');
       console.log(resp);
       this.brandarr = resp.data.result
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
</style>

