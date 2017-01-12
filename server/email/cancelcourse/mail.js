var footer = require('../footer')

var subject = 'siltavaraukset.com tunti peruttu'

function mail(params) {
  return `
  <h1>Tunti peruttu</h1>
  <p>Tunti <span>${params.courseTitle}</span> on peruttu</p>
  <p><span>${params.courseDate} klo ${params.courseTime}</span></p>
  <p>Pahoittelumme. Tervetuloa jonakin toisena ajankohtana!</p>
  ` + footer
}

exports.subject = subject
exports.mail = mail
