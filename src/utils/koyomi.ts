import { rangeAdv } from '@elzup/kit'
import { Koyomi, TimePos, YmPos } from '../types'
import { timeNum, TIME_PROGRESS } from '.'

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
        end: Math.max(timeNum(c.end ?? TIME_PROGRESS), end),
      }
    },
    { bgn: 0 as TimePos, end: Infinity }
  )
}

export const parseTimePos = (time: TimePos): YmPos => ({
  y: Math.floor(time / 100),
  m: time % 100,
})

export const makeMeasure = (bgn: number, end: number) => {
  const bYm = parseTimePos(bgn)
  const eYm = parseTimePos(end)

  return rangeAdv(ymToN(bYm) - 3, ymToN(eYm) + 3).map((n) => nToYm(n))
}
