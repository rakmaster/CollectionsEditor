<template>
  <div id="app" class="container">
    <header>
      <h1>JSON Editor</h1>
    </header>
    <!--original json input-->
    <div>
      <h3>input</h3>
      <p>Paste your JSON into the window below.</p>
      <textarea v-model="json"></textarea>
    </div>
    <!--transformation process-->
    <div class="editor">
      <div>
        <h3>data</h3>
        <p>All elements in a list. Click one to edit.</p>
        <div class="edit-area">
          <div class="node" v-for="(node, index) in parsedJSON">
            <label @click="selected = node, selectedIndex = index">
              {{ node.name }} <i class="fa fa-edit right"></i>
            </label>
            <button class="btn danger right" @click="remove(index)"><i class="fa fa-ban"></i></button>
          </div>
        </div>
      </div>
      <div>
        <h3>edit</h3>
        <p>Edit an element from the list.</p>
        <div class="edit-area">
          <div class="input-group" v-for="(element, index) in selected">
            <label v-html="index"></label>
            <input :value="element" type="text" @input="selected[index] = $event.target.value">
          </div>
        </div>
      </div>
    </div>
    <!--modified output json-->
    <div>
      <h3>output</h3>
      <p>The completed JSON</p>
      <textarea v-model="newJson"></textarea>
    </div>
    <div class="actions">
      <div class="input">Unique Key: <input type="text" v-model="key"></div>
      <div>
        <p v-if="feedback.msg"><i class="fa fa-warning" style="padding: 10px;"></i> {{ feedback.msg }}</p>
      </div>
      <div>
        <!--<button @click="save()">Save</button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'hello world',
        json: '',
        parsedJSON: null,
        key: '',
        selected: null,
        selectedIndex: 0,
        feedback: {
          msg: 'All edit operations rely on a unique identifier for each member of the collection.<br /> Please enter the name of a value in the collection member that is unique to each member, such as an id, or a name.'
        }
      }
    },
    computed: {
      parseJSON () {
        if (this.json) {
          return JSON.parse(this.json);
        }
      },
      newJson () {
        if (this.selected) {
          return JSON.stringify(this.parsedJSON, null, 1);
        }
      }
    },
    methods: {
      remove (index) {
        if (this.key) {
          if (this.selected && this.selected[this.key] === this.parsedJSON[index][this.key]) {
            this.selected = null
          }
          this.parsedJSON.splice(index, 1)
        }
      },
      save () {
        if (this.key) {
          let raw = JSON.parse(this.json)
          for (var i in raw) {
            if (raw[i][this.key] === this.selected[this.key]) {
              for (var s in raw[i]) {
                raw[i][s] = this.selected[s]
              }
              break
            }
          }
          this.json = JSON.stringify(raw, null, 1)
        } else {
          alert('Saving the JSON requires a uniqe key to look up. Pick the name of a field that is unique per member.')
        }
      }
    },
    watch: {
      key () {
        if (this.key.length) {
          this.feedback.msg = ''
        } else {
          this.feedback.msg = 'All edit operations rely on a unique identifier for each member of the collection.<br /> Please enter the name of a value in the collection member that is unique to each member, such as an id, or a name.'
        }
      },
      json () {
        this.parsedJSON = JSON.parse(this.json)
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/scss/font-awesome';
  @import '~normalize.css';
  @import './style/style.scss';
</style>
