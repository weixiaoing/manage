import { createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { createWebHashHistory } from 'vue-router'
// 路由文件
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      // 主路由
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/key',
      // 嵌套的子路由
      children: [
        {
          path: '/key',
          name: 'key',
          component: () => import('../views/KeyView.vue')
        },
        {
          path: '/notice',
          name: 'notice',
          component: () => import('../views/NoticeView.vue')
        },
        {
          path: '/newnotice',
          name: 'newnotice',
          component: () => import('../views/NewNotice.vue')
        }
      ]
    },
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断是不是到登录页面
  if (to.name != 'login') {
    // 获取token
    const userStore = useUserStore()
    const Admin = userStore.isAdmin
    if (!Admin) {
      // token不存在，则跳转到登录页
      next('/login')
    } else {
      // token存在，则跳转到响应路由
      next()
    }
  }
  // 是登录页面就直接跳转到登录
  else {
    next()
  }
})

export default router
