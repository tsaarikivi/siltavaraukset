'use strict'
// module requires
var restify = require('restify')
var os = require('os')

// require route handlers
var makeReservation = require('./email/makereservation')
var cancelCourse = require('./email/cancelcourse')

// create restify server
var server = restify.createServer()

// server middleware
server.use(restify.acceptParser(server.acceptable))
server.use(restify.authorizationParser())
server.use(restify.dateParser())
server.use(restify.queryParser())
server.use(restify.jsonp())
server.use(restify.gzipResponse())
server.use(restify.bodyParser({
  maxBodySize: 100000,
  mapParams: true,
  mapFiles: false,
  overrideParams: false,
  uploadDir: os.tmpdir(),
  multiples: true,
  hash: 'sha1'
}))
server.use(restify.requestExpiry({
  header: 'x-request-expiry-time'
}))
server.use(restify.throttle({
  burst: 100,
  rate: 50,
  ip: true,
  overrides: {
    '192.168.1.1': {
      rate: 0,
      burst: 0
    }
  }
}))
server.use(restify.conditionalRequest())

// routes
server.post('/makereservation/:email', makeReservation)
server.post('/cancelcourse', cancelCourse)

// ship to localhost 3001
server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url)
})