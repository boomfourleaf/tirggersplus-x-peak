const serverless = require('serverless-http');
const express = require('express')
const app = express()

const createTokenApp = require('../../app/createToken')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

module.exports.handler = serverless(app);