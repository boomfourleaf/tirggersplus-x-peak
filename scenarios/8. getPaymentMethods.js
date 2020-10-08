const API = 'http://peakengineapidev.azurewebsites.net/api/v1/paymentmethods'

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
  console.log(response.data.PeakPaymentMethods.paymentMethods)
}).catch(e => {
  console.log(e)
})
