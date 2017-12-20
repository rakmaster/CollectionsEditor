<template>
  <div class="editor-list"">
    <div v-infinite-scroll="load" infinite-scroll-distance="30">
      <v-list dense v-if="set">
        <v-list-tile
          v-for="(node, index) in set"
          ripple
          @click="select(node, index)"
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ node.name }} <i class="fa fa-edit right"></i></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['set', 'del'],
    data () {
      return {
        toScroll: null,
        before: null,
        selected: null,
        trigger: 300
      }
    },
    updated () {
      this.toScroll = document.getElementById('edit-area')
      if (this.toScroll) {
        this.scroll()
      }
    },
    methods: {
      select (node, index) {
        this.$emit('select', {node: node, index: index})
      },
      remove (index) {
        this.$emit('remove', index)
      },
      load () {
        this.$emit('load')
      },
      scroll () {
        this.toScroll.onscroll = ev => {
          if (
            this.toScroll.offsetHeight + this.toScroll.scrollTop >=
            (this.toScroll.scrollHeight - this.trigger)
          ) {
            this.load()
          }
        }
      }
    }
  }
</script>

<style>
  .editor-list {
    height: 400px;
    overflow: auto;
  }
</style>
