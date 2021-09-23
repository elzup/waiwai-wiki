import { initializeApp, getApps } from 'firebase/app'
import 'firebase/firestore'
import { isDev } from '../utils/env'

// public keys no problem
const prodConfig = {
  apiKey: 'AIzaSyBqp0y1j6ogayjdXmiUdBJP83cDDC6JHpo',
  authDomain: 'waiwaiwiki.firebaseapp.com',
  projectId: 'waiwaiwiki',
  storageBucket: 'waiwaiwiki.appspot.com',
  messagingSenderId: '220365413281',
  appId: '1:220365413281:web:95b7a454aa7ad36c6e09e0',
  measurementId: 'G-7FKX5X49ZE',
}
const devConfg = {
  apiKey: 'AIzaSyAr6YlVPF1-dF3M4ukh0t4ESsofjhqKFI8',
  authDomain: 'waiwaiwiki-staging.firebaseapp.com',
  projectId: 'waiwaiwiki-staging',
  storageBucket: 'waiwaiwiki-staging.appspot.com',
  messagingSenderId: '781494990367',
  appId: '1:781494990367:web:7aea28bb977b58d354472a',
}

const firebaseConfig = isDev ? devConfg : prodConfig

if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}
