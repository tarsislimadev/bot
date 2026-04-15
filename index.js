const apis = require('./apis.js')

const readline = require('readline/promises')

const rl = readline.createInterface({ input: require('process').stdin, output: require('process').stdout })

rl.addListener('error', () => rl_close())

const rl_close = () => rl.close()

const cli_message = async (message = '') => {
  const [command, ...args] = message.split(' ')
  switch (command) {
    case '/news': return await apis.news.v2.everything_string({ q: args.join(' '), sortBy: 'popularity' })
  }
  return Promise.reject('Unknown command')
}

const menu = async () => {
  while (true) {
    const answer = await rl.question('> ')
    if (['quit', 'exit'].includes(answer)) return rl_close()
    await cli_message(answer).then((ans) => console.log('Answer: ' + ans)).catch((err) => console.error('Error: ' + err))
  }
}

menu()
