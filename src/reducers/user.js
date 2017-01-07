import { types } from '../actions/auth'

const INITIAL_STATE = null

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload
    default:
      return state
  }
}

export default user
