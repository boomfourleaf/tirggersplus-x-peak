const API = 'http://peakengineapidev.azurewebsites.net/api/v1/paymentmethods'

let body = {  
  "PeakPaymentMethods":
  {  
   "paymentMethods":
   [  
     {  
       "type":1,
       "name":"Pea Cash",
       "memo":"จ่ายผ่านเงินสด",
       "carringBalanceValue":"5000.00"
     },
     {  
       "type":2,
       "name":"นางสาวมาณี มีหมอ",
       "memo":"จ่ายผ่านธนาคาร",
       "bankId":1,
       "carringBalanceValue":"5000.00",
       "accountType":2,
       "accountNumber":"123-1234-12-1"
     }
   ]
 }
}

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

axios.post(API, body, { headers: headers } ).then(response => {
  console.log(response.data)
}).catch(e => {
  console.log(e)
})
