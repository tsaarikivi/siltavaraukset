import { auth, usersRef } from '../firebase'
import { browserHistory } from 'react-router'

import { setSnackbar } from './snackbar'

export const types = {
  FETCH_USER: 'FETCH_USER'
}

// get current user
export function fetchUser() {
  return dispatch => {
    auth.onAuthStateChanged(
      user => {
        if (user) {
          console.log('signed in')
          // grab user data from database
          _getUser(user.uid, dispatch)
          setSnackbar({ message: `Kirjauduttu: ${user.email}` }, dispatch)
        } else {
          console.log('signed out')
          // set user data as null
          dispatch({
            type: types.FETCH_USER,
            payload: null
          })
          setSnackbar({ message: 'Kirjauduttu ulos' }, dispatch)
        }
      },
      err => console.error(err))
  }
}

// get user data from database
function _getUser(uid, dispatch) {
  // ref off first
  usersRefOff()
  usersRef.child(uid).on('value',
    data => _onValueChange(data, dispatch),
    err => {
      console.error(err)
      setSnackbar({ message: 'Käyttäjän tietoja ei voitu hakea. Kirjaudu uudelleen!' }, dispatch)
      setTimeout(() => signOut(), 4000)
    })
}

export function usersRefOff() {
  usersRef.off('value', _onValueChange)
}

function _onValueChange(data, dispatch) {
  let user = data.val()
  user.uid = data.key
  if (!user.admin) user.admin = false
  dispatch({
    type: types.FETCH_USER,
    payload: user
  })
}

// register user to auth
export function register({email, password}) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      // then push additional data to users database
      usersRef.child(user.uid).set({ email })
        .then(() => {
          browserHistory.push('/')
        })
        .catch(err => {
          // if data push error, then delete user too to try again
          auth.currentUser.delete()
          console.error(err)
        })
    })
    .catch(err => console.error(err))
}

// sign in with email
export function signIn({email, password}) {
  auth.signInWithEmailAndPassword(email, password)
    // redirect to home
    .then(() => {
      browserHistory.push('/')
    })
    // if user not found register it
    .catch(err => {
      console.error(err)
      if (err.code === 'auth/user-not-found') {
        register({ email, password })
      }
    })
}

// signout function
export function signOut() {
  auth.signOut()
}