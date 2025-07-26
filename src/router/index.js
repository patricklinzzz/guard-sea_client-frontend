import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SpeciesView from '@/views/Educate/SpeciesView.vue'
import CausesView from '@/views/Educate/CausesOverviewView.vue'
import QuizView from '@/views/Educate/QuizView.vue'
import ProductListView from '@/views/Product/ProductListView.vue'
import ProductDetailView from '@/views/Product/ProductDetailView.vue'
import CartView from '@/views/Product/CartView.vue'
import NewListView from '@/views/New/NewListView.vue'
import NewInsideView from '@/views/New/NewInsideView.vue'
import AboutView from '@/views/About/AboutView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import EventListView from '@/views/Event/EventListView.vue'
import EventDetail from '@/views/Event/EventDetail.vue'
import ForgotPasswordView from '@/views/Auth/ForgotPassword.vue'
import SpeciesinfoView from '@/views/Educate/SpeciesinfoView.vue'

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
      path: '/edu/causes/pollution',
      name: 'pollution',
      component: import('@/views/Educate/Causes/PollutionView.vue'),
    },
    {
      path: '/edu/causes/overfishing',
      name: 'overfishing',
      component: import('@/views/Educate/Causes/OverfishingView.vue'),
    },
    {
      path: '/edu/causes/degradation',
      name: 'degradation',
      component: import('@/views/Educate/Causes/DegradationView.vue'),
    },
    {
      path: '/edu/quiz',
      name: 'quiz',
      component: QuizView,
    },
    {
      path: '/productlist',
      name: 'productlist',
      component: ProductListView,
    },
    {
      path: '/productlist/:id',
      name: 'productdetail',
      component: ProductDetailView,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404View.vue'),
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
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventListView,
    },
    {
      path: '/event:id',
      name: 'EventDetail',
      component: EventDetail,
      props: true
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      path: '/edu/species/:id',
      name: 'speciesinfo',
      component: SpeciesinfoView,
      props: true,
    },
    {
      path: '/edu/causes/pollution',
      name: 'pollution',
      component: () => import('@/views/Educate/Causes/PollutionView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0, left: 0 }
    }
  },
})

export default router
