<template>
  <el-container class="container">
    <el-header class="header">
      
      <p>管理界面</p>
      <div>
      <el-button class="layoutbutton" link ="true" style="color: #fff; font-size: 17px" @click="out()" >
        登出
      </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-icon ><UserFilled style="width: 2em; height: 0.9em; " /></el-icon>
      <span>{{ account }}</span>
      </div>
      
    </el-header>

    <el-container>
      <el-aside class="aside">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#20a0ff"
        >
          <el-menu-item index="1">
            <el-icon><SwitchFilled /></el-icon>
            <span slot="title">审核课程</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Calendar /></el-icon>
            <span slot="title">安排课程</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><View /></el-icon>
            <span slot="title">查看教室安排</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Search /></el-icon>
            <span slot="title">搜索</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "ManagerPage",

  data(){
    return{
      account:'',
    }
  },
  created() {
    this.getAccount();
  },
  methods: {
    getAccount(){
      this.account=this.$route.query.account;
    },
    out(){
      this.$router.push({path:"/"});
    }
  }
};
</script>
<style scoped>
.container {
  height: 100vh;
  font-size: 15px;
}
.header {
  background: #242f42;
  color: #fff;
  display: flex;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 7%; */
 
}
.aside {
  background: #324157;
  color: #fff;
  width: 200px;
  /* height: 100%; */
}
.main {
  /* height: 100%; */
  color: #212121;
}


.layoutbutton:hover {
  color: rgb(12, 137, 246) !important;
  font-weight: bold;
}
</style>