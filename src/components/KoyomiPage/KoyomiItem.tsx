import { LineMemory, LineMemoryPoint, LineMemoryRange } from '../../types'
import { graphConfig } from '../../utils/koyomi'

type Props = {
  memory: LineMemory
}

export const KoyomiItemRange = ({ memory }: { memory: LineMemoryRange }) => {
  return (
    <div style={{ width: graphConfig.CELL_W * memory.range }}>
      {memory.label} {memory.end}
    </div>
  )
}

export const KoyomiItemPoint = ({ memory }: { memory: LineMemoryPoint }) => {
  return (
    <div>
      {memory.label} {memory.time}
    </div>
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
