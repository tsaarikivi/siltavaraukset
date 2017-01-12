var Mailgun = require('mailgun-js')

var mailgun = new Mailgun({
  apiKey: 'key-4230707292ae718f00a8274d41beb7f3',
  domain: 'sandbox75ae890e64684217a94067bbc25db626.mailgun.org'
})
var from_who = 'postmaster@sandbox75ae890e64684217a94067bbc25db626.mailgun.org'

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