var Mailgun = require('mailgun-js')

var apiKey = process.env.MAILGUN_API_KEY || 'key-4230707292ae718f00a8274d41beb7f3'
var domain = process.env.MAILGUN_DOMAIN || 'sandbox75ae890e64684217a94067bbc25db626.mailgun.org'
var from_who = process.env.MAILGUN_FROM_WHO || 'postmaster@sandbox75ae890e64684217a94067bbc25db626.mailgun.org'

var mailgun = new Mailgun({
  apiKey: apiKey,
  domain: domain
})

function sendEmails(data, res) {
  data.from = from_who
  mailgun.messages().send(data, function (err, body) {
    if (err) {
      console.log('emails were not sent - ERR:', err)
      res.send(500)
    } else {
      console.log('emails sent to', data.to)
      res.send(200)
    }
  })
}

module.exports = sendEmails