<template>
  <div class="editor-list">
    <slot name="header"></slot>
    <div v-if="set" id="edit-area" class="edit-area">
      <div v-infinite-scroll="load" id="edit-items" class="node" v-for="(node, index) in set">
        <label @click="select(node, index)">
          {{ node.name }} <i class="fa fa-edit right"></i>
        </label>
        <button v-if="del" class="btn danger right" @click="remove(index)"><i class="fa fa-ban"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['set', 'del'],
    mounted () {
      console.log(this.set)
    },
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
