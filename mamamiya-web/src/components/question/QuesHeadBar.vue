<template>
<div>
     <TopBar/>
<div id="gaga">
   
  <div id="quesheadbar"  class="max-width margin-auto position-re">
      
      <div class="queslogo">
          育儿知识
      </div>
      <div class="search">
          
      </div>
      <div class="quescata max-width">
          <div class="quesitem">准备怀孕</div>
          <div class="quesitem">怀孕期</div>
          <div class="quesitem">分娩必读</div>
          <div class="quesitem">婴幼儿期</div>
          <div class="quesitem bbnn">幼儿期</div>
      </div>
  </div>
</div>
</div>
</template>

<script>
import TopBar from '../TopBar'
export default {
    data() {
        return {
          
        }
    },
    methods:{
       
    },
    components:{
        TopBar
    }
}
</script>

<style lang="scss" scoped>
   
  
     #quesheadbar{
        height: 150px;
        // border: 1px solid green;
    }
    .queslogo{
        clear: both;
        position: absolute;
        color: rgba(110, 165, 28, 0.507);
        font-size: 50px;

    }
    .search{
        clear: both;
        position: absolute;
        right: 0;
        height: 50px;
        width: 800px;
        border: solid 1px green ;
        top: 18px;
    }
    .quescata{
        
        position: absolute;
        height: 50px;
        // border: 1px solid green;
        bottom: 0;
        .quesitem{
             float: left;
             width: 220px;
             font-size: 18px;
             line-height: 50px;
             font-weight: 550;
             color: white;
             background-color:  rgba(51, 190, 132, 0.507);
             border-right: 1px solid white;
             cursor: pointer;
        }
        .bbnn{
             border-right: 1px solid rgba(51, 190, 132, 0.507);
        }
    }
</style>

