<template>
  <div>
      <div class="buybox margin-auto">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="margin-top:30px">
            <el-form-item label="文章编号">
              <el-input  readonly="true" v-model="this.kid"></el-input>
            </el-form-item>
            <el-form-item label="文章价格">
              <el-input readonly="true"  v-model="this.price"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="back">返回</el-button>
        <el-button @click="buy">购买</el-button>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            title:this.$route.query.title,
            kid:this.$route.query.kid,
            price:this.$route.query.price,
            useraccount:JSON.parse(localStorage.getItem("username"))
        }
    },
    methods:{
        back(){
            this.$router.push({path:'/ques/konwIndex'})
        },
        async buy(){
           let kid = this.$route.query.kid
           let price = this.$route.query.price
           let useraccount = JSON.parse(localStorage.getItem("username"))
       
           const bbsaxios = this.$config.getAxiosInstance('bbs')
           let res = await bbsaxios({
               url:"/api/knows/purchase",
               methods:"get",
               params:{
                  kid: kid,
                  price:price,
                  useraccount:useraccount
               }
           }) 

           if(res.data == 1){
              alert("支付成功")
              this.$router.push({
                  path:'/ques/konw',
                  query:{
                      kid:kid
                  }
              })

           }else{
               alert("支付失败")
           }
        }
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
.buybox{
    margin-top: 20px;
    width: 800px;
    height: 300px;
    border: 1px solid gainsboro;
}
</style>