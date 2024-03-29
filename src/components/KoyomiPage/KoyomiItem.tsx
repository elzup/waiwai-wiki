import styled from 'styled-components'
import { LineMemory, LineMemoryPoint, LineMemoryRange } from '../../types'
import { graphConfig } from '../../utils/koyomi'

const { CELL_H, CELL_W, MIN_MO_W, FONT_H_RATE } = graphConfig

type Props = {
  memory: LineMemory
}

export const KoyomiItemRange = ({ memory }: { memory: LineMemoryRange }) => {
  return (
    <Style>
      <div className="back" style={{ width: CELL_W * memory.range }} />
      <div className="text">{memory.label}</div>
    </Style>
  )
}

export const KoyomiItemPoint = ({ memory }: { memory: LineMemoryPoint }) => {
  return (
    <Style>
      <div
        className="back"
        style={{ width: graphConfig.CELL_W * memory.range }}
      />
      <div className="text">{memory.label}</div>
    </Style>
  )
}

export const KoyomiItem = ({ memory }: Props) => {
  if (memory.category === 'range') {
    return <KoyomiItemRange memory={memory} />
  } else if (memory.category === 'point') {
    return <KoyomiItemPoint memory={memory} />
  }
  return null
}

const PAD_T = 0
// const PAD_T = CELL_H * 0.1

const Style = styled.div`
  position: relative;
  .back {
    top: ${PAD_T + CELL_H / 2}px;
    position: absolute;
    background: #ddd;
    border-radius: 4px 0 0 4px;
    height: ${(CELL_H - PAD_T * 2) / 2}px;
  }
  .text {
    top: ${(CELL_H * (1 - FONT_H_RATE)) / 2}px;
    font-size: ${CELL_H * FONT_H_RATE}px;
    position: absolute;
    width: ${(MIN_MO_W + 1) * CELL_W}px;
    padding-left: 4px;
  }
`
