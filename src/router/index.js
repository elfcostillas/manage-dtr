import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/components/auth/LoginPage.vue'
import InstallmentPage from '@/components/deductions/installments/MainPage.vue'
import GovtLoanPage from '@/components/deductions/gov-deductions/MainPage.vue'

import UnpostedPayrollRegister from '@/components/payroll-register/unposted/MainPage.vue'
import CompensationPage from '@/components/compensation/MainPage.vue'
import CanteenPage from '@/components/deductions/canteen/MainPage.vue'
import PostedMainPage from '@/components/payroll-register/posted/MainPage.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta : {
        auth : true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
      meta : {
        auth : true,
      }
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
      component : LoginPage,
      meta : {
        auth : false,
      }
    },
    {
      path : '/deductions/installments',
      name : 'installments',
      component : InstallmentPage
    },
    {
      path : '/deductions/canteen',
      name : 'canteen',
      component : CanteenPage,
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
    {
      path : '/payroll-regitser/posted',
      name : 'posted',
      component : PostedMainPage
    }
  ],
});



router.beforeEach(async(to,from) => {
  const authStore = useAuthStore();
  await authStore.fetchUser();

  // console.log(to.meta.auth,authStore.isLoggedIn,to);
  // console.log('before anything else ',to.meta.auth, !authStore.isLoggedIn );

  // console.log(to.fullPath == 'login');

  console.log(authStore.isLoggedIn , to.fullPath);

  if(authStore.isLoggedIn == true && to.fullPath == '/login')
  {
    console.log('case 1');
    return { name : 'dashboard' };
   
  }

  if(authStore.isLoggedIn == false && to.fullPath != '/login')
  {
    console.log('case 2');
    return { name : 'login' };
    
  }
 
});

export default router
