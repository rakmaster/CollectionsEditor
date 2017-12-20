<template>
  <v-card color="grey darken-4" flat style="margin: 0 auto;">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-subheader>{{ input.title }}</v-subheader>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container>
        <v-layout column>
          <v-vlex xs12 v-if="input.feedback">{{ input.feedback }}</v-vlex>
          <slot></slot>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn right @click="doAction()">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ['input'],
    methods: {
      doAction () {
        this.$emit('action')
      }
    }
  }
</script>