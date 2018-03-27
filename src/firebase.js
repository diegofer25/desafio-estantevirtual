import {initializeApp} from '../node_modules/firebase'

const app = initializeApp({
  apiKey: 'AIzaSyBk_cQyhu1l0xLiZFupKM1b049ij9iJGsE',
  authDomain: 'desafioestantevirtual.firebaseapp.com',
  databaseURL: 'https://desafioestantevirtual.firebaseio.com',
  projectId: 'desafioestantevirtual',
  storageBucket: 'desafioestantevirtual.appspot.com',
  messagingSenderId: '95818360883'
})

export const addressRef = app.database().ref('address')
