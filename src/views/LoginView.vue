<script setup>
import { UserService } from '@/api/api'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
let userStore = useUserStore()
let username = ref('')
let password = ref('')
const submit = async () => {
  const res = await UserService.login({ email: username.value, password: password.value })
  if (res.code === 200) {
    userStore.token = res.data.token
    const info = await UserService.getInfo()
    if (info.code === 200 && info.data.role == 'admin') {
      userStore.isAdmin = true
      router.push({ name: 'key' })
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
      return
    }
  }
  ElMessage({
    message: '登录失败',
    type: 'error'
  })
}
</script>
<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input type="text" v-model="username" placeholder="username" class="input-item" />
        <input type="password" v-model="password" placeholder="password" class="input-item" />
        <div @click="submit" class="btn">Login</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
  cursor: pointer;
}
.msg {
  text-align: center;
  line-height: 88px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
