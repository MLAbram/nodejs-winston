const express = require('express');
const app = express();
const logger = require('./routes/winston');

app.use(express.json());

app.get('/', (req, res) => {
  logger.error('Error');
  logger.warn('Warn');
  logger.info('Info');
  logger.http('HTTP');
  logger.verbose('Verbose');
  logger.debug('Debug');
  logger.silly('Silly');

  return res.status(200).send('Error, Warn, Info, HTTP, Verbose, Debug, Silly');
});

app.get('/error', (req, res) => {
  logger.error('Error', {
    headersHost: req.headers,
    // headersLanguage: req.headers['accept-language'],
    // headersSecMobile: req.headers['sec-ch-ua-mobile'],
    // headersPlatform: req.headers['sec-ch-ua-platform'],
    // headersAgent: req.headers['user-agent']
  });
  
  return res.status(200).send('Error');
});

app.get('/warn', (req, res) => {
  logger.warn('Warn');
  
  return res.status(200).send('Warn');
});

app.get('/info', (req, res) => {
  logger.info('Info');
  
  return res.status(200).send('Info');
});

app.get('/http', (req, res) => {
  logger.http('HTTP');
  
  return res.status(200).send('HTTP');
});

app.get('/verbose', (req, res) => {
  logger.verbose('Verbose');
  
  return res.status(200).send('Verbose');
});

app.get('/debug', (req, res) => {
  logger.debug('Debug');
  
  return res.status(200).send('Debug');
});

app.get('/silly', (req, res) => {
  logger.silly('Silly');
  
  return res.status(200).send('Silly');
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000.');
});