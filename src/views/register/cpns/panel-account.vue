<template>
  <div class="panel-account">
    <el-form :model="accountForm" :rules="accountRules" size="large" ref="formRef">
      <el-form-item prop="userAccount">
        <el-input
          v-model="accountForm.userAccount"
          placeholder="请输入账号"
          prefix-icon="userFilled"
        />
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input
          v-model="accountForm.userPassword"
          show-password
          placeholder="请输入密码"
          prefix-icon="lock"
        />
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model="accountForm.checkPassword"
          show-password
          placeholder="请再次输入密码"
          prefix-icon="lock"
        />
      </el-form-item>
      <el-form-item prop="planetCode">
        <el-input
          v-model="accountForm.planetCode"
          placeholder="请输入星球编号"
          prefix-icon="discount"
        />
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
  userPassword: '',
  checkPassword: '',
  planetCode: ''
})

// 校验确认密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
    // password 是表单上绑定的字段
  } else if (value !== accountForm.userPassword) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

// 定义账号校验规则
const accountRules: FormRules = {
  userAccount: [
    { required: true, message: '必须输入用户名', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]{4,}$/,
      message: '用户名必须是 4 位以上数字或字母组成',
      trigger: 'blur'
    }
  ],
  userPassword: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      min: 8,
      message: '密码必须是 8 位以上数字或字母组成',
      trigger: 'blur'
    }
  ],
  checkPassword: [
    { required: true, validator: validatePass, trigger: 'blur' },
    {
      min: 8,
      message: '密码必须是 8 位以上数字或字母组成',
      trigger: 'blur'
    }
  ],
  planetCode: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    {
      max: 5,
      message: '星球编号不能超过 5 位',
      trigger: 'blur'
    }
  ]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const userStore = useUserStore()
const registerAction = () => {
  formRef.value?.validate((valid) => {
    if (valid && accountForm.checkPassword === accountForm.userPassword) {
      const { userAccount, userPassword, checkPassword, planetCode } = accountForm

      userStore.fetchUserRegister({ userAccount, userPassword, checkPassword, planetCode })
    }
  })
}

// 将子组件的属性方法暴露给父组件
defineExpose({
  registerAction
})
</script>

<style scoped lang="less">
.panel-account {
  width: 300px;
}
</style>
