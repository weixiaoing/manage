<script setup>
import { UserService } from '@/api/api'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const quit = async () => {
  let userStore = useUserStore()
  const res = await UserService.logout()
  if (res.code == 200) {
    userStore.token = ''
    userStore.isAdmin = undefined
    ElMessage({
      message: '退出成功',
      type: 'success'
    })
  }
}
const router = useRouter()
</script>
<template>
  <div class="container">
    <div class="menu">
      <el-menu router style="height: 100%" :default-active="router.currentRoute.value.fullPath">
        <el-menu-item index="/key"><span>关键词审核</span> </el-menu-item>
        <el-sub-menu index="/notice">
          <template #title>
            <span>公告</span>
          </template>
          <el-menu-item index="/notice"><span>公告列表</span> </el-menu-item>
          <el-menu-item index="/newnotice"><span>新建公告</span> </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/login" @click="quit"><span>退出登录</span></el-menu-item>
      </el-menu>
    </div>
    <div class="content"><RouterView /></div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  background-color: white;
  min-height: 100vh;
  .menu {
    width: 20%;
    border-radius: 10px;
  }
  .content {
    display: flex;
    padding-left: 30px;
    width: 100%;
  }
}
</style>
