import { createRouter, createWebHistory } from 'vue-router'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import UserAuth from '@/pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue'
import store from '@/store/index.js'

/* remember that for this projects routes that must be protected have meta-data in their route objects */

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  { 
      path: '/coaches/:id',/* now we can expect a prop with thename id */
      component: CoachDetail,
      props: true, /* we can ensure the concrete value for the URL whicj=h is then visited is passed in as a prop to the component*/
      children: [
      { path: 'contact', component: ContactCoach } // /coaches/c1/contact
      ] 
  },
  { path: '/register', component: CoachRegistration , meta: {needsAuth : true}},
  { path: '/requests', component: RequestsReceived , meta: {needsAuth : true}},
  { path: '/auth', component: UserAuth , meta: {needsUnauth : true} /* we will make sure you cannot access this route whiles you are logged in */},
  { path: '/:pathMatch(.*)*', component: NotFound }
]
})

/* this is a global navigation gaurd that is executed before any navigation action */
router.beforeEach(function(to, _, next) {
  /* if the the route the user is going to needs auth to be true and the user is not authenticated  */
  if (to.meta.needsAuth && !store.getters.isAuthenticated) {
    next('/auth')
  /* if the route the user is going to needs the user to be unauthorised whiles the user is authorised  */  
  } else if (to.meta.needsUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    /* this condition is for every other scenario  */
    next()
  }
})

export default router
