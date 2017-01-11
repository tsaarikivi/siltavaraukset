import { combineReducers } from 'redux'

import courses from './courses'
import { reducer as form } from 'redux-form'
import reservations from './reservations'
import shopitems from './shopitems'
import snackbar from './snackbar'
import user from './user'
import users from './users'

// combine all reducers to one single store
const reducers = combineReducers({
  courses,
  form,
  reservations,
  shopitems,
  snackbar,
  user,
  users
})

export default reducers;