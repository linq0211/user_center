<template>
  <div class="main-header">
    <div class="crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="message">
          <el-avatar :size="20" :src="userData.avatarUrl" />
          <span class="name">{{ userData.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLoginOut">用户注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const handleLoginOut = () => {
  userStore.fetchUserLoginOut()
}
</script>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  .info {
    .message {
      display: flex;
      align-items: center;
      cursor: pointer;
      // 取消选中时的黑框
      &:focus-visible {
        outline: none;
      }
      .name {
        margin-left: 5px;
      }
    }
  }
  .info {
    // 下拉菜单内容位于根元素app的外面
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
