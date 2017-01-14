<template>
    <div class="container">
      <div class="row">
        <div class="column columnn-20">
          <img src="./assets/logo.png">
        </div>
        <div class="column">
          <quote-book></quote-book>
        </div>
      </div>
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
