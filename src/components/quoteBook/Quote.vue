<template>
  <md-table-row>
    <md-table-cell>{{quote.symbol}}</md-table-cell>
    <md-table-cell>{{quote.bidSize}}</md-table-cell>
    <md-table-cell>{{quote.bid}}</md-table-cell>
    <md-table-cell>{{quote.ask}}</md-table-cell>
    <md-table-cell>{{quote.askSize}}</md-table-cell>
    <md-table-cell>{{quote.last}}</md-table-cell>
    <md-table-cell>
      <md-button v-on:click="notifyUnsubscribe">Unsubscribe</md-button>
    </md-table-cell>
  </md-table-row>
</template>
<script>
  export default {
    props: ['quote'],
    methods: {
      notifyUnsubscribe: function () {
        this.$emit('unsubscribe', this.quote);
      }
    }
  }
</script>
<style></style>
