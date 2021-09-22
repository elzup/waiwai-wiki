import { getAuth, setPersistence, signInWithPopup } from 'firebase/auth'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
  getFirestore,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { ProviderType, User } from '../types'
import './firebaseInit'

export const getFirebaseAuth = () => {
  return getAuth()
}

const db = getFirestore()
const auth = getAuth()
const solveRef = () => collection(db, 'solve')

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

const userCollection = collection(db, 'user').withConverter(userConverter)

export type Solve = Record<number, Timestamp>

export const useSolve = (uid: string) => {
  const [solve, setSolve] = useState<Solve>({})

  useEffect(() => {
    solveRef()
      .doc(uid)
      .get()
      .then((snap) => {
        if (!snap.exists) return
        setSolve(snap.data() as Solve)
      })
  }, [uid])
  return { solve } as const
}

export const usableUserId = async (userId: string) => {
  const q = query(collection(db, 'user'), where('id', '==', userId))
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

export const signin = (providerType: ProviderType) => {
  const provider = getProvider(providerType)

  if (typeof window !== undefined) {
    setPersistence(Auth.Persistence.LOCAL)
  }
  signInWithPopup(provider)
}

export const signout = auth.signOut

export const { onAuthStateChanged } = auth

export const getUser = (uid: string) => getDoc(doc(userCollection, uid))
export const getUserOptional = async (uid: string) => {
  const userSnap = await getUser(uid)

  if (!userSnap.exists) return false

  const user = userSnap.data()
}
