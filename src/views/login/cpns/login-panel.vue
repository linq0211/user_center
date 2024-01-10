<template>
  <div class="login-panel">
    <div class="top">
      <img src="../../../assets/img/logo.svg" alt="" />
      <h2 class="title">用户中心</h2>
    </div>

    <div class="tabs">
      <el-tabs v-model="tabActive" type="border-card" stretch>
        <el-tab-pane name="account">
          <!-- tab的 label 标题插槽 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>

          <!-- tab的具体内容 -->
          <panel-account ref="accountRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部信息 -->
    <div class="pwd" v-if="tabActive === 'account'">
      <el-link :underline="false" @click="onRegisterUser">新用户注册</el-link>
    </div>

    <el-button class="login-btn" type="primary" size="large" @click="onLoginBtnClick">
      立即登录
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
  accountRef.value?.loginAction()
}

const router = useRouter()
const onRegisterUser = () => {
  router.push('/register')
}
</script>

<style scoped lang="less">
.login-panel {
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
    .label {
      display: flex;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }

  .pwd {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
    // --el-button-size: 50px !important;
  }
}
</style>
