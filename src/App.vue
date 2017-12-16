<template>
  <div id="app">
    <header>
      <h1 v-html="appName"></h1>
      <div class="user">
        <button v-if="user" class="btn" @click="logout()"><i class="fa fa-sign-out"></i></button>
      </div>
    </header>
    <nav v-if="user">
      <ul>
        <li v-for="collection in collections">
          <router-link :to="'/admin/' + collection">{{ collection }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'appName',
        'client',
        'collections'
      ]),
      ...mapState('users', [
        'user'
      ])
    },
    methods: {
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
