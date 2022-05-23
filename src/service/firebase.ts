import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as onAuthStateChangedFirebase,
  setPersistence,
  signInWithPopup as signInWithPopupFirebase,
  TwitterAuthProvider,
} from 'firebase/auth'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  where,
} from 'firebase/firestore'
import { ProviderType, User } from '../types'
import './firebaseInit'

export const getFirebaseAuth = () => {
  return getAuth()
}

const db = getFirestore()
const auth = getAuth()

const userConverter = {
  toFirestore(user: User): DocumentData {
    return user
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return { id: data.id }
  },
}

const userCollection = collection(db, 'users').withConverter(userConverter)

export type Solve = Record<number, Timestamp>

export const usableUserId = async (userId: string) => {
  const q = query(userCollection, where('id', '==', userId))
  const docs = await getDocs(q)

  return docs.size === 0
}

export const getProvider = (providerType: ProviderType) => {
  switch (providerType) {
    case 'google':
      return new GoogleAuthProvider()
    case 'twitter':
      return new TwitterAuthProvider()
  }
}

export const signInWithPopup = (providerType: ProviderType) => {
  const provider = getProvider(providerType)

  if (typeof window !== undefined) {
    setPersistence(auth, browserLocalPersistence)
  }
  return signInWithPopupFirebase(auth, provider)
}

export const signout = auth.signOut
export const onAuthStateChanged = onAuthStateChangedFirebase.bind(null, auth)

export const getUserDoc = (uid: string) => doc(userCollection, uid)
export const getUser = (uid: string) => getDoc(getUserDoc(uid))
export const createUser = (uid: string, user: User) =>
  setDoc(getUserDoc(uid), { id: user.id })

export const getUserOptional = async (uid: string) => {
  const userSnap = await getUser(uid)

  if (!userSnap.exists()) return false

  return userSnap.data() || false
}

export const getUserOrCreate = async (
  uid: string,
  id: string
): Promise<User> => {
  const userOpt = await getUserOptional(uid)

  if (userOpt) return userOpt

  const user = { id }

  await createUser(uid, user)

  return user
}
