
const API = 'http://peakengineapidev.azurewebsites.net/api/v1/receipts'

let body = {
	"PeakReceipts":
	{
		"receipts":
		[
			{
				"issuedDate":"20201010",
				"dueDate":"20201010",
				"contactCode":"C00001",
				"tags":
				[
					"TestAPI",
					"Bill"
				],
				"products":
				[
					{
						"id":null,"productId":null,"productCode":"P00001","productTemplate":null,"description":null,"accountCode":null,"accountSubId":null,"accountSubCode":null,"quantity":1.0,"price":106.36,"discount":null,"vatType":null
					},
					{
						"id":null,"productId":null,"productCode":"P00001","productTemplate":null,"description":null,"accountCode":null,"accountSubId":null,"accountSubCode":null,"quantity":1.0,"price":17.1,"discount":null,"vatType":null},
					{
						"id":null,"productId":null,"productCode":"P00001","productTemplate":null,"description":null,"accountCode":null,"accountSubId":null,"accountSubCode":null,"quantity":1.0,"price":55.0,"discount":null,"vatType":null
					}
				],
				"istaxInvoice":1,
				"taxStatus":1,                
				"paidPayments":
				{
					"paymentDate":"20201010",
					"payments":
					[
						{
              "paymentMethodId": "8f2e8d99-6841-4bde-b6b8-7ea16a1c3bb3",
							"amount":178.46
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
  console.log(response.data.PeakReceipts)
}).catch(e => {
  console.log(e)
})