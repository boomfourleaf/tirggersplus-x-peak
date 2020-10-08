const crypto = require('crypto')

function getSignature(timestamp) {
  return new Promise ((resolve, reject) => {
    const secret = 'phoenix_peakapi_uat'
      let hash = crypto.createHmac('SHA1', secret)
      .update(timestamp)
      .digest('hex') // => 'f506b184773acd5f7a83a7e11c5b28e84b1eb0a5'

      resolve(hash)
  })
}

module.exports = async function (timestamp) {
  let timeSignature = await getSignature(timestamp)
  return {
    timestamp: timestamp,
    timeSignature: timeSignature
  }
}
