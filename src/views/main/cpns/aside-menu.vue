<template>
  <div class="aside-menu">
    <div class="top">
      <img src="../../../assets/img/logo.svg" alt="" />
      <h2 class="title">用户中心</h2>
    </div>
    <div class="menu">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path === '/main/user' ? '2' : '1'"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#0b1a28"
      >
        <el-menu-item index="1" @click="handleWelcome">
          <span>欢迎</span>
        </el-menu-item>
        <el-menu-item index="2" @click="handleClick">
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleWelcome = () => {
  router.push('/main/welcome')
}
const handleClick = () => {
  router.push('/main/user')
}
</script>

<style scoped lang="less">
.aside-menu {
  height: 100%;
  background-color: #0b1a28;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    img {
      width: 30px;
    }
    .title {
      margin-left: 5px;
      color: #b7bdc3;
    }
  }
}
</style>
