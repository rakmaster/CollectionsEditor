<template>
  <div class="content">
    <h3 class="subhead">
      Edit records :: {{ collection }}
    </h3>
    <div class="editor">
      <div>
        <h3>all records</h3>
        <p>All records in a list. Click one to edit.</p>
        <div v-if="records[collection]" id="edit-area" class="edit-area">
          <div v-infinite-scroll="loadMore" id="edit-items" class="node" v-for="(node, index) in records[collection]">
            <label @click="selectMe(node, index)">
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
            <input :value="element" type="text" @input="selected[index] = $event.target.value" @change="changed = true">
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
  import { mapState, mapActions } from 'vuex'
  export default {
    mounted () {
      if (this.user) {
        this.collection = this.$route.params.collection
        this.setRecords(this.collection)
      } else {
        this.$router.push('/')
      }
    },
    updated () {
      this.toScroll = document.getElementById('edit-area')
      if (this.toScroll) {
        this.scroll()
      }
    },
    data () {
      return {
        toScroll: null,
        busy: false,
        collection: '',
        before: null,
        selected: null,
        selectedIndex: 0,
        changed: false,
        trigger: 300
      }
    },
    computed: {
      ...mapState('users', [
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
        'setRecord',
        'addRecords'
      ]),
      scroll () {
        this.toScroll.onscroll = ev => {
          if (
            this.toScroll.offsetHeight + this.toScroll.scrollTop >=
            (this.toScroll.scrollHeight - this.trigger) && !this.busy
          ) {
            this.busy = true
            this.loadMore()
          }
        }
      },
      selectMe (node, index) {
        if (this.selected && node.name !== this.selected.name) {
          if (this.changed) {
            let warn = confirm('Select another record before saving the current changes?')
            if (warn) {
              this.records[this.collection][this.selectedIndex] = this.before
              this.before = Object.assign({}, node)
              this.selected = node
              this.selectedIndex = index
              this.changed = false
            }
          } else {
            this.before = Object.assign({}, node)
            this.selected = node
            this.selectedIndex = index
          }
        } else {
          this.before = Object.assign({}, node)
          this.selected = node
          this.selectedIndex = index
        }
      },
      async loadMore () {
        const _this = this
        await this.addRecords(this.collection).then(response => {
          _this.busy = false
        })
      },
      save () {
        let id = this.selected._id
        let transformed = Object.assign({}, this.selectend)
        delete transformed._id
        let set = {
          id: id,
          set: transformed
        }
        this.setRecord(set)
        this.before = null
        this.changed = false
      }
    }
  }
</script>
