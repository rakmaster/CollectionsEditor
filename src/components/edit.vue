<template>
  <editor :set="send" @action="handleActions"></editor>
</template>

<script>
  import Editor from './editor'
  import { mapState, mapActions } from 'vuex'

  import { BSON } from 'mongodb-extjson'

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
        suggestions: [],
        record: {},
        recordIndex: 0,
        perPage: 20,
        busy: false,
        changed: false
      }
    },
    computed: {
      ...mapState([
        'client',
        'db'
      ]),
      ...mapState([
        'user'
      ]),
      send () {
        let rec = this.records
        if (this.suggestions.length) {
          rec = this.suggestions
        }
        let out = {
          name: this.collection,
          record: this.record,
          records: rec,
          changed: this.changed
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
        const method = this[todo.name]
        if (todo.value) {
          method(todo.value)
        } else {
          method()
        }
      },
      async search (term) {
        this.suggestions = []
        if (term.length > 3) {
          if (!this.busy) {
            this.busy = true
            const reg = new BSON.BSONRegExp(term, 'i')
            this.suggestions = await this.db.collection(this.collection).find({name: reg}).sort({'_id': 1}).limit(this.perPage).execute()
            setTimeout(() => {
              this.busy = false
            }, 250)
          }
        }
      },
      change () {
        this.changed = !this.changed
      },
      async set () {
        this.records = await this.db.collection(this.collection).find({}).sort({'_id': 1}).limit(this.perPage).execute()
      },
      async load () {
        const _this = this
        if (this.records.length && !this.busy) {
          const lastId = this.records[(this.records.length - 1)]._id
          this.busy = true
          await this.db.collection(this.collection)
            .find({'_id': {$gt: lastId}})
            .sort({'_id': 1})
            .limit(this.perPage)
            .execute()
            .then(result => {
              const newSet = this.records.concat(result)
              _this.records = newSet
              setTimeout(() => {
                _this.busy = false
              }, 250)
            })
        }
      },
      async get () {
        await this.db.collection(this.collection).find({}).sort({'_id': 1}).limit(this.perPage).execute()
      },
      select (input) {
        if (this.record.hasOwnProperty('name') && input.node.name !== this.record.name) {
          if (this.changed) {
            let warn = confirm('Select another record before saving the current changes?')
            if (warn) {
              this.records[this.recordIndex] = this.before
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
