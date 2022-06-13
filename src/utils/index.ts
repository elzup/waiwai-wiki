import { Time } from '../types'

export const pad02 = (v: number) => `${v}`.padStart(2, '0')
export const round4 = (v: number) => Math.round(v * 10000) / 10000

export const arrayToObj = (keys: string[]) => {
  const obj: Record<string, boolean> = {}

  keys.forEach((key) => {
    obj[key] = true
  })
  return obj
}

export const arrOmit = <T>(arr: T[], v: T): T[] => arr.filter((av) => av !== v)
export const arrToggle = <T>(arr: T[], v: T): T[] =>
  arr.includes(v) ? arrOmit(arr, v) : [...arr, v]

export const timeNum = (s: string) => Number(s.replace(/-/g, ''))
export const TIME_PROGRESS = '9999-99'
export const endTimeNum = (v: Time) =>
  timeNum(v.category === 'range' ? v.end ?? TIME_PROGRESS : v.time)

const addId = <T>(v: T, id: number) => ({ ...v, id: String(id) })

export const mapId = <T>(a: T[]) => a.map(addId)

export const smax = (a: string, b: string) => (a > b ? a : b)
export const smin = (a: string, b: string) => (a > b ? b : a)
