import { types } from '../actions/courses'

const INITIAL_STATE = {}

const courses = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_COURSES:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default courses
