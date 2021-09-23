/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
import admin from 'firebase-admin'

const serviceAccountProd = require('')
const serviceAccountDev = require('./secrets/waiwaiwiki-staging-firebase-adminsdk-fmgdt-b284e578b6.json')

const envfile = process.env.ENV_FILE || '.env.development'

const serviceAccount =
  envfile === '.env.development' ? serviceAccountDev : serviceAccountProd

// const app = firebase.initializeApp(config)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
export const db = admin.database()
export { admin }
