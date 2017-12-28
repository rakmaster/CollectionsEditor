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
          @input="mod(index, $event)"
          @change="change()"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['record'],
    methods: {
      mod (i, e) {
        this.record[i] = e
      },
      change () {
        this.$emit('change')
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
