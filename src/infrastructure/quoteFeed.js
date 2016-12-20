import io from 'socket.io-client'
import { Quote } from '../models/quote';

class Subscription {
  constructor (symbol, callback) {
    this.symbol = symbol.toUpperCase();
    this.callback = callback;
  }

  equals (symbol) {
    if (typeof symbol !== 'string') {
      return false;
    } else {
      return symbol.toUpperCase() === this.symbol;
    }
  }
}

function QuoteFeed (feedUri) {
  let self = this;
  self.socket = io(feedUri);
  self.subscribers = [];

  self.socket.on('tick', (quote) => {
    let sub = self.subscribers.filter((s) => s.equals(quote.symbol));
    if (sub.length) {
      sub[0].callback(new Quote(quote.symbol, quote.bid, quote.bidSize, quote.ask, quote.askSize, quote.last));
    }
  });

  return {
    subscribe (symbol, callback) {
      let existing = self.subscribers.filter((s) => s.equals(symbol));
      if (existing.length) {
        return;
      }
      let sub = new Subscription(symbol, callback);
      self.subscribers.push(sub);
      self.socket.emit('subscribe', sub.symbol);
    },
    unsubscribe (symbol) {
      let sub = self.subscribers.filter((s) => s.equals(symbol));
      if (sub.length) {
        self.socket.emit('unsubscribe', sub.symbol);
        self.subscribers.splice(self.subscribers.indexOf(sub), 1);
      }
    }
  }
}

export { QuoteFeed }
