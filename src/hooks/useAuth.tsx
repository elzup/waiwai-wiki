import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  getUserOptional,
  onAuthStateChanged,
  signout,
} from '../service/firebase'
import { LoginInfo } from '../types'

const authContext = createContext({} as ReturnType<typeof useProvideAuth>)

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [login, setLogin] = useState<LoginInfo>({ status: 'loading' })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (fuser) => {
      console.log('onAuthStateChanged')
      console.log(fuser)
      if (!fuser) {
        setLogin({ status: 'none' })
        return
      }
      console.log(fuser.uid)
      const { uid } = fuser

      const user = await getUserOptional(uid)

      if (!user) {
        setLogin({ status: 'auth', uid })
        return
      }

      setLogin({ status: 'comp', user, uid })
    })

    return () => unsubscribe()
  }, [])

  return {
    login,
    setLogin,
    signout,
  }
}
