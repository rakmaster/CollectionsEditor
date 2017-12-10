<template>
  <div id="app">
    <header>
      <h1>Monster Editor</h1>
    </header>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import '~font-awesome/scss/font-awesome';
  @import '~normalize.css';
  @import './style/style.scss';
</style>
