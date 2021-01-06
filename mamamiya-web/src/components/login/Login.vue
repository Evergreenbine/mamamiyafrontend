<template>
    <div id="login">
        <div id="header3" class="d-flex fd-row jc-center">  
            <router-link to="/" class="header3-box">首页</router-link>
            <router-link to="/counter" class="header3-box">知识</router-link>
            <router-link to="/counter" class="header3-box">论坛</router-link>
            <router-link to="/counter" class="header3-box">问答</router-link>
        </div>
        <div id="mainpanel" class="d-flex jc-center">
           <router-view/>
        </div>   
    </div>
</template>
<script>
export default {
    name:"login"
}
</script>

<style>
#header3{
    height: 60px;
    background: rgb(230, 230, 230);
}
.header3-box{
    width: 200px;
    height: 70px;
    font-size: 25px;
    text-align: center;
    line-height: 60px;
    text-decoration: none;
    color: rgb(168, 166, 166);
}
.mainpanel{}

</style>