
<template>
  <div class="container">
    <h3 class="subhead">
      Edit monsters
    </h3>
    <div class="editor">
      <div>
        <h3>all monsters</h3>
        <p>All monsters in a list. Click one to edit.</p>
        <div class="edit-area">
          <div class="node" v-for="(node, index) in monsters">
            <label @click="selected = node, selectedIndex = index">
              {{ node.name }} <i class="fa fa-edit right"></i>
            </label>
            <!--<button class="btn danger right" @click="remove(index)"><i class="fa fa-ban"></i></button>-->
          </div>
        </div>
      </div>
      <div>
        <h3>edit</h3>
        <p>Edit the monster's statistics.</p>
        <div class="edit-area">
          <div class="input-group" v-for="(element, index) in selected" v-if="index !== '_id'">
            <label v-html="index"></label>
            <input :value="element" type="text" @input="selected[index] = $event.target.value">
          </div>
        </div>
      </div>
      <div>
        <h3>output</h3>
        <p>The completed monster data record.</p>
        <textarea v-model="parsedMonster" contenteditable="false"></textarea>
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
      // if (this.user) {
        this.setMonsters()
      // } else {
      //   this.$router.push('/')
      // }
    },
    data () {
      return {
        selected: null,
        selectedIndex: 0
      }
    },
    computed: {
      ...mapState('users', [
        'user'
      ]),
      ...mapGetters('monsters', [
        'monsters'
      ]),
      parsedMonster () {
        let transformed = Object.assign({}, this.selected)
        delete transformed._id
        return JSON.stringify(transformed, null, 1)
      }
    },
    methods: {
      ...mapActions('monsters', [
        'setMonsters',
        'setMonster'
      ]),
      save () {
        let id = this.selected._id
        let transformed = Object.assign({}, this.selected)
        delete transformed._id
        let set = {
          id: id,
          set: transformed
        }
        this.setMonster(set)
      }
    }
  }
</script>
