'use strict'

var sendEmails = require('../mailgun')

var mail = require('./mail').mail
var subject = require('./mail').subject

function cancelCourse(req, res, next) {
  var email = req.params.email

  var data = {
    to: email,
    subject: subject,
    html: mail(req.params)
  }

  sendEmails(data, res)

  next()
}

module.exports = cancelCourse
