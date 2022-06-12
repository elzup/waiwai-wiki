import { Time, Koyomi } from '../types'
import { TIME_PROGRESS, timeNum } from '.'

export const calcLayoutTimes = (
  times: Time[],
  koyomiMin: number,
  koyomiMax: number
) => {}

export const calcLayoutKoyomi = (koyomis: Koyomi[]) => {
  const { koyomiMin, koyomiMax } = getRangeKoyomi(koyomis)

  koyomis.map((v) => ({}))
}

export const getRangeKoyomi = (koyomis: Koyomi[]) => {
  const times = koyomis.map((v) => v.times).flat()

  const { min: koyomiMin, max: koyomiMax } = times.reduce(
    ({ min, max }, c) => {
      if (c.category === 'point') return { max, min }
      return {
        max: Math.max(timeNum(c.end ?? TIME_PROGRESS), max),
        min: Math.min(min, timeNum(c.time)),
      }
    },
    { max: 0, min: Infinity }
  )

  return { koyomiMin, koyomiMax }
}
