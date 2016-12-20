function Quote (symbol, bid, bidSize, ask, askSize, last) {
  if (typeof symbol !== 'string') {
    throw new Error('Invalid Quote Symbol');
  }

  return {
    symbol: symbol.toUpperCase(),
    bid: bid,
    bidSize: bidSize,
    ask: ask,
    askSize: askSize,
    last: last,
    update (quote) {
      if (typeof symbol !== 'string') {
        throw new Error('Invalid Quote Symbol');
      }
      if (this.symbol !== quote.symbol.toUpperCase()) {
        throw new Error('Given symbol is not for this quote.');
      }
      this.bid = quote.bid;
      this.bidSize = quote.bidSize;
      this.ask = quote.ask;
      this.askSize = quote.askSize;
      this.last = quote.last;
    },
    equals (quote) {
      return (quote.hasOwnProperty('symbol') && quote.symbol === this.symbol);
    }
  }
}

export { Quote }
