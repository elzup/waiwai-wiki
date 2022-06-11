import { schedulingBy } from '@elzup/kit'
import { List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Timeline } from '../../types'

type Props = {
  timeline: Timeline
}
function TimelineBoard({ timeline }: Props) {
  const lines = schedulingBy(
    timeline.times.map((v, id) => ({ ...v, id })),
    (v) => ({
      id: String(v.id),
      start: Number(v.time.replace('-', '')),
      end: Number(
        (v.category === 'range' ? v.end ?? '9999-99-99' : v.time).replace(
          '-',
          ''
        )
      ),
    })
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
