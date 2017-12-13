
<template>
  <div class="container">
    <h3 class="subhead">
      Edit records
    </h3>
    <div class="editor">
      <div>
        <h3>all records</h3>
        <p>All records in a list. Click one to edit.</p>
        <div class="edit-area">
          <div class="node" v-for="(node, index) in records.monsters">
            <label @click="selected = node, selectedIndex = index">
              {{ node.name }} <i class="fa fa-edit right"></i>
            </label>
            <!--<button class="btn danger right" @click="remove(index)"><i class="fa fa-ban"></i></button>-->
          </div>
        </div>
      </div>
      <div>
        <h3>edit</h3>
        <p>Edit the record's values.</p>
        <div class="edit-area">
          <div class="input-group" v-for="(element, index) in selected" v-if="index !== '_id'">
            <label v-html="index"></label>
            <input :value="element" type="text" @input="selected[index] = $event.target.value">
          </div>
        </div>
      </div>
      <div>
        <h3>output</h3>
        <p>The completed data record.</p>
        <textarea v-model="parsedRecord" contenteditable="false"></textarea>
      </div>
    </div>
    <div class="actions">
      <div>
        <button class="btn" @click="save()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    mounted () {
      if (this.user) {
        this.setRecords('monsters')
      } else {
        this.$router.push('/')
      }
    },
    data () {
      return {
        selected: null,
        selectedIndex: 0
      }
    },
    computed: {
      ...mapGetters('users', [
        'user'
      ]),
      ...mapState('collections', [
        'records'
      ]),
      parsedRecord () {
        let transformed = Object.assign({}, this.selected)
        delete transformed._id
        return JSON.stringify(transformed, null, 1)
      }
    },
    methods: {
      ...mapActions('collections', [
        'setRecords',
        'setRecord'
      ]),
      save () {
        let id = this.selected._id
        let transformed = Object.assign({}, this.selected)
        delete transformed._id
        let set = {
          id: id,
          set: transformed
        }
        this.setRecord(set)
      }
    }
  }
</script>
