import { initializeApp } from 'firebase/app'
import 'firebase/firestore'

const {
  FIREBASE_API_KEY: apiKey = '',
  FIREBASE_AUTH_DOMAIN: authDomain = '',
  FIREBASE_PROJECT_ID: projectId = '',
  FIREBASE_STORAGE_BUCKET: storageBucket = '',
  FIREBASE_MESSAGING_SENDER_ID: messagingSenderId = '',
  FIREBASE_APP_ID: appId = '',
  FIREBASE_MEASUREMENT_ID: measumentId = '',
} = process.env

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measumentId,
}

initializeApp(firebaseConfig)
