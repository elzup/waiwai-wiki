import admin from 'firebase-admin'

const serviceAccountPath =
  './secrets/waiwaiwiki-staging-firebase-adminsdk-fmgdt-b284e578b6.json'
const serviceAccountProd = require(serviceAccountPath) // TODO
const serviceAccountDev = require(serviceAccountPath)

const serviceAccount =
  process.env.ENV === 'prod' ? serviceAccountDev : serviceAccountProd

// const app = firebase.initializeApp(config)

const credential = admin.credential.cert(serviceAccount)
admin.initializeApp({ credential })
export const db = admin.database()

export const unloadFirebase = () => db.app.delete()

export { admin }
