import { formatYmd, rangeAdv } from '@elzup/kit'
import {
  BlockLine,
  Koyomi,
  Memory,
  TimeGrid,
  TimeKey,
  TimePos,
  YmPos,
} from '../types'

type TimeNum = number

export const toTimeNum = (s: TimeKey): TimeNum => Number(s.replace(/-/g, ''))
export const ymPosToTimeKey = (ym: YmPos): TimeKey =>
  `${ym.y}-${String(ym.m).padStart(2, '0')}`
export const TIME_PROGRESS = '9999-99'
export const TIME_NOW = formatYmd(new Date()).substring(0, 7)

export const endTimeNum = (v: Memory, min = 3) => {
  const start = toTimeNum(v.time)

  if (v.category === 'point') return start
  if (v.end === undefined || v.end === null) return toTimeNum(TIME_PROGRESS)

  return Math.max(start + min, toTimeNum(v.end))
}

export const nToYm = (n: number): YmPos => ({
  y: Math.floor((n - 1) / 12),
  m: ((n - 1) % 12) + 1,
})
export const ymToN = ({ y, m }: YmPos): number => y * 12 + (m - 1)
export const ymAdd = (ym: YmPos, n: number): YmPos => nToYm(ymToN(ym) + n)
export const timeKeyAdd = (tk: TimeKey, n: number): TimeKey =>
  ymPosToTimeKey(ymAdd(timeNumToTimePos(toTimeNum(tk)), n))

export const getRangeKoyomi = (koyomis: Koyomi[]) => {
  const times = koyomis.map((v) => v.memories).flat()

  return times.reduce(
    ({ bgn, end }, c) => {
      if (c.category === 'point') return { bgn, end }
      return {
        bgn: Math.min(bgn, toTimeNum(c.time)),
        end: Math.max(toTimeNum(c.end ?? TIME_NOW), end),
      }
    },
    { bgn: toTimeNum(TIME_NOW), end: 0 }
  )
}

export const timeNumToTimePos = (time: TimePos): YmPos => ({
  y: Math.floor(time / 100),
  m: time % 100,
})
export const toTimePos = ({ y, m }: YmPos): TimePos => y * 100 + m

export const makeMeasure = (bgn: number, end: number): TimeGrid[] => {
  const bYm = timeNumToTimePos(bgn)
  const eYm = timeNumToTimePos(end)

  return rangeAdv(ymToN(bYm) - 3, ymToN(eYm) + 3).map((n) => {
    const ym = nToYm(n)

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
