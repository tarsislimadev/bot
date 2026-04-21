const { request } = require('./utils/http.util.js')

const { get_today } = require('./utils/date.util.js')

const apiKey = process.env.NEWS_API_KEY

const news_api = {
  v2: {
    everything: ({ q, from = get_today() } = {}) => request({ url: `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=popularity&apiKey=${apiKey}` }),
  }
}

module.exports = {
  everything_string: async ({ q, from = get_today() } = {}) => await news_api.v2.everything({ q, from }).then(({ articles }) => articles?.map(article => `${article.title} - ${article.url}`).join('\n'))
}
