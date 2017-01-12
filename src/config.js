function _getServerUrl() {
  if (process.env.NODE_ENV === "production") {
    console.log('using production servers')
    return 'http://localhost:3001'
  } else {
    console.log('using development servers')
    return 'http://localhost:3001'
  }
}

function _getFirebaseConfig() {
  if (process.env.NODE_ENV === "production") {
    console.log('database using production config')
    return {
      apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
      authDomain: "joogakoulusilta-projekti.firebaseapp.com",
      databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
      storageBucket: "joogakoulusilta-projekti.appspot.com",
      messagingSenderId: "894242881103"
    }
  } else {
    console.log('database using development config')
    return {
      apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
      authDomain: "joogakoulusilta-projekti.firebaseapp.com",
      databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
      storageBucket: "joogakoulusilta-projekti.appspot.com",
      messagingSenderId: "894242881103"
    }
  }
}

export const FIREBASECONFIG = _getFirebaseConfig()

export const SERVERURL = _getServerUrl()