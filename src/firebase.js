import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
  messagingSenderId: "894242881103"
}

const fb = firebase.initializeApp(config)

export default fb
export const auth = fb.auth()
export const db = fb.database()
export const usersRef = db.ref('users')
export const coursesRef = db.ref('courses')
export const reservationsRef = db.ref('reservations')
export const shopitemsRef = db.ref('shopitems')
