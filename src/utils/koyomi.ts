import { formatYmd, rangeAdv } from '@elzup/kit'
import { Koyomi, Time, TimeGrid, TimePos, YmPos } from '../types'

export const timeNum = (s: string) => Number(s.replace(/-/g, ''))
export const TIME_PROGRESS = '9999-99'
export const TIME_NOW = formatYmd(new Date()).substring(0, 7)

export const endTimeNum = (v: Time) =>
  timeNum(v.category === 'range' ? v.end ?? TIME_PROGRESS : v.time)

export const nToYm = (n: number): YmPos => ({
  y: Math.floor(n / 12),
  m: n % 12,
})
export const ymToN = ({ y, m }: YmPos): number => y * 12 + m
export const ymAdd = (ym: YmPos, n: number): YmPos => nToYm(ymToN(ym) + n)

export const getRangeKoyomi = (koyomis: Koyomi[]) => {
  const times = koyomis.map((v) => v.times).flat()

  return times.reduce(
    ({ bgn, end }, c) => {
      if (c.category === 'point') return { bgn, end }
      return {
        bgn: Math.min(bgn, timeNum(c.time)),
        end: Math.max(timeNum(c.end ?? TIME_NOW), end),
      }
    },
    { bgn: timeNum(TIME_NOW), end: 0 }
  )
}

export const parseTimePos = (time: TimePos): YmPos => ({
  y: Math.floor(time / 100),
  m: time % 100,
})
export const toTimePos = ({ y, m }: YmPos): TimePos => y * 100 + m

export const makeMeasure = (bgn: number, end: number): TimeGrid[] => {
  const bYm = parseTimePos(bgn)
  const eYm = parseTimePos(end)

  return rangeAdv(ymToN(bYm) - 3, ymToN(eYm) + 3).map((n) => {
    const ym = nToYm(n)

    return { n, ym, id: toTimePos(ym) }
  })
}
