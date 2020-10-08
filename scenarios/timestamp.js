const crypto = require('crypto')
const bus = require('./bus')

function FormatMe(n) {
  return (n<10) ? '0'+n : n;
}

function getSignature(timestamp) {
  const secret = 'phoenix_peakapi_uat'
  return crypto.createHmac('SHA1', secret)
  .update(timestamp)
  .digest('hex') // => 'f506b184773acd5f7a83a7e11c5b28e84b1eb0a5'
}
module.exports = function () {
  
var now = new Date();
var year = now.getUTCFullYear().toString();
var month = (now.getUTCMonth() + 1).toString();
var date = now.getUTCDate().toString();
var hour = now.getUTCHours().toString();
var minute = now.getUTCMinutes().toString();
var second = now.getUTCSeconds().toString();

var timestamp = year
    + FormatMe(month)
    + FormatMe(date)
    + FormatMe(hour)
    + FormatMe(minute)
    + FormatMe(second);


let timeSignature = getSignature(timestamp)
  return {
    timestamp: timestamp,
    timeSignature: timeSignature
  }
}