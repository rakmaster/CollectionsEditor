<template>
  <div class="editor-edit">
    <slot></slot>
    <div class="input-group" v-for="(element, index) in record" v-if="index !== '_id'">
      <label v-html="index"></label>
      <input :value="element" type="text" @input="record[index] = $event.target.value" @change="change(true)">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['record'],
    methods: {
      change (state) {
        this.$emit('change', state)
      }
    }
  }
</script>
