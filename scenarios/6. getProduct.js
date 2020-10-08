const API = 'http://peakengineapidev.azurewebsites.net/api/v1/products?code=P0001'

const timestamp = require('./timestamp')
const bus = require('./bus')
const axios = require('axios')

let stamp = timestamp()

let headers = {
  'Content-Type': 'application/json',
  'Time-Stamp': stamp.timestamp,
  'Time-Signature': stamp.timeSignature,
  'Client-Token': bus.clienToken,
  'User-Token': bus.userToken
}

axios.get(API, { headers: headers } ).then(response => {
  console.log(response.data.PeakProducts.products)
}).catch(e => {
  console.log(e)
})
