import { Time, Koyomi, TimePos } from '../types'
import { TIME_PROGRESS, timeNum } from '.'

export const calcLayoutTimes = (times: Time[], bgn: number, end: number) => {}

export const calcLayoutKoyomi = (koyomis: Koyomi[]) => {
  const { bgn, end } = getRangeKoyomi(koyomis)

  koyomis.map((v) => ({}))
}

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

export const parseTimePos = (time: TimePos) => ({
  y: Math.floor(time / 100),
  m: time % 100,
})

export const makeMeasure = (bgn: number, end: number) => {
  const { y: by, m: bm } = parseTimePos(bgn)
  const { y: ey, m: em } = parseTimePos(end)
}
