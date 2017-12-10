<template>
  <div class="container">
    <h3 class="subhead">
      Register a new user
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
      <button @click="register()">Register</button>
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
      register () {
        let _this = this
        if (this.email.length && this.password.length) {
          client.register(this.email, this.password)
            .then(response => {
              _this.$router.push('/login')
            })
        }
      }
    }
  }
</script>
