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
  template:
    '<v-container>' +
    '  <v-layout row>' +
    '    <v-flex xs12>' +
    '      <div class="headline">Edit Records :: {{ set.name }}</div>' +
    '    </v-flex>' +
    '  </v-layout>' +
    '  <v-layout row>' +
    '    <v-flex xs12 sm3>' +
    '      <v-card>' +
    '        <v-card-title>' +
    '          <div class="subhead">All records</div>' +
    '        </v-card-title>' +
    '        <v-card-text>' +
    '          <list :set="recordSet" :del="false" @load="doLoad" @select="doSelect" @remove="doRemove"><column-header :input="headers[0]"></column-header></list>' +
    '        </v-card-text>' +
    '      </v-card>' +
    '    </v-flex>' +
    '    <v-flex xs12 sm6>' +
    '      <v-card>' +
    '        <v-card-title>' +
    '          <div class="subhead">Edit record</div>' +
    '        </v-card-title>' +
    '        <v-card-text>' +
    '          <edit :record="record" @change="doChange"><column-header :input="headers[1]"></column-header></edit>' +
    '        </v-card-text>' +
    '      </v-card>' +
    '    </v-flex>' +
    '    <v-flex xs12 sm3>' +
    '      <v-card>' +
    '        <v-card-title>' +
    '          <div class="subhead">Edit results</div>' +
    '        </v-card-title>' +
    '        <v-card-text>' +
    '          <results :copy="copied"><column-header :input="headers[2]"></column-header></results>' +
    '        </v-card-text>' +
    '      </v-card>' +
    '    </v-flex>' +
    '  </v-layout>' +
    '  <v-layout>' +
    '    <v-flex class="text-xs-right" xs12>' +
    '      <v-btn class="white--text" @click="doSave" :disabled="!set.changed">Save Record</v-btn>' +
    '    </v-flex>' +
    '  </v-layout>' +
    '</v-container>',
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
    doChange () {
      this.$emit('action', {name: 'change', value: null})
    },
    doLoad () {
      this.$emit('action', {name: 'load', value: null})
    },
    doSelect (item) {
      if (item._id !== this.record._id) {

        this.$emit('action', {name: 'select', value: item})
      }
    },
    doRemove (index) {
      this.$emit('action', {name: 'remove', value: index})
    },
    doSave () {
      this.$emit('action', {name: 'save', value: null})
    }
  }
}
