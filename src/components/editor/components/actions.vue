<template>
  <div class="edit-actions">
    <button class="btn" @click="save()">Save</button>
  </div>
</template>

<script>
  export default {
    methods: {
      save () {
        this.$emit('save')
      }
    }
  }
</script>
