import { BlockLine, TimeGrid } from '../../types'
import { useCanvas } from '../hooks/useCanvas'
import { draw } from './koyomiDraw'

export const useKoyomiDraw = (blocks: BlockLine[], measures: TimeGrid[]) =>
  useCanvas((el) => draw(el, blocks, measures))
