import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Views
import Admin from './components/Admin'
import Courses from './components/Courses'
import Feedback from './components/Feedback'
import Login from './components/Login'
import NotFound from './components/NotFound'
import User from './components/User'

import App from './Mui'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Courses} />
    <Route path="admin" component={Admin} />
    <Route path="feedback" component={Feedback} />
    <Route path="login" component={Login} />
    <Route path="user" component={User} />
    <Route path="*" component={NotFound} />
  </Route>
)
