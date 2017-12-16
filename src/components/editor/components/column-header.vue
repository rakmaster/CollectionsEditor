<template>
  <div class="column-header">
    <h3 v-html="input.title"></h3>
    <p v-html="input.description"></p>
  </div>
</template>

<script>
  export default {
    props: ['input']
  }
</script>
