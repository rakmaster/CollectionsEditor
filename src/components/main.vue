<template>
    <div>
        <nav>
            <ul>
                <li v-for="collection in collections">
                    <router-link :to="'/' + collection"></router-link>
                </li>
            </ul>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import Editor from './editor'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Editor
    },
    computed: {
      ...mapGetters(['collections'])
    }
  }
</script>