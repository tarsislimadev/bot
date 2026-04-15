const request = ({ url, method = 'GET', headers = {}, body = null } = {}) => fetch(url, { method, headers, body }).then(res => res.json())

module.exports = { request }
