<template>
  <div>
      <BBsHeader/>
      <div class="d-flex fd-rows">
      <div class="leftbar">
      </div>
      <div class="middle max-width margin-auto d-flex" >
          <div class="leftbody d-flex fd-column">
              <img class="avatorimg" :src=this.user.avator />
              {{this.user.username}}
          </div>
          <div class="rightbody">
            <div class="posttitle" ><h2>{{this.res.title}}</h2></div>
            <div class="postcontent" v-html="this.res.content">{{this.res.content}}</div>
          </div>
      </div>
      <div class="rightbar"></div>
      </div>
  </div>
</template>

<script>
import BBsHeader from './header/BBSHeader'
export default {
    data() {
        return {
            user:{
                avator:'',
                username:'',
            },
            res:''
        }
    },
    components:{
        BBsHeader
    },
   async created(){
       let pid = this.$route.query.pid
       let cid = this.$route.query.cid
       let useraccount = this.$route.query.useraccount
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
             url:'/api/posts',
             method:'get',
             params:{
                 cid:cid,
                 pid:pid,
                 useraccount:useraccount
                //  useraccount:JSON.parse(localStorage.getItem('username'))
             }
         })
    
         this.res = res.data.result[0]
         this.user.avator = this.res.avator
         this.user.username = this.res.username
        console.log(this.user.avator);
    }
}
</script>

<style lang="scss" scoped>
.leftbar{
    // float: left;
    width: 150px;
    height: 1000px;
    // border: 1px solid gray;
}
.middle{
    // float: left;
    border: 1px solid rgb(240, 238, 238);
    // height: 200px;
}
.rightbar{
    // float: right;
     width: 150px;
    height: 1000px;
    // border: 1px solid gray;
   
}
.posttitle{
    margin-top: 20px;
}
.postcontent{
    margin-top: 20px;
}
.leftbody{
    width: 300px;
    height: 200px;
    // border: 1px solid gainsboro;
}
.avatorimg{
    width: 152px;
    height: 152px;
    // border: 1px solid gainsboro;
}
</style>

