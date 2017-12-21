<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="(collection, i) in collections" :key="i" @click="">
          <v-list-tile-action>
            <v-icon>database</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="`/admin/${collection}`" v-html="collection"></router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon v-if="user" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Collections Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()">
        <v-icon v-if="user">lock_open</v-icon>
        <v-icon v-else>lock_outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
      drawer: false
    }),
    computed: {
      ...mapGetters([
        'appName',
        'client',
        'collections'
      ]),
      ...mapState([
        'user'
      ])
    },
    methods: {
      ...mapActions([
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

<style>
  .subhead {
    font-weight: 700;
    text-transform: uppercase;
    color: #EFEFEF;
  }
</style>
