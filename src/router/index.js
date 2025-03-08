import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/components/auth/LoginPage.vue'
import InstallmentPage from '@/components/deductions/installments/MainPage.vue'
import GovtLoanPage from '@/components/deductions/gov-deductions/MainPage.vue'

import UnpostedPayrollRegister from '@/components/payroll-register/unposted/MainPage.vue'
import CompensationPage from '@/components/compensation/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path : '/login',
      name : 'login',
      component : LoginPage
    },
    {
      path : '/deductions/installments',
      name : 'installments',
      component : InstallmentPage
    },
    {
      path : '/deductions/govt-loans',
      name : 'govt-loans',
      component : GovtLoanPage
    },
    {
      path : '/payroll-regitser/unposted',
      name : 'unposted',
      component : UnpostedPayrollRegister
    },
    {
      path : '/compnesation/other-earnings',
      name : 'other-earnings',
      component : CompensationPage
    },
  ],
})

export default router
