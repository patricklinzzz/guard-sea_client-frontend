import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpeciesView from '@/views/Educate/SpeciesView.vue'
import CausesView from '@/views/Educate/ExtinctionCausesView.vue'
import QuizView from '@/views/Educate/QuizView.vue'
import PorductListView from '@/views/Product/PorductListView.vue'
import NewListView from '@/views/New/NewListView.vue'
import NewInsideView from '@/views/New/NewInsideView.vue'
import AboutView from '@/views/About/AboutView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edu',
      name: 'educate',
      component: () => import('@/views/Educate/EducateView.vue'),
    },
    {
      path: '/edu/species',
      name: 'species',
      component: SpeciesView,
    },
    {
      path: '/edu/causes',
      name: 'causes',
      component: CausesView,
    },
    {
      path: '/edu/quiz',
      name: 'quiz',
      component: QuizView,
    },
    {
      path: '/productlist',
      name: 'ProductList',
      component: PorductListView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
      {
      path: '/new',
      name: 'newlist',
      component: NewListView,
    },
       {
      path: '/new/:id',
      name: 'newinside',
      component: NewInsideView,
      props: true,
    },
    ,
       {
      path: '/about',
      name: 'about',
      component: AboutView,
      
    },
      {
      path: '/register',
      component: RegisterView
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
