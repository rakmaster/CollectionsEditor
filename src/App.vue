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
          <div class="node" v-for="(node, index) in parsedJSON" @click="selected = node, selectedIndex = index">{{ node.name }}</div>
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
      <div></div>
      <div>
        <button @click="save()">Save</button>
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
        key: '',
        selected: null,
        selectedIndex: 0
      }
    },
    computed: {
      parsedJSON () {
        if (this.json) {
          return JSON.parse(this.json);
        }
      },
      newJson () {
        if (this.selected) {
          return JSON.stringify(this.selected, null, 1);
        }
      }
    },
    methods: {
      save () {
        let raw = JSON.parse(this.json)
        for (var i in raw) {
          if (raw[i][this.key] === this.selected[this.key]) {
            for (var s in raw[i]) {
              raw[i][s] = this.selected[s]
            }
            break
          }
        }
        this.json = JSON.stringify(raw, null, 1);
      }
    }
  }
</script>

<style lang="scss">
  @import '~font-awesome/scss/font-awesome';
  @import '~normalize.css';
  @import './style/style.scss';
</style>
