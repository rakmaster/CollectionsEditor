<template>
  <v-card color="grey darken-4" flat style="margin: 0 auto;">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-subheader>Log In</v-subheader>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout column>
          <v-flex xs12>
            <v-text-field
              name="email"
              label="Email"
              id="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              name="password"
              label="Password"
              id="password"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn right @click="login()">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
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
      ...mapActions('users', [
        'setUser'
      ]),
      retrieve () {
        if (this.email) {
          this.client.auth.provider('userpass').sendPasswordReset(this.email)
        }
      },
      login () {
        this.feedback = {
          type: 'info',
          msg: ''
        }
        if (this.email.length && this.password.length) {
          this.client.login(this.email, this.password).then(response => {
            if (!response.error) {
              this.setUser(response)
              this.$router.push(`/admin/${this.collection}`)
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
