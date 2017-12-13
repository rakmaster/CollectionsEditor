<template>
  <div id="app">
    <header>
      <h1 v-html="appName"></h1>
      <div class="user">
        <button v-if="" class="btn" @click="logout()"><i class="fa fa-sign-out"></i></button>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    mounted () {
      this.setClient()
      this.setDb()
    },
    computed: {
      ...mapGetters([
        'appName',
        'client'
      ]),
      ...mapGetters('users', [
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'setClient',
        'setDb'
      ]),
      ...mapActions('users', [
        'unsetUser'
      ]),
      logout () {
        this.client.logout().then(() => {
          this.unsetUser()
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/scss/font-awesome';
  @import '~normalize.css';
  @import './style/style.scss';
</style>

<style>
  .user {
    position: fixed;
    right: 20px;
    top: 15px;
  }
</style>
