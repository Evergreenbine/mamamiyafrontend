<template>
    <div id ="test" >
       <div class="hello">6</div>
       <div class="hello">6</div>
       <div class="hello">6</div>
       <div class="hello">6</div>
       <div class="hello">6</div>
    </div>
</template>
<script>
export default {
    name:'Test'
}
</script>
<style>
#test{
    display: flex;
}
.hello{
 border: 5px solid slateblue;
 width: 100px;
 height: 100px;
 font-size: 100px;
 margin-left: 10px;
}
</style>