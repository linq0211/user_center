<template>
  <div class="panel-account">
    <el-form
      :model="accountForm"
      label-width="80px"
      :rules="accountRules"
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="accountForm.userAccount" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="accountForm.userPassword" show-password placeholder="请输入密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import useUserStore from '@/store/user/user'
import type { IUser } from '@/type'

// 绑定表单及数据
const accountForm = reactive<IUser>({
  userAccount: '',
  userPassword: ''
})

// 定义账号校验规则
const accountRules: FormRules = {
  userAccount: [{ required: true, message: '必须输入用户名', trigger: 'blur' }],
  userPassword: [{ required: true, message: '必须输入密码', trigger: 'blur' }]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const userStore = useUserStore()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const { userAccount, userPassword } = accountForm

      userStore.fetchUserLogin({ userAccount, userPassword })
    }
  })
}

// 将子组件的属性方法暴露给父组件
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.panel-account {
  width: 300px;
}
</style>
