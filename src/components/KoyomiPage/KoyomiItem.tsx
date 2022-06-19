import { Time, TimePoint, TimeRange } from '../../types'

type Props = {
  time: Time
}

export const KoyomiItemRange = ({ time }: { time: TimeRange }) => {
  return (
    <div>
      {time.label} {time.end}
    </div>
  )
}

export const KoyomiItemPoint = ({ time }: { time: TimePoint }) => {
  return (
    <div>
      {time.label} {time.time}
    </div>
  )
}

export const KoyomiItem = ({ time }: Props) => {
  if (time.category === 'range') {
    return <KoyomiItemRange time={time} />
  } else if (time.category === 'point') {
    return <KoyomiItemPoint time={time} />
  }
  return null
}
