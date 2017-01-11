import { usersRef } from '../firebase'

import { getStart, getAmtDaysFromMs } from './time'

export const types = {
  FETCH_USERS: 'FETCH_USERS'
}

export function fetchUsers() {
  return dispatch => {
    usersRefOff()
    usersRef.on('value',
      data => _onValueChange(data, dispatch),
      err => console.error(err))
  }
}

function _onValueChange(data, dispatch) {
  let users = {}
  data.forEach(user => {
    let u = user.val()
    // set uid
    u.uid = user.key
    // set expires and time as calculated ints
    u.expires = getAmtDaysFromMs(u.expires)
    u.time = getAmtDaysFromMs(u.time)
    // set user to its key
    users[user.key] = u
  })
  dispatch({
    type: types.FETCH_USERS,
    payload: users
  })
}

export function usersRefOff() {
  usersRef.off('value', _onValueChange)
}

export function incrementUses(uid) {
  usersRef.child(uid).child('uses').transaction(
    function (uses) {
      if (uses >= 0) uses++
      else uses = 0
      return uses
    }
  )
}

export function incrementExpires(uid) {
  usersRef.child(uid).child('expires').transaction(
    function (expires) {
      const t = getStart()
      if (expires < t) expires = t
      else expires += 86400000
      return expires
    }
  )
}

export function incrementTime(uid) {
  usersRef.child(uid).child('time').transaction(
    function (time) {
      const t = getStart()
      if (time < t) time = t
      else time += 86400000
      return time
    }
  )
}

export function decrementUses(uid) {
  usersRef.child(uid).child('uses').transaction(
    function (uses) {
      if (uses > 0) uses--
      else uses = 0
      return uses
    }
  )
}

export function decrementExpires(uid) {
  usersRef.child(uid).child('expires').transaction(
    function (expires) {
      const t = getStart()
      if (expires - 86400000 < t) expires = t
      else expires -= 86400000
      return expires
    }
  )
}

export function decrementTime(uid) {
  usersRef.child(uid).child('time').transaction(
    function (time) {
      const t = getStart()
      if (time - 86400000 < t) time = t
      else time -= 86400000
      return time
    }
  )
}
