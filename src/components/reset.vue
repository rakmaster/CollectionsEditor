<template>
  <div class="container">
    <h3 class="subhead">
      Reset your password
    </h3>
    <div v-if="feedback.msg" :class="['feedback', feedback.msg ? feedback.type : '']" v-html="feedback.msg"></div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" v-model="password">
    </div>
    <div class="input-group">
      <label>Password Again</label>
      <input type="password" v-model="passwordAgain">
    </div>
    <div class="form-actions">
      <button class="btn" @click="reset()">Submit</button>
    </div>
  </div>
</template>

<script>
  const stitch = require('mongodb-stitch')
  const client = new stitch.StitchClient('dmautomator-mvuay')

  export default {
    mounted () {
      this.tokenid = this.$route.params('tokenid')
      this.token = this.$route.params('token')
    },
    data () {
      return {
        feedback: {
          type: 'info',
          msg: ''
        },
        tokenid: '',
        token: '',
        password: '',
        passwordAgain: ''
      }
    },
    methods: {
      reset () {
        this.feedback = {
          type: 'info',
          msg: ''
        }
        if (this.password === this.passwordAgain) {
          client.auth.provider('userpass').passwordReset(this.tokenid, this.token, this.password)
        } else {
          this.feedback = {
            type: 'warning',
            msg: 'The passwords do not match. Please try again'
          }
          this.password = ''
          this.passwordAgain = ''
        }
      }
    }
  }
</script>
