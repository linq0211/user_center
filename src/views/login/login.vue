<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from './cpns/login-panel.vue'
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/img/login-bg.svg');
}
</style>
