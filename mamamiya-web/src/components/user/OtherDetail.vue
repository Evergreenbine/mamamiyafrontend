<template>
  <div>

       <div v-for="(item,index) in replyme" :key="index">
           <div class="itembox" >
              <img :src="item.avator" alt="">
              <p class="qtitle">问题标题:{{item.title}}</p>
              <p class="qcontent">回复内容:{{item.content}}</p>
              <p class="qtime">回复时间:{{item.createtime}}</p>
              <div class="quse" @click="ilike(item)">{{item.use == 1 ?"已采纳":"未采纳"}}</div>
           </div>
           
       </div>
        <div class="pagenav">
         <el-pagination
            @current-change="handleCurrentChange"
          :page-size="5"
          :pager-count="11"
          layout="prev, pager, next"
          :total="replymetotal">
          </el-pagination>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            replyme:[],
            replymetotal:0
        }
    },
     async created(){
            
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
           url:"/api/replyme",
           method:'get',
           params:{
             useraccount:JSON.parse(localStorage.getItem("username")),
             curpage:1
           }
           })
         this.replyme = res.data.data
         this.replymetotal = res.data.total
    },
    methods:{
        // 分页方法
        async handleCurrentChange(pageNum) {
          const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
           url:"/api/replyme",
           method:'get',
           params:{
             useraccount:JSON.parse(localStorage.getItem("username")),
             curpage:pageNum
           }
           })
         this.replyme = res.data.data
         this.replymetotal = res.data.total
        //  alert(resp.data.totalpage)
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
    //   采纳
    async ilike(item){
        if(item.use == 0){
         let rid =item.rid
          const bbsaxios = this.$config.getAxiosInstance('bbs')
          let res  = await bbsaxios.get(`/api/passreply/${rid}`)
          if(res.data == 1){
              this.$router.go(0)
          }}else{
              alert("该回答已经采纳")
          }
    }

    }
}
</script>

<style lang="scss" scoped>
.itembox{
    width: 960px;
    height: 100px;
    border: 1px solid gainsboro;
    margin-bottom: 5px;
    position: relative;
    img{
        width: 82px;
        height: 82px;
        border: 1px solid gainsboro;
        position: absolute;
        left: 9px;
        top:9px;
    }
    .qtitle{
        position: absolute;
        top: 9px;
        left: 120px;
        color: grey;
    }
    .qcontent{
        position: absolute;
        top: 30px;
        left: 120px;
        color: grey;
    }
    .qtime{
        position: absolute;
        top: 60px;
        left: 120px;
        color: grey;
    }
    .quse{
        position: absolute;
        top: 32px;
        right: 30px;
        color: grey;
        width: 120px;
        height: 35px;
        line-height: 35px;
        border: 1px solid gainsboro;
        cursor: pointer;
    }
    .quse:hover{
        border: 1px solid rgba(0, 119, 255, 0.473);
        background-color: rgba(0, 119, 255, 0.473);
        color: white;
    }
}
</style>