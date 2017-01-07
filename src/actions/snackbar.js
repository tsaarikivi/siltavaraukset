export const types = {
  SET_SNACKBAR: 'SET_SNACKBAR',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR'
}

export function setSnackbar({ message }, dispatch) {
  dispatch({
    type: types.SET_SNACKBAR,
    payload: { message, open: true }
  })
}

export function closeSnackbar() {
  return dispatch => {
    dispatch({
      type: types.CLOSE_SNACKBAR,
      payload: { open: false }
    })
  }
}