import { Dispatch, SetStateAction, useState } from 'react'

export const useTitleCheckLocalStorage = () =>
  useLocalStorage<Record<string, boolean>>('titles', {})
export const useTitleLocalStorage = () =>
  useLocalStorage<string[]>('titles-form', [])

export function useLocalStorage<T = unknown>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)

      return item !== null ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: unknown) => {
    try {
      if (typeof window === 'undefined') return
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
