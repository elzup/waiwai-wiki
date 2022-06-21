import { formatYmd, rangeAdv } from '@elzup/kit'
import { BlockLine, Koyomi, Memory, TimeGrid, YmKey, YmNum, Ym } from '../types'

type Mi = number

export const toYmNum = (s: YmKey): YmNum => Number(s.replace(/-/g, ''))
export const toYmKey = (ym: Ym): YmKey =>
  `${ym.y}-${String(ym.m).padStart(2, '0')}`
export const TIME_PROGRESS = '9999-99'
export const TIME_NOW = formatYmd(new Date()).substring(0, 7)

export const miToYm = (n: Mi): Ym => ({
  y: Math.floor((n - 1) / 12),
  m: ((n - 1) % 12) + 1,
})
export const ymToMi = ({ y, m }: Ym): Mi => y * 12 + (m - 1)
export const ymAdd = (ym: Ym, n: number): Ym => miToYm(ymToMi(ym) + n)
export const timeKeyAdd = (tk: YmKey, n: number): YmKey =>
  toYmKey(ymAdd(timeNumToTimePos(toYmNum(tk)), n))

export const endTimeNum = (v: Memory, end: number) => {
  const start = toYmNum(v.time)

  if (v.category === 'point') return start
  if (v.end === undefined || v.end === null) return end

  return toYmNum(v.end)
}

export const getRangeKoyomi = (koyomis: Koyomi[]) => {
  const times = koyomis.map((v) => v.memories).flat()

  return times.reduce(
    ({ bgn, end }, c) => {
      if (c.category === 'point') return { bgn, end }
      return {
        bgn: Math.min(bgn, toYmNum(c.time)),
        end: Math.max(toYmNum(c.end ?? TIME_NOW), end),
      }
    },
    { bgn: toYmNum(TIME_NOW), end: 0 }
  )
}

export const timeNumToTimePos = (time: YmNum): Ym => ({
  y: Math.floor(time / 100),
  m: time % 100,
})
export const toTimePos = ({ y, m }: Ym): YmNum => y * 100 + m

export const makeMeasure = (bgn: number, end: number): TimeGrid[] => {
  const bYm = timeNumToTimePos(bgn)
  const eYm = timeNumToTimePos(end)

  return rangeAdv(ymToMi(bYm) - 3, ymToMi(eYm) + 3).map((n) => {
    const ym = miToYm(n)

    return { n, ym, id: toTimePos(ym) }
  })
}

export const calcLayoutY = (blocks: BlockLine[]) => {
  const layout: { [key: string]: number } = {}

  let i = 0

  blocks.forEach(({ lines }, bi) => {
    lines.forEach((cells, ci) => {
      layout[`${bi}-${ci}`] = i * graphConfig.CELL_H
      i++
    })
  })

  return layout
}

export const calcLayoutX = (measures: TimeGrid[]) => {
  const layout: { [key: string]: number } = {}

  if (measures[0] === undefined) return layout

  const firstYear = measures[0].ym.y

  measures.forEach((m, bi) => {
    layout[m.id] = bi * graphConfig.CELL_W + m.ym.y - firstYear
  })

  return layout
}

export const graphConfig = {
  CELL_H: 42,
  CELL_W: 36,
}
