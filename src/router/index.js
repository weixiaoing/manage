import { createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/key',
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
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要进行鉴权
  // 获取token
  if (to.name != 'login') {
    const userStore = useUserStore()
    const Admin = userStore.isAdmin
    if (!Admin) {
      // token不存在，则跳转到登录页
      next('/login')
    } else {
      // token存在，则进行下一步路由
      next()
    }
  } else {
    next()
  }
})

export default router
