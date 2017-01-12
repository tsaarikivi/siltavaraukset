var footer = require('../footer')

var subject = 'siltavaraukset.com varaus'

function mail(params) {
  return `
  <h1>Varaus</h1>
  <p>Olet onnistuneesti varannut paikan <span>${params.courseTitle}</span> tunnilta</p>
  <p>Tervetuloa <span>${params.courseDate} klo ${params.courseTime}</span></p>
  ` + footer
}

exports.subject = subject
exports.mail = mail
