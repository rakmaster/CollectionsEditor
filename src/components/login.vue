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
          <v-vlex xs12 v-if="feedback">{{ feedback }}</v-vlex>
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
        password: '',
        feedback: ''
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
