<template>
  <div id="app">
    <md-layout md-gutter>
      <md-layout md-row>
        <md-layout md-column-xsmall>
          <img src="./assets/logo.png">
        </md-layout>
        <md-layout md-column-large>
          <quote-book></quote-book>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Hello from './components/Hello'
import QuoteBook from './components/quoteBook/QuoteBook.vue'

export default {
  name: 'app',
  components: {
    Hello,
    'quote-book': QuoteBook
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
