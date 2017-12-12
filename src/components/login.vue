<template>
  <div class="container">
    <h3 class="subhead">
      Log in
    </h3>
    <div v-if="feedback.msg" :class="['feedback', feedback.msg ? feedback.type : '']" v-html="feedback.msgs"></div>
    <div class="input-group">
      <label>Email</label>
      <input type="text" v-model="email">
    </div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" v-model="password">
    </div>
    <div class="form-actions">
      <a href="javascript:;" @click="retrieve()">Lost your password?</a>
      <button class="btn" @click="login()">Submit</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  const stitch = require('mongodb-stitch')
  const client = new stitch.StitchClient('dmautomator-mvuay')

  export default {
    data () {
      return {
        feedback: {
          type: 'info',
          msg: ''
        },
        email: '',
        password: ''
      }
    },
    methods: {
      ...mapActions('users', [
        'setUser'
      ]),
      retrieve () {
        if (this.email) {
          client.auth.provider('userpass').sendPasswordReset(this.email)
        }
      },
      login () {
        this.feedback = {
          type: 'info',
          msg: ''
        }
        if (this.email.length && this.password.length) {
          client.login(this.email, this.password).then(response => {
            if (!resopnse.error) {
              this.setUser(response)
              this.$router.push('/monsters')
            } else {
              this.feedback = {
                type: 'warning',
                msg: 'The login failed. Please check your information and try again.'
              }
            }
          })
        } else {
          this.feedback = {
            type: 'warning',
            msg: 'All fields are required.'
          }
        }
      }
    }
  }
</script>
