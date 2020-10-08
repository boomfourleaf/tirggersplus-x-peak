const API = 'http://peakengineapidev.azurewebsites.net/api/v1/contacts'

let body = {
	"PeakContacts":
	{         
		"contacts":
		[            
			{               
				"name":"TestAPI Contacts 02-13",
				"type":1,
				"address":"145/161 Soi Khu Bon 27/7, Khu Bon Rd. ",
				"subDistrict":"Tarang",
				"district":"Bangkhen",
				"province":"Bangkok",
				"country":"Thailand",
				"postCode":"10220",
				"callCenterNumber":"0863621919",
				"faxNumber":"0863621920",
				"email":"peak@peakengine.com",
				"website":" peakengine.com ",
				"contactFirstName":"Peak",
				"contactLastName":"Engine",
				"contactNickName":"Peak",
				"contactPosition":"Developer",
				"contactPhoneNumber":"0955559999",
				"contactEmail":"sutatpan@peakengine.com",
				"bankAccount":{
					"bankId":"1",
					"bankBranch":"รัชดา1",
					"bankAccountNo":"1111222244",
					"bankAccountName":"บัญชีจ่าย"
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
  console.log(response.data.PeakContacts.contacts)
  console.log(response.data.PeakContacts.contacts.code)
}).catch(e => {
  console.log(e)
})
