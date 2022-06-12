import { schedulingBy } from '@elzup/kit'
import { List, ListItem, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import { Timeline } from '../../types'
import { endTimeNum, mapId, timeNum } from '../../utils'

type Props = {
  timeline: Timeline
}
function TimelineBoard({ timeline }: Props) {
  const lines = useMemo(
    () =>
      schedulingBy(mapId(timeline.times), ({ id, ...v }) => ({
        id,
        start: timeNum(v.time),
        end: endTimeNum(v),
      })),

    [timeline]
  )

  return (
    <div>
      <Typography>{timeline.title}</Typography>
      {lines.map((cells, ci) => (
        <div key={ci} style={{ display: 'flex' }}>
          {cells.map((cell, i) => (
            <div key={i}>{cell.label}</div>
          ))}
        </div>
      ))}
      {timeline.times.map((time, index) => (
        <List key={index}>
          <ListItem>
            <Typography>{time.label}</Typography>
          </ListItem>
        </List>
      ))}
    </div>
  )
}
export default TimelineBoard
