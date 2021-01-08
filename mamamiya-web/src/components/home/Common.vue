<template>
  <div id="Common">
      <div class="navbar margin-auto max-width ">
      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
      </div>
  </div>
</template>

<script>
export default {
    name:"Common"
}
</script>

<style  scoped>
.navbar{
    height: 300px;
    border: 1px solid palegreen;
}
</style>>

</style>