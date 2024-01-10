import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('../views/login/login.vue') },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/register.vue')
    },
    { path: '/main', redirect: '/main/user' },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue'),
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('../views/main/cpns/main-welcome.vue'),
          meta: {
            title: '欢迎用户'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/main/cpns/main-user.vue'),
          meta: {
            title: '用户管理'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/notFound.vue')
    }
  ]
})

export default router
