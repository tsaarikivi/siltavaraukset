import { combineReducers } from 'redux'

import courses from './courses'
import { reducer as form } from 'redux-form'
import reservations from './reservations'
import shopitems from './shopitems'
import user from './user'

// combine all reducers to one single store
const reducers = combineReducers({
  courses,
  form,
  reservations,
  shopitems,
  user
})

export default reducers;