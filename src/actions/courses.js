import { coursesRef, usersRef } from '../firebase'

import { store } from '../index.js'

export const types = {
  FETCH_COURSES: 'FETCH_COURSES'
}

export function makeReservation({course: { uid, maxCapacity, start }, user}) {
  coursesRef.child(uid).child('reservations').transaction(
    function (reservations) {
      // if empty make fit
      if (!reservations) {
        reservations = {}
      }
      // if user fits and has capacity, make reservation
      if (Object.keys(reservations).length < maxCapacity) {
        if (_hasCapacity(user, start)) {
          reservations[user.uid] = user.email
          _reduceUserCapacity(user.uid, start)
        }
      }
      return reservations
    }
  ).catch(err => console.error(err))
}

function _hasCapacity(user, start) {
  return _hasTime(user, start) || _hasUses(user, start)
}

export function undoReservation({course, user}) {
  const { uid, start } = course
  const userId = user.uid
  coursesRef.child(uid).child('reservations').child(userId).transaction(
    function (data) {
      return null
    }
  )
    .then(() => {
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

export function fetchCourseData() {
  return dispatch => {
    // get courses
    const start = _getStart()
    const end = _getEnd()
    // ref off first
    coursesRefOff()
    coursesRef
      .orderByChild('start')
      .startAt(start).endAt(end)
      .on('value',
      data => _onValueChange(data, dispatch),
      err => console.error(err))
  }
}

export function coursesRefOff() {
  coursesRef.off('value', _onValueChange)
}

function _onValueChange(data, dispatch) {
  // set courses object in start order
  let courses = _initCourses()
  data.forEach(course => {
    // craft course with needed view values
    courses = _putCourse(courses, course)
  })
  // dispatch action with courses payload
  dispatch({
    type: types.FETCH_COURSES,
    payload: courses
  })
}

function _putCourse(courses, course) {
  const c = course.val()
  const uid = course.key
  const timeStr = _getTimeStr(c.start)
  courses[timeStr].courses[uid] = _craftCourse(c, uid)
  return courses
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
  course.starting = _checkStarting(course.start)
  // set course inPast
  course.inPast = _checkInPast(course.start)

  return course
}

function _initCourses() {
  const courses = {}
  for (let i = 0; i < 12; i++) {
    let obj = _getTimeObjWithBuffer(i)
    courses[obj.timeStr] = { weekday: obj.weekday, courses: {} }
  }
  return courses
}

function _getTimeStr(ms) {
  const time = new Date(ms)
  return time.toLocaleDateString()
}

function _getTimeObjWithBuffer(buf) {
  const time = new Date()
  time.setDate(time.getDate() + buf)
  const timeStr = time.toLocaleDateString()
  const weekday = _getWeekday(time)
  return { timeStr, weekday }
}

function _checkInPast(ms) {
  const t = new Date()
  return ms < t.getTime()
}

function _checkStarting(ms) {
  const t = new Date()
  t.setHours(t.getHours() + 3)
  return ms < t.getTime()
}

function _getWeekday(time) {
  const day = time.getDay()
  switch (day) {
    case 0: return 'Sunnuntai'
    case 1: return 'Maanantai'
    case 2: return 'Tiistai'
    case 3: return 'Keskiviikko'
    case 4: return 'Torstai'
    case 5: return 'Perjantai'
    case 6: return 'Lauantai'
    default: return '?'
  }
}

function _getStart() {
  const time = new Date()

  // set time to 00:00:00:000
  time.setMilliseconds(0)
  time.setSeconds(0)
  time.setMinutes(0)
  time.setHours(0)

  return time.getTime()
}

function _getEnd() {
  const time = new Date()

  // add 12 days to filter
  time.setDate(time.getDate() + 11)

  // set time to 23:59:59:999
  time.setMilliseconds(999)
  time.setSeconds(59)
  time.setMinutes(59)
  time.setHours(23)

  return time.getTime()
}
