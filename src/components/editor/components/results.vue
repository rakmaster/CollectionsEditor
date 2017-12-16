<template>
  <div class="editor-results">
    <slot name="header"></slot>
    <textarea v-model="display" contenteditable="false"></textarea>
  </div>
</template>

<script>
  export default {
    props: ['copy'],
    computed: {
      display () {
        console.log(this.copy)
        return JSON.stringify(this.copy, null, 1)
      }
    }
  }
</script>
