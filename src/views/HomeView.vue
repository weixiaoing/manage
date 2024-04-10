<!-- 主页 -->
<script setup>
import { UserService } from '@/api/api'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
// 用户退出
const quit = async () => {
  // 获取用户变量
  let userStore = useUserStore()
  // 请求退出
  const res = await UserService.logout()
  if (res.code == 200) {
    // 请求成功,设置用户数据为空
    userStore.token = ''
    userStore.isAdmin = undefined
    // 弹出请求成功
    ElMessage({
      message: '退出成功',
      type: 'success'
    })
  }
}
// 获取路由
const router = useRouter()
</script>
<template>
  <div class="container">
    <!-- 菜单,点击相应item跳转到相应页面 -->
    <div class="menu">
      <!-- 设置激活值为当前页面地址 -->
      <el-menu router style="height: 100%" :default-active="router.currentRoute.value.fullPath">
        <el-menu-item index="/key"><span>关键词审核</span> </el-menu-item>
        <el-sub-menu index="/notice">
          <template #title>
            <span>公告</span>
          </template>
          <el-menu-item index="/notice"><span>公告列表</span> </el-menu-item>
          <el-menu-item index="/newnotice"><span>新建公告</span> </el-menu-item>
        </el-sub-menu>
        <!-- 点击后触发quit退出函数 -->
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
