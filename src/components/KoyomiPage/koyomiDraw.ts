import { BlockLine, TimeGrid } from '../../types'
import { graphConfig } from '../../utils/koyomi'

const { CELL_H, CELL_W } = graphConfig

const font = (size: number) => `${size}px 'Noto Sans JP', sans-serif`

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
  const ctx = el.getContext('2d')

  if (ctx === null) return

  const fs = CELL_H * 0.5
  const titleFs = CELL_H * 0.6

  ctx.font = font(titleFs)
  const mlw = blocks.reduce(
    (p, c) => Math.max(p, ctx.measureText(c.koyomi.title).width),
    0
  )

  const gw = measures.length * CELL_W
  const w = mlw + gw
  const gh = blocks.map((v) => v.lines.length).reduce((a, b) => a + b) * CELL_H
  const hh = CELL_H
  const ghs = hh
  const h = hh + gh

  el.width = w
  el.height = h

  const init = () => {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = theme.bg
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#ddf'
    ctx.fillRect(0, 0, mlw, h)
  }

  const gridLine = (x: number, bold: boolean) => {
    ctx.beginPath()
    ctx.moveTo(mlw + x, ghs)
    ctx.lineTo(mlw + x, h)
    ctx.lineWidth = bold ? 2 : 1
    ctx.strokeStyle = bold ? theme.grid1 : theme.grid2
    ctx.stroke()
  }
  const gridLineRow = (y: number) => {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.lineWidth = 1
    ctx.strokeStyle = theme.grid2
    ctx.stroke()
  }

  const write = (text: string, x: number, y: number) => {
    ctx.fillText(text, x, y)
  }
  const writeMid = (text: string, x: number, y: number) => {
    const tw = ctx.measureText(text).width

    write(text, x - tw / 2, y)
  }

  init()

  measures.forEach((m, i) => {
    const annu = m.ym.m === 1
    const x = (i + 1) * CELL_W

    if (annu) {
      ctx.font = font(fs)
      ctx.fillStyle = '#000'
      writeMid(m.ym.y.toString(), mlw + x, hh - fs / 2)
    }
    // } else if (m.ym.m % 3 === 0) {
    ctx.font = font(fs * 0.8)
    ctx.fillStyle = '#888'
    writeMid(m.ym.m.toString(), mlw + x + CELL_W / 2, hh)

    gridLine(x, annu)
  })

  let i = 1

  blocks.forEach((block) => {
    ctx.font = font(titleFs * 0.9)
    ctx.fillStyle = '#000'
    const ch = hh + i * CELL_H - CELL_H / 2 + titleFs / 2

    write(block.koyomi.title, mlw * 0.05, ch)

    block.lines.forEach((line) => {
      gridLineRow(hh + (i - 1) * CELL_H)
      measures.forEach((m, mi) => {
        const cell = line[m.id]

        if (cell === undefined) return

        const x = (mi + 1) * CELL_W

        write(cell.label ?? '-', mlw + x - CELL_W / 2, i * CELL_H + CELL_H / 2)
      })
      i += 1
    })
  })
}
