import firebase from 'firebase'

import { FIREBASECONFIG } from './config'

const fb = firebase.initializeApp(FIREBASECONFIG)

export default fb
export const auth = fb.auth()
export const db = fb.database()
export const usersRef = db.ref('users')
export const coursesRef = db.ref('courses')
export const reservationsRef = db.ref('reservations')
export const shopitemsRef = db.ref('shopitems')
