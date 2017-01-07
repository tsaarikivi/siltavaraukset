import { types } from '../actions/snackbar'

const INITIAL_STATE = {
  message: '',
  open: false
}

const snackbar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SNACKBAR:
      return Object.assign({}, state, action.payload)
    case types.CLOSE_SNACKBAR:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default snackbar
