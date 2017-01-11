import { types } from '../actions/users'

const INITIAL_STATE = {}

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USERS:
      return action.payload
    default:
      return state
  }
}

export default users
