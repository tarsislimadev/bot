const apis = require('./apis.js')

const readline = require('readline/promises')

const rl = readline.createInterface({ input: require('process').stdin, output: require('process').stdout })

rl.addListener('error', () => rl_close())

const rl_close = () => rl.close()

const cli_message = (message = '') => {
  const [api, ...args] = message.replace('/', '').split(' ')
  if (apis[api]) return apis[api]?.(args)
  return Promise.reject('Unknown command')
}

const menu = async () => {
  while (true) {
    const message = await rl.question('> ')
    if (['quit', 'exit'].includes(message)) return rl_close()
    await cli_message(message).then((ans) => console.log('- ' + ans)).catch((err) => console.error('| ' + err))
  }
}

menu()
