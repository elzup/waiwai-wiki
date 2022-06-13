import { BlockLine, TimeGrid } from '../../types'
import { useCanvas } from '../hooks/useCanvas'

const CELL_H = 100
const CELL_W = 140

export const useKoyomiDraw = (blocks: BlockLine[], measures: TimeGrid[]) => {
  return useCanvas((el) => {
    const w = measures.length * CELL_W
    const h = blocks.map((v) => v.lines.length).reduce((a, b) => a + b) * CELL_H

    el.width = w
    el.height = h

    const ctx = el.getContext('2d')

    if (!ctx) return
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#888888'
    ctx.fillRect(0, 0, w, h)
  })
}
