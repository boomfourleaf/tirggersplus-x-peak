const crypto = require('crypto')

function FormatMe(n) {
  return (n<10) ? '0'+n : n;
}

module.exports = function () {
  return new Promise ((resolve, reject) => {
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

    return resolve(timestamp)
  })
}