import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/components/auth/LoginPage.vue'
import InstallmentPage from '@/components/deductions/installments/MainPage.vue'
import GovtLoanPage from '@/components/deductions/gov-deductions/MainPage.vue'

import UnpostedPayrollRegister from '@/components/payroll-register/unposted/MainPage.vue'
import CompensationPage from '@/components/compensation/MainPage.vue'
import CanteenPage from '@/components/deductions/canteen/MainPage.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta : {
        auth : false,
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
  ],
});



router.beforeEach(async (to,from) => {
  const authStore = await useAuthStore();

  console.log(to.meta.auth,authStore.isLoggedIn,to);


  if(to.meta.auth && !authStore.isLoggedIn ){
   
      // return {
      //     name : 'login',
      //     // query : {
      //     //   redirect : '/login'
      //     // }
      // };
      return {
          name : 'login'
      };
  } else if (authStore.isLoggedIn && authStore.isLoggedIn && to.fullPath=='/' ){

    console.log('go to home.');
    // return {
    //     name : 'home'
    // };
    // next({name : 'dashboard'})
        return {
          name : 'dashboard'
      };
  } else {
    console.log('else');
    console.log(authStore.isLoggedIn,to.fullPath);
    // next();
  }

 
});

export default router
