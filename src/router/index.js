import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/editor'
import LoginForm from '@/components/login'
import RegistrationForm from '@/components/register'
import ConfirmRegistration from '@/components/confirm'
import ResetPassword from '@/components/reset'

import store from '@/store'

Vue.use(Router)

let routeSet = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegistrationForm
  },
  {
    path: '/confirm',
    name: 'ConfirmRegistration',
    component: ConfirmRegistration
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    component: ResetPassword
  }
]

const firstToUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

for (var s in store.state.config.collections) {
  let collection = store.state.config.collections[s]
  let name = firstToUpper(collection)
  routeSet.push({
    path: '/' + collection,
    name: name + 'Editor',
    component: Editor
  })
}

export default new Router({
  routes: routeSet
})
