import { getStartingBuffer, getUserMin } from './courses'

export function getStart(amp = getUserMin) {
  const time = new Date()

  // set time to 00:00:00:000 at 3 days behind
  time.setDate(time.getDate() + amp)
  time.setMilliseconds(0)
  time.setSeconds(0)
  time.setMinutes(0)
  time.setHours(0)

  return time.getTime()
}

export function getEnd(amp = getUserMin) {
  const time = new Date()

  // add 50 days to filter
  time.setDate(time.getDate() + amp)

  // set time to 23:59:59:999
  time.setMilliseconds(999)
  time.setSeconds(59)
  time.setMinutes(59)
  time.setHours(23)

  return time.getTime()
}

export function getClock(time) {
  const hours = time.getHours().toString()
  let minutes = time.getMinutes()
  if (minutes < 10) minutes = '0' + minutes.toString()
  return hours + ':' + minutes
}

export function getMsFromDateAndTime(date, time) {
  date.setHours(time.getHours())
  date.setMinutes(time.getMinutes())
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

export function getLocaleDateStr(ms) {
  const time = new Date(ms)
  return time.toLocaleDateString()
}

export function getWeekday(time) {
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

export function checkInPast(ms) {
  const t = new Date()
  return ms < t.getTime()
}

export function checkStarting(ms, amp = getStartingBuffer) {
  const t = new Date()
  t.setHours(t.getHours() + amp)
  return ms < t.getTime()
}

export function getAmtDaysFromMs(ms) {
  const t = getStart()
  let ret = (ms - t) / 86400000
  // dont show negative numbers just 0
  if (ret < 0) ret = 0
  return ret
}
