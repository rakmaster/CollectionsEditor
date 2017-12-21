<template>
  <div class="editor-entry">
    <v-layout column>
      <v-flex xs12>
        <v-text-field
          v-for="(element, index) in record"
          v-if="index !== '_id'"
          :label="index"
          :value="element"
          :key="index"
          hide-details
          @input="mod(index)"
          @change="change"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['record'],
    methods: {
      change () {
        this.$emit('change')
      },
      mod (index) {
        // console.log(value)
        // record[index] = this.value
      }
    }
  }
</script>

<style>
  .editor-entry {
    height: 400px;
    overflow: auto;
  }
</style>
