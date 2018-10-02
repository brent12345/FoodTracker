// Vue imports
import Vue from 'vue'
import Router from 'vue-router'
import FoodRecords from '@/components/FoodRecords'
// 3rd party imports
import Auth from '@okta/okta-vue'

// our own imports
import Hello from '@/components/Hello'

Vue.use(Auth, {
  issuer: 'https://dev-532687.oktapreview.com/oauth2/default',
  client_id: '0oagg7fc3r70hcbWQ0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
	{
  	path: '/',
  	name: 'Hello',
  	component: Hello
  },
  {
    path: '/food-records',
    name: 'FoodRecords',
    component: FoodRecords,
    meta: {
      requiresAuth: true
    }
  },
	{
  	path: '/implicit/callback',
  	component: Auth.handleCallback()
	},
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
