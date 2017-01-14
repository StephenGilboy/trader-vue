<template>
    <div class="container">
      <div class="row">
        <div class="column columnn-20">
          <img src="./assets/logo.png">
          <h1><a href="https://github.com/StephenGilboy/trader-vue" target="_blank" rel="noopener">Trader Vue</a></h1>
          <p>This is a very simple stock quoter used to learn how to create <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.JS</a> apps.
            The data comes from my other project <a href="https://github.com/StephenGilboy/ticker-tapi" target="_blank" rel="noopener">Ticker Tapi</a>.
            The initial stock prices are close to correct and then the rest are just faked in the API. Stock subscriptions and updates are done using <a href="http://socket.io/" target="_blank" rel="noopener">Socket.IO</a>
          </p>
          <h4>Tech Stack</h4>
          <ul>
            <li v-for="tech in techStack"><a :href="tech.url" target="_blank" rel="noopener">{{tech.name}}</a></li>
          </ul>
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
  data () {
    return {
      techStack: [
        {
          url: 'https://vuejs.org/',
          name: 'Vue.JS'
        },
        {
          url: 'https://vuematerial.github.io/',
          name: 'Vue Material'
        },
        {
          url: 'http://socket.io/',
          name: 'Socket.IO'
        },
        {
          url: 'https://milligram.github.io/',
          name: 'Milligram'
        }
      ]
    }
  },
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
