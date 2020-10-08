
const Axios = require('axios')
const timestamp = require('./timestamp')
const bus = require('./bus')

let stamp = timestamp()

let headers = {
  'Content-Type': 'application/json',
  'Time-Stamp': stamp.timestamp,
  'Time-Signature': stamp.timeSignature
}

let body = {
  "PeakClientToken" : {
	  "connectId": "phoenix_peakapi_uat",
	  "password": "McxKotJGhJuHTNYGz9py"
  }
}

Axios.post('http://peakengineapidev.azurewebsites.net/api/v1/clienttoken/', body, { headers: headers } ).then(response => {
  let PeakClientToken = response.data.PeakClientToken
  if (PeakClientToken.resCode == '200') {
    bus.clienToken = PeakClientToken.token
    console.log('Save token')
    console.log(bus.clienToken)
  } else {
    console.log(response.data)
  }
}).catch(e => {
  console.log(e)
})