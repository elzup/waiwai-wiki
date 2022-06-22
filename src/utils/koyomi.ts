import { formatYmd, rangeAdv } from '@elzup/kit'
import { BlockLine, Koyomi, Memory, TimeGrid, Ym, YmKey, YmNum } from '../types'

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
  toYmKey(ymAdd(toYm(toYmNum(tk)), n))
export const TIME_MAX = timeKeyAdd(TIME_NOW, 3)

export const ymKeyToMi = (s: YmKey) => ymToMi(toYm(toYmNum(s)))
export const calcStartMi = ymKeyToMi
export const calcEndMi = (v: Memory, endYmNum: number) => {
  const start = ymKeyToMi(v.time)

  if (v.category === 'point') return start
  if (v.end === undefined || v.end === null) return ymToMi(toYm(endYmNum))

  return ymKeyToMi(v.end)
}

export const getRangeKoyomi = (koyomis: Koyomi[]) => {
  const times = koyomis.map((v) => v.memories).flat()

  return times.reduce(
    ({ bgn, end }, c) => {
      const curBgn = c.time
      const curEnd = c.category === 'point' ? c.time : c.end

      return {
        bgn: Math.min(bgn, toYmNum(curBgn)),
        end: Math.max(toYmNum(curEnd ?? TIME_MAX), end),
      }
    },
    { bgn: toYmNum(TIME_NOW), end: 0 }
  )
}

export const toYm = (time: YmNum): Ym => ({
  y: Math.floor(time / 100),
  m: time % 100,
})
export const toTimePos = ({ y, m }: Ym): YmNum => y * 100 + m

export const makeMeasure = (bgn: number, end: number): TimeGrid[] => {
  const bYm = toYm(bgn)
  const eYm = toYm(end)

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

  measures.forEach((m, bi) => {
    layout[m.id] = bi * graphConfig.CELL_W
  })

  return layout
}

export const graphConfig = {
  CELL_H: 42,
  CELL_W: 36,
  MIN_MO_W: 3,
  FONT_H_RATE: 0.35,
}
