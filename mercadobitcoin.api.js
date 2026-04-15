const { request } = require('./utils/http.util.js')

const mercadobitcoin = {
  v4: {
    tickers: ({ symbols = [] } = {}) => request({ url: `https://api.mercadobitcoin.net/api/v4/tickers?symbols=${symbols.join(',')}` }),
    tickers_string: ({ symbols = [] } = { symbols }) => mercadobitcoin.v4.tickers({ symbols }).then((items) => ['Buy:', ...items.map(({ pair, buy }) => `${pair} at ${+buy}`)].join('\n'))
  }
}

module.exports = mercadobitcoin
