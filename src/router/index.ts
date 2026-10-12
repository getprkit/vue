import { isDev } from '@u/env.ts'
import { type Router, type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import devRoutes from '@/router/dev-routes'

// we use dynamic import
// which lazy-loaded when the route is visited.
const routes: RouteRecordRaw[] = []

// Prevent rendering of documentation routes and components in production mode.
if (isDev) {
  routes.push(...devRoutes())
}

// TODO: Must change in future with moving to another library (Doc library)
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'uk-active',
  linkExactActiveClass: 'uk-active',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 20,
      }
    }

    return { top: 0 }
  },
  routes,
})

export default router
