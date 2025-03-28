import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cep',
      name: 'cep',
      component: () => import('../views/cep.vue')
    },
    {
      path: '/gov-x',
      name: 'gov-x',
      component: () => import('../views/Gov-X.vue')
    }
  ]
})

export default router
