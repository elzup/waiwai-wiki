import React from 'react'
import { Timeline } from '../../types'

type Props = {
  timeline: Timeline
}
function TimelineBoard(props: Props) {
  return <div>{props.timeline.title}</div>
}
export default TimelineBoard
