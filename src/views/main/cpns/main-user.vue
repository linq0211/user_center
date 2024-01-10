<template>
  <div class="user">
    <div class="search" v-if="userRole">
      <el-form :model="searchForm" label-width="80px" ref="formRef" size="large">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="searchForm.username" placeholder="请输入查询的用户名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button icon="refresh" @click="onResetClick">重置</el-button>
        <el-button icon="search" type="primary" @click="onQueryClick"> 查询 </el-button>
      </div>
    </div>
    <div class="content">
      <el-table :data="searchData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="username" label="用户名" />
        <el-table-column align="center" prop="userAccount" label="用户账户" />
        <el-table-column align="center" prop="avatarUrl" label="头像" width="100px">
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.avatarUrl" lazy />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="gender" label="性别" />
        <el-table-column align="center" prop="phone" label="电话" />
        <el-table-column align="center" prop="email" label="邮件" />
        <el-table-column align="center" prop="userStatus" label="状态" />
        <el-table-column align="center" prop="userRole" label="角色">
          <template #default="scope">
            <div class="role">
              <div
                :class="{ dot: scope.row.userRole === 1 }"
                style="font-size: 60px; border-radius: 50%"
              >
                ·
              </div>
              <div class="title">{{ scope.row.userRole === 1 ? '管理员' : '普通用户' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px" v-if="userRole">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              text
              icon="delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import useUserStore from '@/store/user/user'
import { storeToRefs } from 'pinia'
import formatDate from '@/utils/format'

const searchForm = reactive({
  username: ''
})

const userStore = useUserStore()
const { searchData, userRole } = storeToRefs(userStore)
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置
const onResetClick = () => {
  formRef.value?.resetFields()
  userStore.fetchUserSearch()
}
// 查询
const onQueryClick = () => {
  userStore.fetchUserSearch(searchForm.username)
}
// 删除
const handleDelete = (id: number) => {
  userStore.fetchDeleteUser(id)
}
</script>

<style scoped lang="less">
.user {
  .search {
    background-color: #fff;
    padding: 20px;

    .el-form-item {
      padding: 20px 30px;
      margin-bottom: 0;
    }
    .btn {
      text-align: right;
      .el-button {
        height: 36px;
      }
    }
  }
  .content {
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }

    .role {
      display: flex;
      align-items: center;
      justify-content: center;
      .dot {
        color: green;
      }
      .title {
        margin-top: 7px;
        margin-left: 3px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
