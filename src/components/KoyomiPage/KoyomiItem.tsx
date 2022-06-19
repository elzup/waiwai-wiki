import { Memory, MemoryPoint, MemoryRange } from '../../types'

type Props = {
  memory: Memory
}

export const KoyomiItemRange = ({ memory }: { memory: MemoryRange }) => {
  return (
    <div>
      {memory.label} {memory.end}
    </div>
  )
}

export const KoyomiItemPoint = ({ memory }: { memory: MemoryPoint }) => {
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
