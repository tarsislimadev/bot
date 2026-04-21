const readline = require('readline/promises')

const { stdin: input, stdout: output } = require('process')

const rl = readline.createInterface({ input, output })

rl.addListener('error', () => rl.close())

rl.addListener('line', (line) => ee.dispatchEvent(new CustomEvent('cli.line', { detail: line })))

const ee = new EventTarget()

ee.addListener('cli.ee.close', () => rl.close())

module.exports = ee
