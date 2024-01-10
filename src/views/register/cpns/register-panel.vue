<template>
  <div class="register-panel">
    <div class="top">
      <img src="../../../assets/img/logo.svg" alt="" />
      <h2 class="title">用户中心</h2>
    </div>

    <div class="tabs">
      <el-tabs v-model="tabActive" type="border-card" stretch>
        <el-tab-pane name="account">
          <!-- tab的 label 标题插槽 -->
          <template #label>
            <div class="icon" @click="onBackClick">
              <el-icon><back /></el-icon>
            </div>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号注册</span>
            </div>
          </template>

          <!-- tab的具体内容 -->
          <panel-account ref="accountRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-button class="login-btn" type="primary" size="large" @click="onLoginBtnClick">
      立即注册
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import panelAccount from './panel-account.vue'
import { useRouter } from 'vue-router'
const tabActive = ref('account')
const accountRef = ref<InstanceType<typeof panelAccount>>()
const onLoginBtnClick = () => {
  accountRef.value?.registerAction()
}

// 返回按钮
const router = useRouter()
const onBackClick = () => {
  router.back()
}
</script>

<style scoped lang="less">
.register-panel {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
    }
    .title {
      margin-left: 5px;
    }
  }
  .tabs {
    margin: 15px 0;
    position: relative;
    .icon {
      position: absolute;
      left: 20px;
      top: 10px;
      font-size: 20px;
      font-weight: 600;
    }
    .label {
      display: flex;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 5px;
    // --el-button-size: 50px !important;
  }
}
</style>
