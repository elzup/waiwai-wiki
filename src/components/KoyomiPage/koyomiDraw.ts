import { range } from '@elzup/kit'
import { BlockLine, TimeGrid } from '../../types'

const CELL_H = 100
const CELL_W = 50

const theme = {
  bg: '#fff',
  grid1: '#808080',
  grid2: '#c0c0c0',
}

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

  const write = (text: string, x: number, y: number) => {
    const tw = ctx.measureText(text).width

    ctx.fillText(text, x - tw / 2, y)
  }

  init()

  const fs = CELL_W * 0.5

  measures.forEach((m, i) => {
    const annu = m.ym.m === 12
    const x = i * CELL_W

    if (annu) {
      ctx.font = `${fs}px serif`
      ctx.fillStyle = '#000'
      write(m.ym.y.toString(), x, hh * 0.8)
    }
    // } else if (m.ym.m % 3 === 0) {
    ctx.font = `${fs * 0.8}px serif`
    ctx.fillStyle = '#888'
    write(m.ym.m.toString(), x - CELL_W / 2, hh)

    gridLine(x, annu)
  })
}
