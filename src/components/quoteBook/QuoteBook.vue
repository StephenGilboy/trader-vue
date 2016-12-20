<template>
  <div class="tv-quote-book">
    <md-layout md-gutter>
      <md-layout md-row>
        <md-table>
          <md-table-header>
            <md-table-head>Symbol</md-table-head>
            <md-table-head>Bid Size</md-table-head>
            <md-table-head>Bid</md-table-head>
            <md-table-head>Ask</md-table-head>
            <md-table-head>Ask Size</md-table-head>
            <md-table-head>Last</md-table-head>
          </md-table-header>
          <md-table-body>
            <quote-row v-for="(quote, index) in quotes" :key="index" v-bind:quote="quote" v-on:unsubscribe="onUnsubscribe"></quote-row>
          </md-table-body>
        </md-table>
      </md-layout>
      <md-layout md-row>
        <md-layout md-column>
          <md-input-container>
            <md-input v-model="symbol" type="text" placeholder="Stock Symbol" />
          </md-input-container>
          <md-button v-on:click="subscribe" v-bind:disabled="symbol.length === 0">Subscribe</md-button>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>

</template>
<script>
  import QuoteRow from './quote.vue'
  import { QuoteFeed } from '../../infrastructure/quoteFeed'

  export default {
    name: 'quoteBook',
    components: {
      'quote-row': QuoteRow
    },
    data () {
      return {
        quotes: [],
        symbol: '',
        quoteFeed: null
      }
    },
    methods: {
      subscribe: function () {
        let vm = this;
        vm.quoteFeed.subscribe(vm.symbol, (quote) => {
          let exists = vm.quotes.filter((q) => q.equals(quote));
          if (exists.length) {
            exists[0].update(quote);
          } else {
            vm.quotes.push(quote);
          }
        });
      },
      onUnsubscribe: function (quote) {
        this.quoteFeed.unsubscribe(quote.symbol);
        let index = this.quotes.indexOf(quote);
        if (index >= 0) {
          this.quotes.splice(index, 1);
        }
      }
    },
    created: function () {
      this.quoteFeed = new QuoteFeed('https://ticker-tapi.herokuapp.com/');
    }
  }
</script>
<style></style>
