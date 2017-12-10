<template>
  <div class="container">
    <h3 class="subhead">
      Log in
    </h3>
    <div class="input-group">
      <label>Email</label>
      <input type="text" v-model="email">
    </div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" v-model="password">
    </div>
    <div class="form-actions">
      <a @click="retrieve()">Lost your password?</a>
      <button @click="login()">Submit</button>
    </div>
  </div>
</template>

<script>
  const stitch = require('mongodb-stitch')
  const client = new stitch.StitchClient('dmautomator-mvuay')

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      retrieve () {
        if (this.email) {
          client.auth.provider('userpass').sendPasswordReset(this.email)
        }
      },
      login () {
        if (this.email.length && this.password.length) {
          client.login(this.email, this.password).then(response => {
            console.log(response)
          })
        }
      }
    }
  }
</script>
