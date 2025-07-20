import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpeciesView from '@/views/Educate/SpeciesView.vue'
import CausesView from '@/views/Educate/ExtinctionCausesView.vue'
import QuizView from '@/views/Educate/QuizView.vue'
import PorductListView from '@/views/Product/PorductListView.vue'
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
