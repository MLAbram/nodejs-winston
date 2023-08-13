const express = require('express')
const app = express()
const winston = require('./routes/winston')

app.use(express.json())

app.get('/', (req, res) => {
  winston.error('Error')
  winston.warn('Warn')
  winston.info('Info')
  winston.http('HTTP')
  winston.verbose('Verbose')
  winston.debug('Debug')
  winston.silly('Silly')

  return res.status(200).send('Error, Warn, Info, HTTP, Verbose, Debug, Silly')
})

app.get('/error', (req, res) => {
  winston.error({
    routeName: 'index.js',
    routeFunction: '/error',
    // headersHost: req.headers,
    // headersLanguage: req.headers['accept-language'],
    // headersSecMobile: req.headers['sec-ch-ua-mobile'],
    // headersPlatform: req.headers['sec-ch-ua-platform'],
    // headersAgent: req.headers['user-agent'],
    message: 'This is only a test...'
  })
  
  return res.status(200).send('Error')
})

app.get('/warn', (req, res) => {
  winston.warn('Warn')
  
  return res.status(200).send('Warn')
})

app.get('/info', (req, res) => {
  winston.info('Info')
  
  return res.status(200).send('Info')
})

app.get('/http', (req, res) => {
  winston.http('HTTP')
  
  return res.status(200).send('HTTP')
})

app.get('/verbose', (req, res) => {
  winston.verbose('Verbose')
  
  return res.status(200).send('Verbose')
})

app.get('/debug', (req, res) => {
  winston.debug('Debug')
  
  return res.status(200).send('Debug')
})

app.get('/silly', (req, res) => {
  winston.silly('Silly')
  
  return res.status(200).send('Silly')
})

app.listen(3000, () => {
  console.log('Server listening on port: 3000.')
})