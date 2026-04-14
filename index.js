const { EventEmitter } = require('events')

const ee = new EventEmitter()

const readline = require('readline/promises')

const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({ input, output })

rl.addListener('error', () => rl_close())

const rl_close = () => rl.close()

// APIs

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

// const weatherAPI = require('./weather.api.js')

// const telegram = require('./telegram.channel.js')

// Channels

const whatsapp = require('./whatsapp.channel.js')

whatsapp.addEventListener('message', (msg) => {
  const [command, ...args] = msg.text.split(' ')
  ee.addListener('response:' + command, ({ detail }) => msg.reply(detail))
  ee.dispatchEvent(new CustomEvent('request:' + command, { detail: args }))
})

// Menus

const cli_message = (message) => console.log('Answer: ' + message)

const menu = async (items = []) => {
  while (true) {
    const answer = await rl.question('> ')
    if (['quit', 'exit'].includes(answer)) return rl_close()
    cli_message(answer)
  }
}

menu()
