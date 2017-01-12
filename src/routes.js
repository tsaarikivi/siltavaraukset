import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './Mui'

export default (
  <Route path="/" component={App}>
    <IndexRoute getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Courses').default)
      }, 'courses')
    } } />
    <Route path="/admin" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Admin').default)
      }, 'admin')
    } } />
    <Route path="/feedback" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Feedback').default)
      }, 'feedback')
    } } />
    <Route path="/login" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/Login').default)
      }, 'login')
    } } />
    <Route path="/user" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/User').default)
      }, 'user')
    } } />
    <Route path="/forgotpassword" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/ForgotPassword').default)
      }, 'forgotpassword')
    } } />
    <Route path="*" getComponent={(location, cb) => {
      require.ensure([], require => {
        cb(null, require('./components/NotFound').default)
      }, 'notfound')
    } } />
  </Route>
)
