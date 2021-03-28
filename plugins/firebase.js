import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBQzHXztphESVEVe8yySH0de39Lhmlg6jY',
    authDomain: 'ganja-thread.firebaseapp.com',
    databaseURL: 'https://ganja-thread.firebaseio.com',
    projectId: 'ganja-thread',
    storageBucket: 'ganja-thread.appspot.com',
    messagingSenderId: '947993395595',
    appId: '1:947993395595:web:ee634d1c79adae63b4ef8e',
  })
}

export default firebase
