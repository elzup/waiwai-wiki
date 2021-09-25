import admin from 'firebase-admin'

const serviceAccountProd = require('')
const serviceAccountDev = require('./secrets/waiwaiwiki-staging-firebase-adminsdk-fmgdt-b284e578b6.json')

const serviceAccount =
  process.env.ENV === 'prod' ? serviceAccountDev : serviceAccountProd

// const app = firebase.initializeApp(config)

const credential = admin.credential.cert(serviceAccount)
admin.initializeApp({ credential })
export const db = admin.database()
export { admin }
