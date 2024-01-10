<template>
  <div class="welcome">
    <span>欢迎用户</span>
    <h2>{{ userData.username }}</h2>
    <span>登录</span>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
</script>

<style scoped lang="less">
.welcome {
  display: flex;
  align-items: flex-end;
  span {
    font-size: 18px;
  }
  h2 {
    margin: 0 5px;
  }
}
</style>
