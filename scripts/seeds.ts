import * as dbload from './dbload'
import { getUserOptional } from '../src/service/firebase'

async function main() {
  const devices = await dbload.db.ref('device').once('value')
}

main().then(() => {
  dbload.admin.apps[0]?.delete()
})
