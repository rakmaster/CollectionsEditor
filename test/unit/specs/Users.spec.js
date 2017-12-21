import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuex)
Vue.use(Vuetify)

import store from '@/store'
console.log(store)

import Register from '@/components/register'
import Confirm from '@/components/confirm'
import Login from '@/components/login'
import Reset from '@/components/reset'

describe('register.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.subhead h3').textContent)
    .toEqual('Register a new user')
  })
})

describe('confirm.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Confirm)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.subhead h3').textContent)
      .toEqual('Your new account confirmation')
  })
})

describe('login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.subhead h3').textContent)
      .toEqual('Log In')
  })
})

describe('reset.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Reset)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.subhead h3').textContent)
      .toEqual('Reset your password')
  })
})
