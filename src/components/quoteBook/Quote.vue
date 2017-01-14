<template>
  <md-table-row class="has-ripple">
    <md-table-cell>{{quote.symbol}} <md-ink-ripple :class="move" /></md-table-cell>
    <md-table-cell>{{quote.bidSize}}</md-table-cell>
    <md-table-cell>{{quote.bid}}</md-table-cell>
    <md-table-cell>{{quote.ask}}</md-table-cell>
    <md-table-cell>{{quote.askSize}}</md-table-cell>
    <md-table-cell>{{quote.last}}</md-table-cell>
    <md-table-cell>
      <md-button class="md-icon-button md-raised md-warn" v-on:click="notifyUnsubscribe"><md-icon>remove</md-icon></md-button>
    </md-table-cell>
  </md-table-row>
</template>
<script>
  export default {
    props: ['quote'],
    data () {
      return {
        move: 'move-flat'
      }
    },
    methods: {
      notifyUnsubscribe: function () {
        this.$emit('unsubscribe', this.quote);
      }
    },
    computed: {
      last: function () {
        return this.quote.last;
      }
    },
    watch: {
      last: function (nv, ov) {
        const lastMove = this.move;
        if (nv > ov) {
          this.move = 'move-up';
        } else if (nv < ov) {
          this.move = 'move-down';
        } else {
          this.move = 'move-flat';
        }
        if (lastMove !== this.move) {
          const quoteLastCell = this.$el.children[0].children[0];
          const x = quoteLastCell.getBoundingClientRect().left + 25;
          const y = quoteLastCell.getBoundingClientRect().top + 15;
          // eslint-disable-next-line no-undef
          let e = new MouseEvent('mousedown', {
            'bubbles': true,
            'cancelable': true,
            'pageX': x,
            'pageY': y,
            'clientX': x,
            'clientY': y,
            'screenX': x,
            'screenY': y
          });
          quoteLastCell.dispatchEvent(e);
        }
      }
    }
  }
</script>
<style>
  .move-up {
    color: #009688;
  }
  .move-down {
    color: #e91e63;
  }
</style>
