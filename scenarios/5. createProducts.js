const API = 'http://peakengineapidev.azurewebsites.net/api/v1/products'

let body = {  
	"PeakProducts":
	{  
		"products":
		[  
			{  
				"name":"API Product Test 021",
				"purchaseValue":"10.00",
				"purchaseVattype":3,
				"sellValue":"100.00",
				"sellVatType":3,
				"description":"Design by Peak",
				"carryingBalanceValue":"15.00",
				"carryingBalanceAmount":20
			},
			{  
				"name":"API Product Test 02",
				"purchaseValue":"100.00",
				"purchaseVattype":3,
				"sellValue":"90000.00",
				"sellVatType":3,
				"description":"Design by Bill"
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
  console.log(response.data.PeakProducts)
}).catch(e => {
  console.log(e)
})
