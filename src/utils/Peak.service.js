const Axios = require('axios')

const timestamp = require('./timestamp')
const signature = require('./signature')
// const bus = require('./bus')


async function createRecipte () {
  // init state
  await this.createToken()
  let stamp = await this.getTimeStamp()
  const API = 'http://peakengineapidev.azurewebsites.net/api/v1/receipts'

  console.log(this.userToken)
  let body = {
    "PeakReceipts":
    {
      "receipts":
      [
        {
          "issuedDate":"20201010",
          "dueDate":"20201010",
          "contactCode":"C00001",
          "reference": "#000123",
          "tags":
          [
            "TestAPI",
            "Bill"
          ],
          "products":
          [
            {
              "id":null,"productId":null,"productCode":"P00004","productTemplate":null,"description":null,"accountCode":null,"accountSubId":null,"accountSubCode":null,"quantity":1.0,"price":100,"discount":null,"vatType":null
            },
            {
              "id":null,"productId":null,"productCode":"P00005","productTemplate":null,"description":null,"accountCode":null,"accountSubId":null,"accountSubCode":null,"quantity":1.0,"price":10,"discount":null,"vatType":null
            },
          ],
          "istaxInvoice":1,
          "taxStatus":1,                
          "paidPayments":
          {
            "paymentDate":"20201010",
            "payments":
            [
              {
                "paymentMethodId": "a4cfb853-f05e-46ab-bac8-c02fcb7d59e3",
                "amount": 110.00
              }
            ]
          }
        }
      ]
    }
  }
  let headers = {
    'Content-Type': 'application/json',
    'Time-Stamp': stamp.timestamp,
    'Time-Signature': stamp.timeSignature,
    'Client-Token': this.clienToken,
    'User-Token': this.userToken
  }
  
  Axios.post(API, body, { headers: headers } ).then(response => {
    console.log(response.data.PeakReceipts)
  }).catch(e => {
    console.log(e)
  })
}



const PeakAPI = {
  clienToken: '',
  userToken: 'eb845bd2-b080-4d0b-a46b-4a54c15a419a',
  async getTimeStamp () {
    let time = await timestamp()
    let stamp = await signature(time)
    return stamp
  },
  async createToken () {
    let stamp = await this.getTimeStamp()
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
    
    return Axios.post('http://peakengineapidev.azurewebsites.net/api/v1/clienttoken/', body, { headers: headers } ).then(response => {
      let PeakClientToken = response.data.PeakClientToken
      if (PeakClientToken.resCode == '200') {
        if (response.data.PeakClientToken.resCode == '200') {
          this.clienToken = PeakClientToken.token
        } else {
          console.log(PeakClientToken)
        }
      } else {
        console.log(response.data)
      }
    }).catch(e => {
      console.log(e)
    })
  },
  async getContact (code='C00003') {
    try {
      // init state
      await this.createToken()
      let stamp = await this.getTimeStamp()

      const API = `http://peakengineapidev.azurewebsites.net/api/v1/contacts?code=${code}`
      let headers = {
        'Content-Type': 'application/json',
        'Time-Stamp': stamp.timestamp,
        'Time-Signature': stamp.timeSignature,
        'Client-Token': this.clienToken,
        'User-Token': this.userToken
      }
      console.log(headers)
      await Axios.get(API, { headers: headers } ).then(response => {
        console.log(response.data.PeakContacts)
      }).catch(e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }
  },
  createRecipte: createRecipte
}

module.exports = PeakAPI

// PeakAPI.createToken()
// PeakAPI.getContact()
PeakAPI.createRecipte()