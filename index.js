const { EventEmitter } = require('events')

const ee = new EventEmitter()

const newsAPI = require('./news.api.js')

ee.addListener('request:news', (event) => {
  newsAPI.v2.everything({
    q: event.detail.query,
    from: event.detail.from,
    sortBy: 'popularity'
  }).then(response => {
    ee.dispatchEvent(new CustomEvent('response:news', { detail: { articles: response.articles.map(article => `${article.title} - ${article.url}`).join('\n') } }))
  }).catch(error => {
    ee.dispatchEvent(new CustomEvent('response:news', { detail: { error: 'Error fetching news' } }))
  })
})

const weatherAPI = require('./weather.api.js')

ee.addListener('request:weather', (event) => {
  weatherAPI.getCurrentWeather(event.detail.location).then(response => {
    ee.dispatchEvent(new CustomEvent('response:weather', { detail: { weather: response } }))
  }).catch(error => {
    ee.dispatchEvent(new CustomEvent('response:weather', { detail: { error: 'Error fetching weather' } }))
  })
})

const telegram = require('./telegram.js')

telegram.on('message', (msg) => {
  const [command, ...args] = msg.text.split(' ')
  ee.addListener('response:' + command, ({ detail }) => msg.reply(detail))
  ee.dispatchEvent(new CustomEvent('request:' + command, { detail: args }))
})

const whatsapp = require('./whatsapp.js')

whatsapp.on('message', (msg) => {
  const [command, ...args] = msg.text.split(' ')
  ee.addListener('response:' + command, ({ detail }) => msg.reply(detail))
  ee.dispatchEvent(new CustomEvent('request:' + command, { detail: args }))
})
