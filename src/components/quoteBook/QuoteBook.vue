<template>
  <section>
    <div class="row">
      <div class="column">
        <md-table>
          <md-table-header>
            <md-table-head>Symbol</md-table-head>
            <md-table-head>Bid Size</md-table-head>
            <md-table-head>Bid</md-table-head>
            <md-table-head>Ask</md-table-head>
            <md-table-head>Ask Size</md-table-head>
            <md-table-head>Last</md-table-head>
            <md-table-head>Remove</md-table-head>
          </md-table-header>
          <md-table-body>
            <quote-row v-for="(quote, index) in quotes" :key="index" v-bind:quote="quote" v-on:unsubscribe="onUnsubscribe"></quote-row>
          </md-table-body>
        </md-table>
      </div>
    </div>
    <div class="row">
      <div class="column column-20">
        <md-input-container>
          <md-input v-model="symbol" type="text" placeholder="Stock Symbol" />
        </md-input-container>
      </div>
      <div class="column column-10">
        <md-button v-show="!loadingQuote" md-raised v-on:click="subscribe" v-bind:disabled="symbol.length === 0">Subscribe</md-button>
        <md-spinner md-indeterminate v-show="loadingQuote"></md-spinner>
      </div>
    </div>
  </section>
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
        quoteFeed: null,
        loadingQuote: false
      }
    },
    methods: {
      subscribe: function () {
        let vm = this;
        vm.loadingQuote = true;
        vm.quoteFeed.subscribe(vm.symbol, (quote) => {
          let exists = vm.quotes.filter((q) => q.equals(quote));
          if (exists.length) {
            exists[0].update(quote);
          } else {
            vm.quotes.push(quote);
          }
          vm.loadingQuote = false;
        }, () => { vm.loadingQuote = false; });
        vm.symbol = '';
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
