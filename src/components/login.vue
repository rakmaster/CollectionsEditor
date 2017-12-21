<template>
  <v-layout>
    <v-flex xs3 offset-xs4>
      <v-form :input="{title: 'Log In', feedback: feedback}" @action="login()">
        <template>
          <v-flex xs12>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              v-model="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="password"
              :type="'password'"
            ></v-text-field>
          </v-flex>
        </template>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import VForm from './_shared/form'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      VForm
    },
    mounted () {
      if (this.user) {
        this.$router.push(`/admin/${this.collection}`)
      }
    },
    data () {
      return {
        email: '',
        password: '',
        feedback: ''
      }
    },
    computed: {
      ...mapState([
        'user'
      ]),
      ...mapGetters([
        'client',
        'db',
        'collections'
      ]),
      collection () {
        return this.collections[0]
      }
    },
    methods: {
      ...mapActions([
        'setUser'
      ]),
      retrieve () {
        if (this.email) {
          this.client.auth.provider('userpass').sendPasswordReset(this.email)
        }
      },
      login () {
        this.feedback = ''
        if (this.email.length && this.password.length) {
          this.client.login(this.email, this.password).then(response => {
            if (!response.error) {
              this.setUser(response)
              this.$router.push(`/admin/${this.collection}`)
            } else {
              this.feedback = 'The login failed. Please check your information and try again.'
            }
          })
        } else {
          this.feedback = 'All fields are required.'
        }
      }
    }
  }
</script>
