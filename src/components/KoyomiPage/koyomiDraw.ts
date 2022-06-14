import { range } from '@elzup/kit'
import { BlockLine, TimeGrid } from '../../types'

const CELL_H = 42
const CELL_W = 21

const theme = {
  bg: '#fff',
  grid1: '#808080',
  grid2: '#c0c0c0',
}

type Context = CanvasRenderingContext2D

export const draw = (
  el: HTMLCanvasElement,
  blocks: BlockLine[],
  measures: TimeGrid[]
) => {
  const w = measures.length * CELL_W
  const gh = blocks.map((v) => v.lines.length).reduce((a, b) => a + b) * CELL_H
  const hh = CELL_H
  const ghs = hh
  const h = hh + gh

  el.width = w
  el.height = h

  const ctx = el.getContext('2d')

  if (ctx === null) return

  const init = () => {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = theme.bg
    ctx.fillRect(0, 0, w, h)
  }

  const gridLine = (x: number, bold: boolean) => {
    ctx.beginPath()
    ctx.moveTo(x, ghs)
    ctx.lineTo(x, h)
    ctx.lineWidth = bold ? 2 : 1
    ctx.strokeStyle = bold ? theme.grid1 : theme.grid2
    ctx.stroke()
  }

  init()

  measures.forEach((m, i) => {
    gridLine(i * CELL_W, m.ym.m === 12)
  })
}
