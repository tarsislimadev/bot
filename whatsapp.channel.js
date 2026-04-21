const ee = new EventTarget()

const { Client } = require('whatsapp-web.js')

const client = new Client()

client.on('qr', (qr) => ee.dispatchEvent(new CustomEvent('whatsapp.qr', { detail: qr })))

client.on('ready', (ready) => ee.dispatchEvent(new CustomEvent('whatsapp.ready', { detail: ready })))

client.on('message', (msg) => ee.dispatchEvent(new CustomEvent('whatsapp.message', { detail: msg })))

ee.addEventListener('whatsapp.ee.initialize', (event) => client.initialize())

module.exports = ee
