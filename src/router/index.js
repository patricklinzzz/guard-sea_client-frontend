import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

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
      path: '/edu/species/:id(\\d+)',
      name: 'speciesinfo',
      component: () => import('@/views/Educate/SpeciesinfoView.vue'),
      props: true,
    },
    {
      path: '/edu/species/:typeId?',
      name: 'species',
      component: () => import('@/views/Educate/SpeciesView.vue'),
      props: true,
    },
    {
      path: '/edu/causes',
      name: 'causes',
      component: () => import('@/views/Educate/CausesOverviewView.vue'),
    },
    {
      path: '/edu/causes/pollution',
      name: 'pollution',
      component: () => import('@/views/Educate/Causes/PollutionView.vue'),
    },
    {
      path: '/edu/causes/overfishing',
      name: 'overfishing',
      component: () => import('@/views/Educate/Causes/OverfishingView.vue'),
    },
    {
      path: '/edu/causes/degradation',
      name: 'degradation',
      component: () => import('@/views/Educate/Causes/DegradationView.vue'),
    },
    {
      path: '/edu/quiz',
      name: 'quiz',
      component: () => import('@/views/Educate/QuizView.vue'),
    },
    {
      path: '/productlist',
      name: 'productlist',
      component: () => import('@/views/Product/ProductListView.vue'),
    },
    {
      path: '/productlist/:id',
      name: 'productdetail',
      component: () => import('@/views/Product/ProductDetailView.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Product/CartView.vue'),
    },
    {
      path: '/shippinginfo',
      name: 'shippinginfo',
      component: () => import('@/views/Product/ShippingInfoView.vue'),
    },
    {
      path: '/ordercomplete',
      name: 'ordercomplete',
      component: () => import('@/views/Product/OrderCompleteView.vue'),
    },
    {
      path: '/new',
      name: 'newlist',
      component: () => import('@/views/New/NewListView.vue'),
    },
    {
      path: '/new/:id',
      name: 'newinside',
      component: () => import('@/views/New/NewInsideView.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/Event/EventListView.vue'),
    },
    {
      path: '/event/:id',
      name: 'EventDetail',
      component: () => import('@/views/Event/EventDetail.vue'),
      props: true,
    },
    {
      path: '/event/reg/:id',
      name: 'EventReg',
      component: () => import('@/views/Event/EventReg.vue'),
      props: true,
    },
    {
      path: '/member',
      component: () => import('@/views/Member/MemberView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'MemberEdit' },
        },
        {
          path: 'edit',
          name: 'MemberEdit',
          component: () => import('@/views/Member/MemberEditView.vue'),
        },
        {
          path: 'edit-password',
          name: 'MemberEditPwd',
          component: () => import('@/views/Member/MemberEditPwdView.vue'),
        },
        {
          path: 'orders',
          name: 'MemberOrders',
          component: () => import('@/views/Member/MemberOrdersView.vue'),
        },
        {
          path: 'events',
          name: 'MemberEvents',
          component: () => import('@/views/Member/MemberEventsView.vue'),
        },
        {
          path: 'coupons',
          name: 'MemberCoupons',
          component: () => import('@/views/Member/MemberCouponsView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404View.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('user-token')

    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
