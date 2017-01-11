import { coursesRef, usersRef } from '../firebase'

import { setSnackbar } from './snackbar'
import { store } from '../index.js'

import {
  getStart, getEnd, getMsFromDateAndTime,
  getClock, getLocaleDateStr, getWeekday,
  checkStarting, checkInPast
} from './time'

export const types = {
  FETCH_COURSES: 'FETCH_COURSES'
}

export const getStartingBuffer = 3
export const getUserMin = 0
export const getUserMax = 12
export const getAdminMin = -3
export const getAdminMax = 50

export function createCourse({title, desc, teacher, startTime, endTime, date, maxCapacity}) {
  const dispatch = store.dispatch
  // craft start end and time
  const start = getMsFromDateAndTime(date, startTime)
  const end = getMsFromDateAndTime(date, endTime)
  const time = getClock(startTime) + ' - ' + getClock(endTime)
  // push to database
  coursesRef.push({
    title, desc, teacher,
    start, end, time,
    maxCapacity
  })
    .then(() => {
      setSnackbar({ message: 'Tunti luotu' }, dispatch)
    })
    .catch(err => {
      console.error(err)
      setSnackbar({ message: 'Tuntia EI voitu luoda' }, dispatch)
    })
}

export function makeReservation({course: { uid, maxCapacity, start }, user}) {
  const dispatch = store.dispatch
  coursesRef.child(uid).child('reservations').transaction(
    function (reservations) {
      // if empty make fit
      if (!reservations) {
        reservations = {}
      }
      // if user fits and has capacity and is not already there, make reservation
      if (Object.keys(reservations).length < maxCapacity) {
        if (_hasCapacity(user, start)) {
          if (!reservations[user.uid]) {
            reservations[user.uid] = user.email
            setSnackbar({ message: 'Paikka varattu' }, dispatch)
            _reduceUserCapacity(user.uid, start)
          } else {
            setSnackbar({ message: 'Sinulle on jo varattu paikka' }, dispatch)
          }
        } else {
          setSnackbar({ message: 'Ei varauskapasiteettia' }, dispatch)
        }
      } else {
        setSnackbar({ message: 'Ei tilaa' }, dispatch)
      }
      return reservations
    }
  )
    .catch(err => console.error(err))
}

function _hasCapacity(user, start) {
  return _hasTime(user, start) || _hasUses(user, start)
}

export function undoReservation({course: {uid, start}, userId}, silent = false) {
  const dispatch = store.dispatch
  coursesRef.child(uid).child('reservations').child(userId).transaction(
    function (data) {
      return null
    }
  )
    .then(() => {
      if (!silent) {
        setSnackbar({ message: 'Varaus Peruttu' }, dispatch)
      }
      _incrementUserCapacity(userId, start)
    })
    .catch(err => console.error(err))
}

function _reduceUserCapacity(uid, start) {
  usersRef.child(uid).transaction(
    function (user) {
      if (user) {
        if (!_hasTime(user, start)) {
          if (_hasUses(user, start)) {
            user.uses--
          }
        }
      }
      return user
    }
  ).catch(err => console.error(err))
}

function _incrementUserCapacity(uid, start) {
  usersRef.child(uid).transaction(
    function (user) {
      if (user) {
        if (!_hasTime(user, start)) {
          user.uses++
        }
      }
      return user
    }
  )
}

function _hasTime({time}, start) {
  if (!time) return false
  return time >= start
}

function _hasUses({uses, expires}, start) {
  if (!uses || !expires) return false
  return uses > 0 && expires >= start
}

export function fetchCourseData(min, max) {
  const start = getStart(min)
  const end = getEnd(max)
  return dispatch => {
    // ref off first
    coursesRefOff()
    coursesRef
      .orderByChild('start')
      .startAt(start).endAt(end)
      .on('value',
      data => _onValueChange(data, dispatch, min, max),
      err => console.error(err))
  }
}

export function coursesRefOff() {
  coursesRef.off('value', _onValueChange)
  // TODO .then() errors
}

function _onValueChange(data, dispatch, min, max) {
  // set courses object in start order
  let courses = _initCourses(min, max)
  data.forEach(course => {
    // craft course with needed view values
    const c = course.val()
    const uid = course.key
    const timeStr = getLocaleDateStr(c.start)
    courses[timeStr].courses[uid] = _craftCourse(c, uid)
  })
  // dispatch action with courses payload
  dispatch({
    type: types.FETCH_COURSES,
    payload: courses
  })
}

function _craftCourse(course, uid) {
  // set uid
  course.uid = uid
  // set course full
  // set course capacity
  let capacity = 0
  if (course.reservations) capacity = Object.keys(course.reservations).length
  if (capacity >= course.maxCapacity) course.full = true
  else course.full = false
  course.capacity = capacity
  // set course reserved
  const user = store.getState().user
  if (course.reservations && user) {
    course.reserved = course.reservations[user.uid]
  }
  // set starting
  course.starting = checkStarting(course.start)
  // set course inPast
  course.inPast = checkInPast(course.end)

  return course
}

function _initCourses(min, max) {
  const courses = {}
  for (let i = min; i < max; i++) {
    let obj = _getTimeObjWithBuffer(i)
    courses[obj.timeStr] = { weekday: obj.weekday, courses: {} }
  }
  return courses
}

function _getTimeObjWithBuffer(buf) {
  const time = new Date()
  time.setDate(time.getDate() + buf)
  const timeStr = time.toLocaleDateString()
  const weekday = getWeekday(time)
  return { timeStr, weekday }
}

export function cancelCourse(uid) {
  const dispatch = store.dispatch
  let c = {}
  coursesRef.child(uid).transaction(
    function (course) {
      // set cancelled
      if (!course.cancelled) course.cancelled = true
      else course.cancelled = false
      // set course var checker
      c = Object.assign({}, course, { uid: uid, reservations: course.reservations })
      // set course reservations as null
      course.reservations = null
      // push course
      return course
    }
  )
    .then(() => {
      if (c.cancelled) {
        if (!checkInPast(c.end)) {
          let { reservations } = c
          for (let userId in reservations) {
            if (reservations.hasOwnProperty(userId)) {
              _incrementUserCapacity(userId, c.start)
            }
          }
        }
        setSnackbar({ message: 'Tunti peruttu' }, dispatch)
      } else {
        setSnackbar({ message: 'Tunti vapautettu' }, dispatch)
      }
    })
    .catch(err => {
      console.error(err)
      setSnackbar({ message: 'Tehtävä epäonnistui' }, dispatch)
    })
}

export function removeCourse(uid) {
  const dispatch = store.dispatch
  let c = {}
  coursesRef.child(uid).transaction(
    function (course) {
      // set course var checker
      c = Object.assign({}, course)
      // push course
      return null
    }
  )
    .then(() => {
      if (!checkInPast(c.end)) {
        let { reservations } = c
        for (let userId in reservations) {
          if (reservations.hasOwnProperty(userId)) {
            _incrementUserCapacity(userId, c.start)
          }
        }
      }
      setSnackbar({ message: 'Tunti poistettu' }, dispatch)
    })
    .catch(err => {
      console.error(err)
      setSnackbar({ message: 'Poisto epäonnistui' }, dispatch)
    })
}
