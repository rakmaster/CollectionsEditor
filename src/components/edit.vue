<template>
  <editor :set="send" @action="handleActions"></editor>
</template>

<script>
  import Editor from './editor'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Edit',
    components: {
      Editor
    },
    mounted () {
      if (this.user) {
        this.collection = this.$route.params.collection
        this.set()
      } else {
        this.$router.push('/')
      }
    },
    data () {
      return {
        collection: '',
        records: [],
        record: {},
        recordIndex: 0,
        perPage: 20,
        busy: false
      }
    },
    computed: {
      ...mapState([
        'client',
        'db'
      ]),
      ...mapState('users', [
        'user'
      ]),
      send () {
        let out = {
          name: this.collection,
          record: this.record,
          records: this.records
        }
        return out
      }
    },
    methods: {
      ...mapActions('collections', [
        'setRecords',
        'setRecord',
        'addRecords'
      ]),
      handleActions (todo) {
        this[todo.name](todo.value)
      },
      async set () {
        this.records = await this.db.collection(this.collection).find().sort({'_id': 1}).limit(this.perPage).execute()
      },
      async load () {
        const _this = this
        if (!this.busy) {
          this.busy = true
          await this.get().then(result => {
            this.records = [this.records, ...result]
            _this.busy = false
          })
        }
      },
      async get () {
        if (this.records.length) {
          const lastId = this.records[(this.records.length - 1)]._id
          console.log(lastId)
          // await this.db.collection(this.collection).find({'_id': {$gt: lastId}}).sort({'_id': 1}).limit(this.perPage).execute()
        } else {
          await this.db.collection(this.collection).find({}).sort({'_id': 1}).limit(this.perPage).execute()
        }
      },
      select (input) {
        if (this.record.hasOwnProperty('name') && input.node.name !== this.record.name) {
          if (this.changed) {
            let warn = confirm('Select another record before saving the current changes?')
            if (warn) {
              this.records[this.collection][this.recordIndex] = this.before
              this.before = Object.assign({}, input.node)
              this.record = input.node
              this.recordIndex = input.index
              this.changed = false
            }
          } else {
            this.before = Object.assign({}, input.node)
            this.record = input.node
            this.recordIndex = input.index
          }
        } else {
          this.before = Object.assign({}, input.node)
          this.record = input.node
          this.recordIndex = input.index
        }
      },
      remove (input) {
        console.log(input)
      },
      save (input) {
        let id = this.record._id
        let transformed = Object.assign({}, this.record)
        delete transformed._id
        let set = {
          id: id,
          set: transformed
        }
        this.db.collection(this.collection).updateOne(set).execute()
        this.before = null
        this.changed = false
      }
    }
  }
</script>
