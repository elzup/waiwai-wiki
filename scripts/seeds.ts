import { admin, db } from './dbload'
import { getUserOptional } from '../src/service/firebase'

async function main() {
  const devices = await db.ref('device').once('value')
  getUserOptional()
}
main().then(() => {
  admin.apps[0]?.delete()
})
