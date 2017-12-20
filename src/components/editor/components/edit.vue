<template>
  <v-layout column>
    <v-flex xs12>
      <v-text-field
        v-for="(element, index) in record"
        v-if="index !== '_id'"
        :label="index"
        :value="element"
        input="record[index] = this.value"
        change="change(true)"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: ['record'],
    methods: {}
  }
</script>
