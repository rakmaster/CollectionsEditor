import Edit from './components/edit'
import List from './components/list'
import Results from './components/results'
import Actions from './components/actions'
import ColumnHeader from './components/column-header'

export default {
  components: {
    Edit,
    List,
    Results,
    Actions,
    ColumnHeader
  },
  template: '' +
  '<div class="content">' +
  '  <h3 class="subhead">\n' +
  '    Edit records :: {{ set.name }}\n' +
  '  </h3>' +
  '  <div class="editor">' +
  '    <list :set="recordSet" :del="false" @load="doLoad" @select="doSelect" @remove="doRemove"><column-header :input="headers[0]"></column-header></list>' +
  '    <edit :record="record" @change="doChange"><column-header :input="headers[1]"></column-header></edit>' +
  '    <results :copy="copied"><column-header :input="headers[2]"></column-header></results>' +
  '  </div>' +
  '  <div class="actions">' +
  '    <actions @save="doSave"></actions>' +
  '  </div>' +
  '</div>',
  props: ['set'],
  data () {
    return {
      headers: [
        {
          title: 'list',
          description: 'click an item to edit'
        },
        {
          title: 'edit',
          description: 'change the record values'
        },
        {
          title: 'result',
          description: 'the changed record output'
        }
      ]
    }
  },
  computed: {
    recordSet () {
      if (this.set && this.set.records) {
        return this.set.records
      }
    },
    record () {
      if (this.set && this.set.record) {
        return this.set.record
      }
    },
    copied () {
      if (this.record) {
        return Object.assign({}, this.record)
      }
    }
  },
  methods: {
    doChange (state) {
      this.$emit('action', {name: 'change', value: state})
    },
    doLoad () {
      this.$emit('action', {name: 'load', value: null})
    },
    doSelect (item) {
      this.$emit('action', {name: 'select', value: item})
    },
    doRemove (index) {
      this.$emit('action', {name: 'remove', value: index})
    },
    doSave () {
      this.$emit('action', {name: 'save', value: null})
    }
  }
}
