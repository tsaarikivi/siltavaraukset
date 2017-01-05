import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Views
import Admin from './components/Admin'
import Courses from './components/Courses'
import Feedback from './components/Feedback'
import Shop from './components/Shop'
import User from './components/User'

import App from './Mui'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Courses} />
    <Route path="admin" component={Admin} />
    <Route path="feedback" component={Feedback} />
    <Route path="shop" component={Shop} />
    <Route path="user" component={User} />
  </Route>
)
