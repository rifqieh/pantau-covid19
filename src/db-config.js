import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'first-87b01.firebaseapp.com',
  databaseURL: 'https://first-87b01.firebaseio.com',
  projectId: 'first-87b01',
  storageBucket: 'first-87b01.appspot.com',
  messagingSenderId: '1040834269758',
  appId: '1:1040834269758:web:4457b33163eaba94db376f'
}

firebase.initializeApp(firebaseConfig)

export default firebase
