<template>
  <div v-model="display" class="editor-results"><pre>{{ display }}</pre></div>
</template>

<script>
  export default {
    props: ['copy'],
    computed: {
      display () {
        return JSON.stringify(this.copy, null, 1)
      }
    }
  }
</script>

<style>
  .editor-results {
    min-height: 400px;
  }
</style>
