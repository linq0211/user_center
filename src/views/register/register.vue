<template>
  <div class="register">
    <register-panel />
  </div>
</template>

<script setup lang="ts">
import registerPanel from './cpns/register-panel.vue'
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/img/login-bg.svg');
}
</style>
