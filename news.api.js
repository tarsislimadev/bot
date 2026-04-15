const { request } = require('./utils/http.util.js')

const { get_today } = require('./utils/date.util.js')

const news_api = {
  v2: {
    everything: ({ q, from = get_today(), sortBy = 'popularity' } = {}) =>
      request({ url: `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}` }),
    everything_string: async ({ q, from = get_today(), sortBy = 'popularity' } = {}) => await news_api.v2.everything({ q, from, sortBy }).then(({ articles }) => articles?.map(article => `${article.title} - ${article.url}`).join('\n'))
  }
}

module.exports = news_api
