
const API = 'http://peakengineapidev.azurewebsites.net/api/v1/invoices'

let body = {
	"PeakInvoices":
	{
		"invoices":
		[
			{
				"issuedDate":"20200810",
				"dueDate":"20200810",
				"contactId":"deb82706-9527-4682-a179-ba883ee348cf",
				"tags":
				[
					"TestAPI",
					"Bill"
				],
				"products":
				[
					{
						"productCode":"P00003",
						"quantity":20,
						"price":"100.00",
						"vatType":3
					}
				],
				"istaxInvoice":1,
				"paidPayments":
				{
					"paymentDate":"20200810",
					"payments":
					[
						{
							"paymentMethodId":"a4cfb853-f05e-46ab-bac8-c02fcb7d59e3",
							"amount":2000
						},
						{
							"accountCode":"530501",
							"amount":1
						}
					]
				}
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
  console.log(response.data.PeakInvoices.invoices)
}).catch(e => {
  console.log(e)
})