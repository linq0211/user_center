<template>
  <div class="main">
    <el-container class="container">
      <el-aside width="200px">
        <aside-menu />
      </el-aside>
      <el-container>
        <el-header>
          <main-header />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user/user'
import asideMenu from './cpns/aside-menu.vue'
import mainHeader from './cpns/main-header.vue'

const userStore = useUserStore()
userStore.fetchCurrentUser()
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .container {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
