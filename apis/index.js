const apis = {
  news: require('./news.api.js'),
  mercadobitcoin: require('./mercadobitcoin.api.js'),
}

const commands = {
  news: ([q] = ['']) => apis.news.v2.everything_string({ q }),
  btcbrl: ([]) => apis.mercadobitcoin.v4.tickers_string({ symbols: ['BTC-BRL'] }),
  maincoins: ([]) => apis.mercadobitcoin.v4.tickers_string({ symbols: ['BTC-BRL',  'LTC-BRL',  'SOL-BRL'] }),
}

module.exports = commands
